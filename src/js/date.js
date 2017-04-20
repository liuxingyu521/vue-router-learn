var DateUtil = {};

DateUtil.isLeapYear = function(year){
   return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
}

export default DateUtil;