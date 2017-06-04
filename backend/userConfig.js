var DateUtil = require('../src/js/date.js');

function UserConfig(name, pwd){
  this.username = name; 
  this.password = pwd;
  this.bill = {};

  var date = new Date();
  var initId = date.getFullYear()
          +''+DateUtil.fillZero(date.getMonth()+1)
          +''+DateUtil.fillZero(date.getDate())
          +''+DateUtil.fillZero(date.getHours())
          +''+DateUtil.fillZero(date.getMinutes())
          +''+DateUtil.fillZero(date.getSeconds());

  // this.bill = {
  //   "lastBill": {
  //     "id": initId,
  //     "type": "expend",
  //     "class": "101",
  //     "className": "食品酒水",
  //     "money": "",
  //     "comment": ""
  //   },
  //   "years": [
  //     {
  //       "year": "2017",
  //       "totalExpend": "200",
  //       "totalIncome": "300",
  //       "monthes": [
  //         {
  //           "month": "1",
  //           "totalExpend": "200",
  //           "totalIncome": "300",
  //           "remain": "100",
  //           "days": [
  //             {
  //               "day": "1",
  //               "totalExpend": "200",
  //               "totalIncome": "300",
  //               "bills": [
  //                 {
  //                   "id": initId,
  //                   "type": "expend",
  //                   "class": "101",
  //                   "className": "食品酒水",
  //                   "money": "200",
  //                   "comment": "fighting" 
  //                 },
  //                 {
  //                   "id": String(initId - 1),
  //                   "type": "income",
  //                   "class": "201",
  //                   "className": "工资收入",
  //                   "money": "300",
  //                   "comment": "happy"
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // }
}

module.exports =  UserConfig;