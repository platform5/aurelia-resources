import locales from '../helpers/locales';
var LocaleNameValueConverter = /** @class */ (function () {
    function LocaleNameValueConverter() {
    }
    LocaleNameValueConverter.prototype.toView = function (locale, prefix) {
        if (prefix === void 0) { prefix = ''; }
        if (locales.list.indexOf(locale) === -1) {
            console.warn('Invalid locale', locale);
            return locale;
        }
        var languageCode = locale.split('_')[0];
        var countryCode = locale.split('_')[1];
        return "" + prefix + locales.languages[languageCode] + " (" + locales.countries[countryCode] + ")";
    };
    return LocaleNameValueConverter;
}());
export { LocaleNameValueConverter };
