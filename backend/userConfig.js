function UserConfig(name, pwd){
  this.username = name; 
  this.password = pwd;
  this.bill = {
    total: "0"
  }
}

module.exports =  UserConfig;