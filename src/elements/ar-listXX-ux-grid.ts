import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArListTheme } from './ar-list-theme';

@inject(Element, StyleEngine)
@customElement('ar-list')
export class ArList implements UxComponent {
  @bindable public theme: ArListTheme;

  constructor(
    public element: HTMLElement,
    private styleEngine: StyleEngine) { }

  public bind() {
    this.themeChanged(this.theme);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'ar-list';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }
}
