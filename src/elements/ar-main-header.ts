// interesting link for video detection in the future: https://davidwalsh.name/detect-supported-video-formats-javascript

import { inject, bindable, PLATFORM } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArMainHeaderTheme } from './ar-main-header-theme';

@inject(Element, StyleEngine)
@customElement('ar-main-header')
export class ArMainHeader implements UxComponent {

  @bindable backgroundUrls: Array<string>
  @bindable backgroundUrl: string;
  @bindable mp4Link: string; 
  @bindable public theme: ArMainHeaderTheme;
  @bindable public fixedHeight: number = 300;
  @bindable public fullScreen: boolean = true;
  @bindable public transition: string = 'fade';
  @bindable public duration: number = 10000;

  handleResize: EventListener;
  headerHeight: number = 300;
  backgroundIndex: number = 0;

  constructor(private element: HTMLElement, public styleEngine: StyleEngine) {
    this.handleResize = e => {
      if (!this.fullScreen) {
        this.headerHeight = this.fixedHeight;
        return;
      } 
      let toolbar: HTMLElement;
      let toolbarHeight: number = 0;
      // try to find a ar-smart-toolbar
      if (document.getElementsByTagName('ar-smart-toolbar')) {
        toolbar = (document.getElementsByTagName('ar-smart-toolbar')[0] as HTMLElement)
      }
      // or a toolbar
      if (document.getElementsByTagName('toolbar')) {
        toolbar = (document.getElementsByTagName('toolbar')[0] as HTMLElement)
      }

      if (toolbar) {
        toolbarHeight = toolbar.offsetHeight;
      }

      let screenHeight = window.innerHeight;
      this.headerHeight = screenHeight - toolbarHeight;
    };
  }

  attached() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize(null);
  }

  detached() {
    window.removeEventListener('resize', this.handleResize);
    clearInterval(this.severalUrlTimeout);
  }

  public bind() {
    this.themeChanged(this.theme);
    this.backgroundUrlsChanged();
    this.fullScreenChanged();
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'ar-main-header';
    }
    this.styleEngine.applyTheme(newValue, this.element);
  }

  public fullScreenChanged() {
    if (!this.fullScreen) {
      this.headerHeight = this.fixedHeight;
      window.removeEventListener('resize', this.handleResize);
    }  else {
      window.addEventListener('resize', this.handleResize);
      this.handleResize(null);
    } 
  }

  private severalUrlTimeout;
  public backgroundUrlsChanged() {
    clearInterval(this.severalUrlTimeout);
    this.backgroundIndex = 0;
    if (this.backgroundUrls && this.backgroundUrls.length && this.backgroundUrls.length > 1) {
      this.severalUrlTimeout = setInterval(() => {
        this.backgroundIndex++;
        if (this.backgroundIndex >= this.backgroundUrls.length) this.backgroundIndex = 0;
      }, this.duration);
    }
  }
}
