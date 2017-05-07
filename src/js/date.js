var DateUtil = {};

DateUtil.isLeapYear = function(year){
   return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
}

DateUtil.fillZero = function(day){
	if(day > 0 && day < 10){
		return '0' + day;
	}
	return day;
}
export default DateUtil;
// module.exports = DateUtil;