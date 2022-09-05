// Day 07: 列舉型別 X 主觀列舉 - Enumerated Types
var WeekDay;
(function (WeekDay) {
    WeekDay[WeekDay["Sunday"] = 0] = "Sunday";
    WeekDay[WeekDay["Monday"] = 1] = "Monday";
    WeekDay[WeekDay["Tuesday"] = 2] = "Tuesday";
    WeekDay[WeekDay["Wednesday"] = 3] = "Wednesday";
    WeekDay[WeekDay["Thursday"] = 4] = "Thursday";
    WeekDay[WeekDay["Friday"] = 5] = "Friday";
    WeekDay[WeekDay["Saturday"] = 6] = "Saturday";
})(WeekDay || (WeekDay = {}));
// 簡單地看就是
// Weekday['Sundaay'] = 0
// Weekday[0] = 'Sunday';
var weekDayOfBirthday = WeekDay.Monday;
var TGIF = WeekDay.Friday;
