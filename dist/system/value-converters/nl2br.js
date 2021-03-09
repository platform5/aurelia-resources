System.register([], function (exports_1, context_1) {
    "use strict";
    var Nl2brValueConverter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Nl2brValueConverter = /** @class */ (function () {
                function Nl2brValueConverter() {
                }
                Nl2brValueConverter.prototype.toView = function (value, breakTag) {
                    if (breakTag === void 0) { breakTag = '<br>'; }
                    if (!value || typeof value !== 'string')
                        return value;
                    ;
                    return (value).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
                };
                return Nl2brValueConverter;
            }());
            exports_1("Nl2brValueConverter", Nl2brValueConverter);
        }
    };
});
