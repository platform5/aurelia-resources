import { inject } from 'aurelia-dependency-injection';

@inject(Element)
export class ArSlide {
  public width: number = 320;
  public gutter: number = 20;
  
  constructor(public element: HTMLElement) {

  }
}
