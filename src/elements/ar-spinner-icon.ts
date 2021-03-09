import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArSpinnerIconTheme } from './ar-spinner-icon-theme';
import { getLogger, Logger } from 'aurelia-logging';

@inject(Element, StyleEngine)
@customElement('ar-spinner-icon')
export class ArSpinnerIcon implements UxComponent {

  private log: Logger;

  @bindable public size: string;
  @bindable public color: 'light'; // light, dark, primary, accent
  @bindable public theme: ArSpinnerIconTheme;

  constructor(public element: HTMLElement, public styleEngine: StyleEngine) {
    this.log = getLogger('ar-spinner-icon');
  }
    
  public bind() {
    if (this.size) {
      this.theme.size = this.size;
    }

    this.themeChanged(this.theme);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'ar-spinner-icon';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

}
