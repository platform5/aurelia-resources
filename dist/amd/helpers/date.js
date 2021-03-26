define(["require", "exports", "moment"], function (require, exports, moment) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DateHelper = void 0;
    var DateHelper = /** @class */ (function () {
        function DateHelper() {
        }
        DateHelper.moment = function (date) {
            if (!date)
                return undefined;
            var m;
            if (typeof date === 'string') {
                if (date.length === 10 && date.substr(2, 1) === '-' && date.substr(5, 1) === '-') {
                    m = moment(date, 'DD-MM-YYYY');
                }
                else if (date.length === 8 && date.substr(2, 1) === '-' && date.substr(5, 1) === '-') {
                    m = moment(date, 'DD-MM-YY');
                }
                else if (date.length === 10 && date.substr(2, 1) === '/' && date.substr(5, 1) === '/') {
                    m = moment(date, 'DD/MM/YYYY');
                }
                else if (date.length === 8 && date.substr(2, 1) === '/' && date.substr(5, 1) === '/') {
                    m = moment(date, 'DD/MM/YY');
                }
                else if (date.length === 10 && date.substr(2, 1) === '.' && date.substr(5, 1) === '.') {
                    m = moment(date, 'DD.MM.YYYY');
                }
                else if (date.length === 8 && date.substr(2, 1) === '.' && date.substr(5, 1) === '.') {
                    m = moment(date, 'DD.MM.YY');
                }
                else if (date.length > 10 && date.indexOf('T') !== -1 && date.indexOf('+') !== -1) {
                    m = moment(date);
                }
                else {
                    m = moment(date);
                }
            }
            else if (!moment.isMoment(date)) {
                m = moment(date);
                if (!m.isValid) {
                    return undefined;
                }
            }
            else {
                m = date;
            }
            return m;
        };
        return DateHelper;
    }());
    exports.DateHelper = DateHelper;
});