var DateUtil = {};

DateUtil.isLeapYear = function(year){
   return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
}

DateUtil.fillZero = function(num){
	if(num >= 0 && num < 10){
		return '0' + num;
	}
	return num;
}
// export default DateUtil;
module.exports = DateUtil;