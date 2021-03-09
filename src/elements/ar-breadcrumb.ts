import { inject, bindable, PLATFORM } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArBreadcrumbTheme } from './ar-breadcrumb-theme';

@inject(Element, StyleEngine)
@customElement('ar-breadcrumb')
export class ArBreadcrumb implements UxComponent {

  @bindable public theme: ArBreadcrumbTheme;

  constructor(private element: HTMLElement, public styleEngine: StyleEngine) {

  }

  public bind() {
    this.themeChanged(this.theme);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'ar-breadcrumb';
    }
    this.styleEngine.applyTheme(newValue, this.element);
  }
}
