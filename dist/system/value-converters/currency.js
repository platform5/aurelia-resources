System.register(["numeral", "numeral/locales/fr-ch"], function (exports_1, context_1) {
    "use strict";
    var numeral, CurrencyValueConverter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (numeral_1) {
                numeral = numeral_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            //numeral.register('locale', 'fr-ch', locale);
            numeral.locale('fr-ch');
            CurrencyValueConverter = /** @class */ (function () {
                function CurrencyValueConverter() {
                }
                CurrencyValueConverter.prototype.toView = function (value) {
                    return numeral(value).format('($0,0.00)').replace('CHF', 'CHF ');
                };
                return CurrencyValueConverter;
            }());
            exports_1("CurrencyValueConverter", CurrencyValueConverter);
        }
    };
});
