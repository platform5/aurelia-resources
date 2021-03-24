define(["require", "exports", "moment"], function (require, exports, moment) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DateValueConverter = void 0;
    var DateValueConverter = /** @class */ (function () {
        function DateValueConverter() {
        }
        DateValueConverter.prototype.toView = function (date, format) {
            if (format === void 0) { format = 'DD.MM.YYYY'; }
            if (!date)
                return '';
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
});
