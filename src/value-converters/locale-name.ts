import locales from '../helpers/locales';

export class LocaleNameValueConverter {
  toView(locale: string, prefix: string = ''): string {
    if (locales.list.indexOf(locale) === -1) {
      console.warn('Invalid locale', locale);
      return locale;
    }
    const languageCode = locale.split('_')[0];
    const countryCode = locale.split('_')[1];

    return `${prefix}${locales.languages[languageCode]} (${locales.countries[countryCode]})`;
  }
}
