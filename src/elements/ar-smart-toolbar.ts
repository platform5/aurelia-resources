import { ArSmartToolbarTheme } from './ar-smart-toolbar-theme';
import { customElement, bindable, children } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { getLogger, Logger } from 'aurelia-logging';
import { EventAggregator } from 'aurelia-event-aggregator';

import { noView, customAttribute, Container } from 'aurelia-framework';

@inject(Element, StyleEngine, EventAggregator)
@customElement('ar-smart-toolbar')
export class ArSmartToolbar implements UxComponent {

  @bindable id: string;
  @bindable position: 'bottom' | 'top' = 'top';
  @bindable shrinkOnScroll: boolean = false;

  private log: Logger;

  @bindable public theme: ArSmartToolbarTheme;
  
  private handleResize: EventListener;

  constructor(private element: HTMLElement, public styleEngine: StyleEngine, private eventAggregator: EventAggregator) {
    this.log = getLogger('ar-smart-toolbar');
    this.handleResize = e => {
    };
  }

  public bind() {
    const element = this.element;
    this.themeChanged(this.theme);
  }

  public attached() {
    this.handleResize(null);
    window.addEventListener('resize', this.handleResize);
  }

  public detached() {
    window.removeEventListener('resize', this.handleResize);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'ar-smart-toolbar';
    }
    this.styleEngine.applyTheme(newValue, this.element);
  }
}
