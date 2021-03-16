"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocaleNameValueConverter = void 0;
var locales_1 = require("../helpers/locales");
var LocaleNameValueConverter = /** @class */ (function () {
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
exports.LocaleNameValueConverter = LocaleNameValueConverter;
