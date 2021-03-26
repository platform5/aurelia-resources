System.register(["moment"], function (exports_1, context_1) {
    "use strict";
    var moment, DateHelper;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (moment_1) {
                moment = moment_1;
            }
        ],
        execute: function () {
            DateHelper = /** @class */ (function () {
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
            exports_1("DateHelper", DateHelper);
        }
    };
});
