import DateUtil from './date.js';

var Util = {};

// 将src里的属性替换到dest里
Util.deepCopy = function(dest, src){

  for(var key in src){
    if(typeof(src[key]) != 'object'){
      dest[key] = src[key];
    }
    else if(Object.prototype.toString.call(src[key]).slice(8, -1).toLowerCase() == 'array'){
      if(key == 'monthes'){
        src[key].forEach(function(val, index, arr){
          dest[key].forEach(function(v, i, a){
            if(v.month == val.month){
              Util.deepCopy(v, val);
            }
          })
        })
      }
      else if(key == 'days'){
        src[key].forEach(function(val, index, arr){
          dest[key].forEach(function(v, i, a){
            if(v.day == val.day){
              Util.deepCopy(v, val);
            }
          })
        })
      }
      else if(key == 'bills'){
        dest[key] = [];
        src[key].forEach(function(val, index, arr){
          dest[key].push(val);
        })
      }
    }
  }
}

Util.fillDay = function(date){
  var dayBills = {};

  dayBills.day = date;
  dayBills.totalExpend = "0";
  dayBills.totalIncome = "0";
  dayBills.bills = [];

  dayBills.bills.push({
    id: "",
    type: "",
    class: "",
    className: "",
    money: "0",
    comment: ""
  })

  return dayBills;
}

Util.fillMonth = function(month, year, monthObj){
  var _monthObj = {};

  _monthObj.month = month;
  _monthObj.totalExpend = "0";
  _monthObj.totalIncome = "0";
  _monthObj.remain = "0";
  _monthObj.days = [];
  _monthObj.days.length = DateUtil.daysInMonth(year, month);
  
  _monthObj.days = _monthObj.days.fill(0).map(function(val, index, arr){
    return Util.fillDay(index+1);
  })

  if(!!monthObj){
    Util.deepCopy(_monthObj, monthObj);
  }
  return _monthObj;
}

Util.fillYear = function(year, yearBill){
  var _yearBill = {};

  _yearBill.year = year;
  _yearBill.totalExpend = "0";
  _yearBill.totalIncome = "0";
  _yearBill.remain = "0";
  _yearBill.monthes = (new Array(12)).fill(0);

  _yearBill.monthes = _yearBill.monthes.map(function(val, index, arr){
    return Util.fillMonth(index+1, year);
  });

  if(!!yearBill){
    Util.deepCopy(_yearBill, yearBill);
  }

  return _yearBill;
}

export default Util;






