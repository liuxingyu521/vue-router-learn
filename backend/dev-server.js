var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var userDatabase = require('./database.json');

var app = express();

app.use(bodyParser.json())

app.post('/users/:page', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  var resObject = {
    stateCode: 0, // 0: 成功码， 101: 用户不存在， 102: 用户已存在， 201: 密码不正确
    stateDisc: '',
    userId: ''
  };
  

  var userIsExist = Object.keys(userDatabase.users).indexOf(username) < 0 ? false : true;
  console.log(req.params);
  
  // 对登录页的请求做处理
  if(req.params.page == 'login'){
    if(!userIsExist){
      resObject.stateCode = 101;
      resObject.stateDisc = '用户不存在';
    }
    else if(password !== userDatabase.users[username].password.toString()){
      resObject.stateCode = 201;
      resObject.stateDisc = '密码不正确';
    }
    else{
      resObject.stateCode = 0;
      resObject.stateDisc = '登录成功';
      resObject.userId = username;
    }
    console.log(resObject);
    res.json(resObject);
  }

  // 对注册页的请求做处理
  if(req.params.page == 'register'){
    
  }


})

// app.post('/users/register', function(req, res){
//   var username = req.body.username;
//   var password = req.body.password;


// })

app.listen(8000);