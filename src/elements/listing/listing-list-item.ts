import { inject } from 'aurelia-framework';
import { getLogger, Logger } from 'aurelia-logging';

@inject(Element)
export class ListingListItem {    

  private log: Logger;
  
  constructor(private element: Element) {
    this.log = getLogger('comp:listing-list-item');
  }

}
