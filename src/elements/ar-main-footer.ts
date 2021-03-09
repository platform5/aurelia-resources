import { inject, bindable, PLATFORM } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArMainFooterTheme } from './ar-main-footer-theme';

@inject(Element, StyleEngine)
@customElement('ar-main-footer')
export class ArMainFooter implements UxComponent {

  @bindable public theme: ArMainFooterTheme;

  constructor(private element: HTMLElement, public styleEngine: StyleEngine) {

  }

  public bind() {
    this.themeChanged(this.theme);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'ar-main-footer';
    }
    this.styleEngine.applyTheme(newValue, this.element);
  }
}
