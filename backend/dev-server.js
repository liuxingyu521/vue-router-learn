var path = require('path');
var fs = require('fs'); // 用fs模块将数据写入数据库json文件

var express = require('express');
var session = require('express-session'); // 加入session中间件
var bodyParser = require('body-parser'); // 解析post请求body内容

var User = require('./userConfig.js');

var app = express();

app.use(bodyParser.json());

app.use(session({
  secret: 'bill manager',
  resave: true,
  saveUninitialized: true
}));

// 登录注册的身份请求
app.post('/users/:page', function(req, res){
  // 每请求一次，查询一次数据库
  var userDatabase = require('./database.json');
  // console.log(userDatabase); 待解决..(已解决)控制台输出了对象名
  //    [ { username: 'Richard', password: '000000' },
  //    { username: 'sss', password: 'sss' },
  //    UserConfig { username: '1', password: '1' } ]

  var username = req.body.username;
  var password = req.body.password;

  var resObject = {
    stateCode: 0, // 0: 成功码， 101: 用户不存在， 102: 用户已存在， 201: 密码不正确
    stateDisc: '',
    userId: ''
  };
  
  // 临时存密码，用于校验
  var pwdTmp = '';

  var userIsExist = userDatabase.users.some(function(ele, index, arr){
    if(ele.username == username){
      pwdTmp = ele.password;
      return true;
    }
    else{
      return false;
    }
  });
  
  // 对登录页的请求做处理
  if(req.params.page == 'login'){
    if(!userIsExist){
      resObject.stateCode = 101;
      resObject.stateDisc = '用户不存在';
    }
    else if(password !== pwdTmp){
      resObject.stateCode = 201;
      resObject.stateDisc = '密码不正确';
    }
    else{
      resObject.stateCode = 0;
      resObject.stateDisc = '登录成功';

      // 在session里设置用户id
      req.session.userId = username;

      resObject.userId = username;
    }
    res.json(resObject);
  }

  // 对注册页的请求做处理
  if(req.params.page == 'register'){
    if(userIsExist){
      resObject.stateCode = 102;
      resObject.stateDisc = '用户已存在';
      res.json(resObject);
      res.end();
    }
    // 注册成功
    else{
      var newUser = new User(username, password);

      // fix 控制台输出对象名的问题
      newUser = Object.assign({}, newUser);
      
      userDatabase.users.push(newUser);
      // console.log(JSON.stringify(userDatabase, null, 2));

      // 写入数据库
      fs.writeFile('./database.json', JSON.stringify(userDatabase, null, 2), function(err){
        // console.log(err);
      });

      resObject.stateCode = 0;
      resObject.stateDisc = '注册成功';
      resObject.userId = username;

      res.json(resObject);
      res.end();
    }

  }

})

// 用户账单数据请求
app.post('/users/:id/bill', function(req, res){
  console.log(req.sessionID);
  console.log(req.session);
  var resObject = {
    stateCode: 0, // 0: 成功码， 1: 失败码，session失效，重新登录
    stateDisc: '',
    userBill: {}
  };
  if(!req.session.userId){
    resObject.stateCode = 1;
    resObject.stateDisc = 'session失效，重新登录';
    res.json(resObject);
    res.end();
  }
  else{
    resObject.stateCode = 0;
    resObject.stateDisc = '获取账单数据成功 :)';

    var userDatabase = require('./database.json');

    var curUser = userDatabase.users.find(function(ele, index, arr){
      return ele.username === req.session.userId;
    });
    resObject.userBill = curUser.bill;
    res.json(resObject);
    res.end();
  }

})

app.listen(8000);