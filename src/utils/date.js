"use strict";
exports.__esModule = true;
exports.getDateOfISOWeek = void 0;
/**
 * Code copied from: https://stackoverflow.com/a/16591175
 */
var getDateOfISOWeek = function (w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOWeekStart = simple;
    if (dow <= 4) {
        ISOWeekStart.setDate(simple.getDate() - simple.getDay() + 1);
    }
    else {
        ISOWeekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }
    return ISOWeekStart;
};
exports.getDateOfISOWeek = getDateOfISOWeek;
