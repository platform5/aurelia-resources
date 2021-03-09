System.register(["../helpers/locales"], function (exports_1, context_1) {
    "use strict";
    var locales_1, LocaleNameValueConverter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (locales_1_1) {
                locales_1 = locales_1_1;
            }
        ],
        execute: function () {
            LocaleNameValueConverter = /** @class */ (function () {
                function LocaleNameValueConverter() {
                }
                LocaleNameValueConverter.prototype.toView = function (locale, prefix) {
                    if (prefix === void 0) { prefix = ''; }
                    if (locales_1.default.list.indexOf(locale) === -1) {
                        console.warn('Invalid locale', locale);
                        return locale;
                    }
                    var languageCode = locale.split('_')[0];
                    var countryCode = locale.split('_')[1];
                    return "" + prefix + locales_1.default.languages[languageCode] + " (" + locales_1.default.countries[countryCode] + ")";
                };
                return LocaleNameValueConverter;
            }());
            exports_1("LocaleNameValueConverter", LocaleNameValueConverter);
        }
    };
});
