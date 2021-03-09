import languages from '../helpers/languages';
import locales from '../helpers/locales';
import { valueConverter } from 'aurelia-binding';

@valueConverter('langname')
export class LangnameValueConverter {
  toView(languageCode: string, prefix: string = ''): string {
    if (locales.languages[languageCode]) {
      return `${prefix}${locales.languages[languageCode]}`;
    }
    for (let lang of languages) {
      if (lang.languageCode === languageCode) return `${prefix}${lang.name}`;
    }
    return '';
  }
}

@valueConverter('langName')
export class LangNameValueConverter extends LangnameValueConverter {
  
}
