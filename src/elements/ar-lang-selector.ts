import { inject, bindable, PLATFORM, bindingMode, Container } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArLangSelectorTheme } from './ar-lang-selector-theme';
//import languages from '../helpers/languages';
import { Logger, getLogger } from 'aurelia-logging';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

@inject(Element, StyleEngine, EventAggregator)
@customElement('ar-lang-selector')

export class ArLangSelector implements UxComponent {
  @bindable public theme: ArLangSelectorTheme;
  @bindable({defaultBindingMode: bindingMode.oneWay}) public locale: string;
  @bindable public locales: Array<string> = [];
  @bindable private dicoPrefix: string = 'lang.';
  private showSelector: boolean = false;

  private sub: Subscription;
  private log = getLogger('ar-lang-selector');

  constructor(private element: HTMLElement, private styleEngine: StyleEngine, private ea: EventAggregator) {

  }

  public attached() {
    // this.sub = this.ea.subscribe('locale:change', (locale: string) => {
    //   this.locale = locale;
    // });
  }

  public detached() {
    if (this.sub) this.sub.dispose();
  }

  public bind() {
    this.setLocales();
    this.themeChanged(this.theme);
  }

  public setLocales() {
    if (this.locales.length === 0) {
      // use settings as default
      let settings = Container.instance.get('sd-settings');
      if (settings && settings.locales) {
        this.locales = settings.locales;
      }
    }
  }

  public setLocale(locale) {
    this.locale = locale;
    this.ea.publish('locale:changed', this.locale);
    this.showSelector = false;
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'ar-lang-selector';
    }
    this.styleEngine.applyTheme(newValue, this.element);
  }
}
