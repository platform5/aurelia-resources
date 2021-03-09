System.register([], function (exports_1, context_1) {
    "use strict";
    var ObjectKeysValueConverter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            ObjectKeysValueConverter = /** @class */ (function () {
                function ObjectKeysValueConverter() {
                }
                ObjectKeysValueConverter.prototype.toView = function (value) {
                    return Object.keys(value);
                };
                return ObjectKeysValueConverter;
            }());
            exports_1("ObjectKeysValueConverter", ObjectKeysValueConverter);
        }
    };
});
