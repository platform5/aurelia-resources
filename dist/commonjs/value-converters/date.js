"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateValueConverter = void 0;
var moment = require("moment");
var date_1 = require("../helpers/date");
var DateValueConverter = /** @class */ (function () {
    function DateValueConverter() {
    }
    DateValueConverter.prototype.toView = function (date, format) {
        if (format === void 0) { format = 'DD.MM.YYYY'; }
        var m = date_1.DateHelper.moment(date, format);
        if (!m) {
            return '';
        }
        if (format === 'nice') {
            var diff = m.diff(moment(), 'days');
            if (diff < 14) {
                return m.fromNow();
            }
            else {
                return m.calendar();
            }
        }
        else if (format === 'calendar') {
            return m.calendar();
        }
        else if (format === 'fromnow') {
            return m.fromNow(true);
        }
        else {
            return m.format(format);
        }
    };
    return DateValueConverter;
}());
exports.DateValueConverter = DateValueConverter;
