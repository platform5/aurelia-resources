import * as numeral from 'numeral';
import 'numeral/locales/fr-ch';
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
export { CurrencyValueConverter };
