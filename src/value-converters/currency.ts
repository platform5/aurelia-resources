import * as numeral from 'numeral';
import 'numeral/locales/fr-ch';

//numeral.register('locale', 'fr-ch', locale);
numeral.locale('fr-ch');

export class CurrencyValueConverter {
  toView(value) {
    return numeral(value).format('($0,0.00)').replace('CHF', 'CHF ');
  }
}
