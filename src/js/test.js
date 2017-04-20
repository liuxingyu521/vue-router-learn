var DateUtil = require('./date.js');
var obj = {
  "total": "123",
  "monthes": [
    {
      "month": "10",
      "total": "100"
    },
    {
      "month": "9",
      "total": "23"
    }
  ]
}

var dest = {
  "total": "dest",
  "monthes": [
    {
      "month": "1",
      "total": "1"
    },
    {
      "month": "1",
      "total": "1"
    }
  ]
}
// console.log(Object.assign(dest, obj));

// var arr = new Array(12);
// arr.fill(1);
// var b = arr.map(function(val, index, a){
//   var days = [];
//   if((index+1) == 1 || (index+1) == 3 || (index+1) == 5 || (index+1) == 7 || (index+1) == 8 || (index+1) == 10 || (index+1) == 12){
//     days.length = 31;
//   }
//   else if((index+1) == 2){
//     days.length = 29;
//   }
//   else{
//     days.length = 30;
//   }
//   days.fill(1);
//   return days.map(function(e, i , a){
//     e = i+1;
//     return e;
//   });
// })
var Util = {};

Util.fillDay = function(date){
  var dayBills = {};

  dayBills.day = date;
  dayBills.totalExpend = "0";
  dayBills.totalIncome = "0";
  dayBills.bill = [];
  dayBills.bill.push({
    id: "",
    type: "无",
    money: "0",
    comment: "无"
  });

  return dayBills;
}
Util.fillMonth = function(month, year, monthObj){
  var _monthObj = {};

  _monthObj.month = month;
  _monthObj.totalExpend = "0";
  _monthObj.totalIncome = "0";
  _monthObj.remain = "0";
  _monthObj.days = [];

  if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
    _monthObj.days.length = 31;
  }
  else if(month == 2){
    _monthObj.days.length =  DateUtil.isLeapYear(year) ? 29 : 28; 
  }
  else{
    _monthObj.days.length = 30;
  }

  _monthObj.days = _monthObj.days.fill(0).map(function(val, index, arr){
    return Util.fillDay(index+1);
  })

  if(!!monthObj){
    Object.assign(_monthObj, monthObj);
  }
  return _monthObj;
}
Util.fillYear = function(year, yearBill){
  var _yearBill = {};
      
  _yearBill.year = year;
  _yearBill.totalExpend = "0";
  _yearBill.totalIncome = "0";
  _yearBill.monthes = (new Array(12)).fill(0);

  _yearBill.monthes = _yearBill.monthes.map(function(val, index, arr){
    return Util.fillMonth(index+1, year);
  });

  if(!!yearBill){
    Object.assign(_yearBill, yearBill);
  }

  return _yearBill;
}
console.log(Util.fillYear(2001).monthes[0].days[0]);


