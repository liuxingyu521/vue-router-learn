import DateUtil from './date.js';

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

export default Util;






