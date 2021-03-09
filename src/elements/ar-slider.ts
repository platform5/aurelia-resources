import { customElement, bindable, children } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArSliderTheme } from './ar-slider-theme';
import { getLogger, Logger } from 'aurelia-logging';
import { ArSlide } from './ar-slide';
import { DomHelpers } from '../helpers/dom';

@inject(Element, StyleEngine)
@customElement('ar-slider')
export class ArSlider implements UxComponent {

  private log: Logger;

  @bindable public theme: ArSliderTheme;
  @bindable public interval: number | string = 6000;
  @bindable public transition: number | string = 600;
  @bindable public slideBreakpoint: number | string = 320;
  @bindable public margin: number = 20;
  @bindable public gutter: number = 20;
  @bindable public currentSlide = 0;
  @bindable public showBullets: boolean = true;
  @bindable public showArrows: boolean = true;
  @bindable public autorun: boolean = true;
  
  
  @children('ar-slide') private slides: Array<ArSlide> = [];
  private container: HTMLElement;
  private containerWidth: number = 320;
  private slideWidth: number = 320;
  private nbColumns = 1;
  private handleResize: EventListener;
  private running: boolean = false;
  private runningInterval: any;

  constructor(public element: HTMLElement, public styleEngine: StyleEngine) {
    this.log = getLogger('ar-slider');
    this.handleResize = e => {
      let nbColumns = 1;
      this.containerWidth = (this.element.getElementsByClassName('container')[0] as HTMLElement).offsetWidth;
      nbColumns = Math.ceil(this.containerWidth / (this.slideBreakpoint as number));
      this.nbColumns = nbColumns;
      this.positionSlides();
    };
  }

  public bind() {
    const element = this.element;

    this.themeChanged(this.theme);
    this.slidesChanged();
    this.autorunChanged();
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
      newValue.themeKey = 'ar-slider';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public intervalChanged() {
    if (typeof this.interval === 'string') this.interval = parseInt(this.interval, 10);
  }

  public transitionChanged() {
    if (typeof this.transition === 'string') this.transition = parseInt(this.transition, 10);
  }

  public slideBreakpointChanged() {
    if (typeof this.slideBreakpoint === 'string') this.slideBreakpoint = parseInt(this.slideBreakpoint, 10);
  }

  public autorunChanged() {
    if (!this.autorun && this.running) {
        this.stop();
    }
    if (this.autorun && !this.running) {
        this.start();
    }
  }

  public start() {
      if (this.running) return;
    this.runningInterval = setInterval(() => {
        this.right();
    }, (this.interval as number));
    this.running = true;
  }

  public stop() {
    if (!this.running) return;
    clearInterval(this.runningInterval);
    this.runningInterval = null;
    this.running = false;
  }

  public slidesChanged() {
    this.positionSlides();
  }

  public positionSlides() {
    if (this.nbColumns === 1) {
      this.slideWidth = this.containerWidth;
    } else if (this.nbColumns === 2) {
      this.slideWidth = (this.containerWidth - this.gutter) / 2;
    } else if (this.nbColumns === 3) {
      this.slideWidth = (this.containerWidth - (this.gutter * 2)) / 3 ;
    }

    for (let slide of this.slides) {
      slide.width = this.slideWidth;
      slide.gutter = this.gutter;
    }

    this.slideTo(this.currentSlide);
  }

  public slideTo(slideIndex: number) {
    if (!this.slides || !this.slides.length) return;
    if (slideIndex < 0) return;
    if (slideIndex >= this.slides.length) return;

    if (slideIndex > this.slides.length - this.nbColumns) {
      slideIndex = Math.max(0, this.slides.length - this.nbColumns);
    }

    DomHelpers.horizontalScrollToX(this.container, this.container.scrollLeft, this.slides[slideIndex].element.offsetLeft, 0, 1 / (this.transition as number), 20, DomHelpers.easeOutCuaic);
    this.currentSlide = slideIndex;
  }

  public right(loop = true) {
    if (!this.slides || !Array.isArray(this.slides)) return;
    if (this.currentSlide < this.slides.length - 1) this.slideTo(this.currentSlide + 1);
    else if (loop) this.slideTo(0);
  }

  public left(loop = true) {
    if (!this.slides || !Array.isArray(this.slides)) return;
    if (this.currentSlide > 0) this.slideTo(this.currentSlide - 1);
    else if (loop) this.slideTo(this.slides.length - 1);
  }

}

function stopEvent(e: Event) {
  e.stopPropagation();
}
