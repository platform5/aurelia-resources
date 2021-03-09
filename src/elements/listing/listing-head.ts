import { inject } from 'aurelia-framework';
import { getLogger, Logger } from 'aurelia-logging';

@inject(Element)
export class ListingHead {    

  private log: Logger;
  
  constructor(private element: Element) {
    this.log = getLogger('comp:listing-head');
  }

}
