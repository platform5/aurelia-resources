System.register(["moment", "../helpers/date"], function (exports_1, context_1) {
    "use strict";
    var moment, date_1, DateValueConverter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (moment_1) {
                moment = moment_1;
            },
            function (date_1_1) {
                date_1 = date_1_1;
            }
        ],
        execute: function () {
            DateValueConverter = /** @class */ (function () {
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
            exports_1("DateValueConverter", DateValueConverter);
        }
    };
});
