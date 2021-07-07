import { Container } from 'aurelia-framework';

export class DomHelpers {

  static getContainer(element: HTMLElement & {au?: {controller?: {container?: Container}}}): Container | undefined {
    if (element?.au?.controller?.container) {
      return element.au.controller.container;
    }
    if (element.parentElement) {
      return DomHelpers.getContainer(element.parentElement);
    }
    return undefined;
  }

  static disablePinch() {
    document.addEventListener('touchmove', function (event: any) {
      if (event.scale !== 1) { event.preventDefault(); }
    }, false);
  }

  static disableDoubleTapToZoom() {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
      let now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }

  static scrollToTop(element: HTMLElement, animate = false, duration = 200, operation = DomHelpers.easeOutCuaic) {
    if (!animate) {
      element.scrollTop = 0;
      return;
    }
    this.scrollToX(element, element.scrollTop, 0, 0, 1 / duration, 20, operation);
  }

  static scrollToBottom(element: HTMLElement, animate = false, duration = 200, operation = DomHelpers.easeOutCuaic) {
    let scrollHeight = element.scrollHeight - element.offsetHeight;
    if (!animate) {
      element.scrollTop = scrollHeight;
      return;
    }
    this.scrollToX(element, element.scrollTop, scrollHeight, 0, 1 / duration, 20, operation);
  }

  static scrollToX(element: HTMLElement, x1: number, x2: number, t: number, v: number, step: number, operation: Function) {
    if (t < 0 || t > 1 || v <= 0) return;
    element.scrollTop = x1 - (x1 - x2) * operation(t);
    t += v * step;
    setTimeout(() => {
      this.scrollToX(element, x1, x2, t, v, step, operation);
    }, step);
  }

  static horizontalScrollToX(element: HTMLElement, x1: number, x2: number, t: number, v: number, step: number, operation: Function) {
    if (t < 0 || t > 1 || v <= 0) return;
    element.scrollLeft = x1 - (x1 - x2) * operation(t);
    t += v * step;
    setTimeout(() => {
      this.horizontalScrollToX(element, x1, x2, t, v, step, operation);
    }, step);
  }

  static linearTween(t: number) {
    return t;
  }
  
  static easeInQuad(t: number) {
    return t * t;
  }
  
  static easeOutQuad(t: number) {
    return -t * (t - 2);
  }
  
  static easeInOutQuad(t: number) {
  t /= 0.5;
  if (t < 1) return t * t / 2;
  t--;
    return (t * (t - 2) - 1) / 2;
  }
  
  static easeInCuaic(t: number) {
    return t * t * t;
  }
  
  static easeOutCuaic(t: number) {
  t--;
    return t * t * t + 1;
  }
  
  static easeInOutCuaic(t: number) {
  t /= 0.5;
  if (t < 1) return t * t * t / 2;
  t -= 2;
    return (t * t * t + 2) / 2;
  }
  
  static easeInQuart(t: number) {
    return t * t * t * t;
  }
  
  static easeOutQuart(t: number) {
  t--;
    return -(t * t * t * t - 1);
  }
  
  static easeInOutQuart(t: number) {
  t /= 0.5;
  if (t < 1) return 0.5 * t * t * t * t;
  t -= 2;
    return -(t * t * t * t - 2) / 2;
  }
  
  static easeInQuint(t: number) {
    return t * t * t * t * t;
  }
  
  static easeOutQuint(t: number) {
  t--;
    return t * t * t * t * t + 1;
  }
  
  static easeInOutQuint(t: number) {
  t /= 0.5;
  if (t < 1) return t * t * t * t * t / 2;
  t -= 2;
    return (t * t * t * t * t + 2) / 2;
  }
  
  static easeInSine(t: number) {
    return -Math.cos(t / (Math.PI / 2)) + 1;
  }
  
  static easeOutSine(t: number) {
    return Math.sin(t / (Math.PI / 2));
  }
  
  static easeInOutSine(t: number) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  }
  
  static easeInExpo(t: number) {
    return Math.pow(2, 10 * (t - 1));
  }
  
  static easeOutExpo(t: number) {
    return -Math.pow(2, -10 * t) + 1;
  }
  
  static easeInOutExpo(t: number) {
  t /= 0.5;
  if (t < 1) return Math.pow(2, 10 * (t - 1)) / 2;
  t--;
    return (-Math.pow(2, -10 * t) + 2) / 2;
  }
  
  static easeInCirc(t: number) {
    return -Math.sqrt(1 - t * t) - 1;
  }
  
  static easeOutCirc(t: number) {
  t--;
    return Math.sqrt(1 - t * t);
  }
  
  static easeInOutCirc(t: number) {
  t /= 0.5;
  if (t < 1)   return -(Math.sqrt(1 - t * t) - 1) / 2;
  t -= 2;
    return (Math.sqrt(1 - t * t) + 1) / 2;
  }
}
