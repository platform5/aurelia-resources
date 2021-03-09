import { inject, bindable } from 'aurelia-framework';
import { getLogger } from 'aurelia-logging';
const log = getLogger('ar-parallax');

@inject(Element)
export class ArParallax {

  private p: any;
  @bindable public intensity: number = 30;
  @bindable public direction: string = 'slow';

  private handleResize: EventListener;
  private handleScroll: EventListener;
  private height: number = 300;
  private compensation: number = 0;

  private ready: boolean = false;
  private imageElement: HTMLImageElement;
  private container: HTMLElement;

  private minScroll: number = 0;
  private maxScroll: number = 0;

  private parallaxWay: number;
  private parallaxNow: number = 0;

  constructor(private element: HTMLElement) {
    this.handleResize = e => {
      // measure the way
      this.height = this.imageElement.height * (1 - (this.intensity / 100));
      this.parallaxWay = this.imageElement.height * (this.intensity / 100);
    };
    this.handleScroll = e => {
      if (!this.container) return;
      if (this.element.offsetTop > this.container.offsetHeight) {
        this.minScroll = this.element.offsetTop - this.container.offsetHeight;
      } else {
        this.minScroll = 0;
      }

      let body = document.body;
      let html = document.documentElement;
      let totalHeight = Math.max( this.container.scrollHeight, this.container.offsetHeight);

      let spaceBottom = totalHeight - this.element.offsetTop - this.height;
      if (spaceBottom < this.container.offsetHeight) {
        this.maxScroll = this.element.offsetTop - this.container.offsetHeight + this.height + spaceBottom;
      } else {
        this.maxScroll = this.element.offsetTop + this.height;
      }

      let progress = (this.container.scrollTop - this.minScroll ) / (this.maxScroll - this.minScroll);
      if (progress < 0) return;
      if (progress > 1) return;

      if (this.direction === 'fast') {
        this.compensation = 0;
        progress = 1 - progress;
        let progressUsed = progress - 0.5;
        this.parallaxNow = (this.parallaxWay * progressUsed) - (this.parallaxWay / 2);
      } else {
        let maxScroll = this.height + this.height + this.container.offsetHeight;
        let maxWay = this.maxScroll - this.minScroll;
        let percentWay = maxWay / maxScroll;
        if (percentWay > 0.2) percentWay = percentWay * 2; // add some security in some cases
        this.compensation = this.imageElement.height * (this.intensity / 100) * (1 - percentWay);
        let progressUsed = progress - 0.5;
        this.parallaxNow = (this.parallaxWay * progressUsed) - (this.parallaxWay / 2);
      }

      if (this.element.offsetTop > this.container.offsetHeight) {
      } else {
        this.parallaxNow += this.compensation;
      }

      this.imageElement.style.transform = 'translateY(' + this.parallaxNow + 'px)'
    };
  }

  bind() {
  }

  public attached() {
    this.container = this.findScrollingContainer();
    if (this.container) {
      this.container.addEventListener('resize', this.handleResize);
      this.container.addEventListener('scroll', this.handleScroll);
    }
      

    this.imageElement = this.findImage();
    if (this.imageElement.complete) {
      this.handleResize(null);
        this.handleScroll(null);
        this.ready = true;
    } else if (this.imageElement) {
      this.imageElement.onload = () => {
        this.handleResize(null);
        this.handleScroll(null);
        this.ready = true;
      };
    }
  }

  public detached() {
    this.container.removeEventListener('resize', this.handleResize);
    this.container.removeEventListener('scroll', this.handleScroll);
  }

  private findImage(): HTMLImageElement | null {
    return this.element.querySelector('img');
  }

  private findScrollingContainer(): HTMLElement | null {
    let currentElement = this.element;
    let found = false;
    let counter = 0;
    do {
      currentElement = currentElement.parentElement;

      let overflowY: string;
      if (window.getComputedStyle) {
        let style = window.getComputedStyle(currentElement, null);
        overflowY = style.overflowY;
      } else if ((currentElement as any).currentStyle) {
        overflowY = (currentElement as any).currentStyle.overflowY;
      }

      if (overflowY === 'scroll') found = true;
      else if (overflowY === 'auto') found = true;
      else if (currentElement.tagName === 'BODY') found = true;
      counter++;
    } while (found === false && currentElement.parentElement && counter < 1000);
    if (found) return currentElement;
    else return null;
  }
}
