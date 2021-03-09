System.register([], function (exports_1, context_1) {
    "use strict";
    var FirstLetterUpperValueConverter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            FirstLetterUpperValueConverter = /** @class */ (function () {
                function FirstLetterUpperValueConverter() {
                }
                FirstLetterUpperValueConverter.prototype.toView = function (value) {
                    if (typeof value !== 'string') {
                        return value;
                    }
                    if (value.length < 1) {
                        return value;
                    }
                    return value.substr(0, 1).toUpperCase() + value.substr(1);
                };
                return FirstLetterUpperValueConverter;
            }());
            exports_1("FirstLetterUpperValueConverter", FirstLetterUpperValueConverter);
        }
    };
});
