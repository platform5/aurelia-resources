import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArSpinnerLineTheme } from './ar-spinner-line-theme';
import { getLogger, Logger } from 'aurelia-logging';

@inject(Element, StyleEngine)
@customElement('ar-spinner-line')
export class ArSpinnerLine implements UxComponent {

  private log: Logger;

  @bindable public height: string;
  @bindable public theme: ArSpinnerLineTheme;
  @bindable public active: boolean = true;

  constructor(private element: HTMLElement, public styleEngine: StyleEngine) {
    this.log = getLogger('ar-spinner-line');
  }
    
  public bind() {
    if (!this.theme) this.theme = new ArSpinnerLineTheme;
    if (this.height) {
      this.theme.height = this.height;
    }

    this.themeChanged(this.theme);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'ar-spinner-line';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

}
