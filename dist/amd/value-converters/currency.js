define(["require", "exports", "numeral", "numeral/locales/fr-ch"], function (require, exports, numeral) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CurrencyValueConverter = void 0;
    //numeral.register('locale', 'fr-ch', locale);
    numeral.locale('fr-ch');
    var CurrencyValueConverter = /** @class */ (function () {
        function CurrencyValueConverter() {
        }
        CurrencyValueConverter.prototype.toView = function (value) {
            return numeral(value).format('($0,0.00)').replace('CHF', 'CHF ');
        };
        return CurrencyValueConverter;
    }());
    exports.CurrencyValueConverter = CurrencyValueConverter;
});
