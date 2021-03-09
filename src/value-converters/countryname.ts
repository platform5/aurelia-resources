import countries from '../helpers/countries';
import locales from '../helpers/locales';
import { valueConverter } from 'aurelia-binding';

@valueConverter('countryname')
export class CountrynameValueConverter {
  toView(countryCode: string, prefix: string = ''): string {
    if (locales.countries[countryCode]) {
      return `${prefix}${locales.countries[countryCode]}`;
    }
    for (let country of countries) {
      if (country.countryCode === countryCode) return `${prefix}${country.name}`;
      if (country.countryCode2 === countryCode) return `${prefix}${country.name}`;
    }
    return '';
  }
}

@valueConverter('countryName')
export class CountryNameValueConverter extends CountrynameValueConverter {
  
}
