import { inject } from 'aurelia-framework';

@inject(Element)
export class TouchActiveCustomAttribute {
  constructor(private element: Element) {
    this.element.addEventListener('touchstart', () => {
      this.element.classList.add('touching');
    });
    this.element.addEventListener('touchend', () => {
      this.element.classList.remove('touching');
    });
    this.element.addEventListener('touchcancel', () => {
      this.element.classList.remove('touching');
    });
  }    
}
