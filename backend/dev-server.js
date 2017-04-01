var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var userDatabase = require('./database.json');

var app = express();

app.use(bodyParser.json())

app.post('/users', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  var userIsExist = Object.keys(userDatabase.users).indexOf(username) < 0 ? false : true;
  // console.log(userDatabase.users[username].password+' '+password);
  // console.log(userIsExist+' '+ password +'  '+userDatabase.users[username].password);
  if(userIsExist && (password == userDatabase.users[username].password.toString())){
    console.log('jsjdjf')
      res.send('1');
  }else{
    res.send('0');
  }

})

app.listen(8000);