import { DomHelpers } from './../helpers/dom';
import { inject, bindable, noView, customAttribute } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@customAttribute('smooth-scroll')
@noView
@inject(Element, Router)
export class SmoothScroll {

    @bindable duration: number;
    @bindable easing: string;
    @bindable container: string | HTMLElement;
    @bindable offsetContainer: string | HTMLElement;
    @bindable offset: number;
  
    private subs = [];
  
    private element: HTMLElement;
  
    static defaultConfig = {
      duration: 400,
      easing: 'ease-in',
      container: 'body',
      offsetContainer: 'header',
      offset: 0
    };
  
    constructor(element, animator, router) {
      this.element = element;
  
      let config = SmoothScroll.defaultConfig;
      if (config.duration !== undefined) this.duration = config.duration;
      if (config.easing) this.easing = config.easing;
      if (config.container) this.container = config.container;
      if (config.offsetContainer) this.offsetContainer = config.offsetContainer;
      if (config.offset !== undefined) this.offset = config.offset;
    }
  
    attached() {
      let sub = this.onClick.bind(this);
      this.subs.push(sub);
      this.element.addEventListener('click', sub);
    }

    detached() {
      if (this.subs) for (let sub of this.subs) {
        this.element.removeEventListener('click', sub);
      }
    }
  
    onClick(event) {
      event.preventDefault();
      this.scrollTo(this.element.getAttribute('href'));
      return false;
    }
  
    scrollTo(elementOrHash) {
      let target = elementOrHash;
      let hash = null;
  
      //find target by id or name
      if (typeof elementOrHash === 'string' && elementOrHash.indexOf('#') === 0) {
        hash = elementOrHash.slice(1, elementOrHash.length);
        if (hash) {
          target = document.body.querySelector(`[id="${hash}"]`);
          if (!target) target = document.body.querySelector(`[name="${hash}"]`);
        } else {
          target = document.body;
        }
  
        /*
        TODO: Fix the problem that when using this part the router starts to have problems
        if (history) {
          history.pushState(null, null, '#' + hash);
        } else {
          //fallback to location.hash
          let t = document.body.scrollTop;
          location.hash = hash;
          document.body.scrollTop = t;
        }
        */
      }
  
      let e: HTMLElement;
      if (this.container === 'body') {
        e = document.documentElement;
      } else if (this.container instanceof HTMLElement) {
        e = this.container;
      } else {
        let select = document.querySelector(this.container);
        if (select) e = (select as HTMLElement);
        else e = document.documentElement;
      }
  
      if (e.scrollTop === 0) {
        let t = e.scrollTop;
        ++e.scrollTop;
        e = t + 1 === e.scrollTop-- ? e : document.body;
      }
  
      let style = target.currentStyle || (window as any).getComputedStyle(target);
      let marginTop = parseInt(style.marginTop, 10);
  
      let from = e.offsetTop;
      let to = target.offsetTop - this.getOffset() - (this.offset || 0) - marginTop;
  
      let easing = DomHelpers.easeOutCuaic;
      if (this.easing && DomHelpers[this.easing]) easing = DomHelpers[this.easing];
      DomHelpers.scrollToX(e, from, to, 0, 1 / this.duration, 20, easing);
    }
  
    getOffset() {
      if (!this.offsetContainer) return 0;
      if (this.container instanceof HTMLElement) {
        return this.container.offsetHeight;
      } else {
        let container = document.querySelector((this.offsetContainer as string));
        if (container) {
          return (container as HTMLElement).offsetHeight;
        }
      }
      return 0;
    }
  }
  