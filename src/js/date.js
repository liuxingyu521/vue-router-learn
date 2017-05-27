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

DateUtil.daysInMonth = function(year, month){
	switch(month){
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			return 31;
		case 4:
		case 6:
		case 9:
		case 11:
			return 30;
		case 2:
			if(DateUtil.isLeapYear(year)){
				return 29;
			}
			else{
				return 28;
			}
		default:
			return null;
	}
}
// export default DateUtil;
module.exports = DateUtil;