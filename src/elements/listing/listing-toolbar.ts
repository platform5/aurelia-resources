import { inject, bindable, bindingMode } from 'aurelia-framework';
import { getLogger, Logger } from 'aurelia-logging';

@inject(Element)
export class ListingToolbar {    

  @bindable({defaultBindingMode: bindingMode.twoWay}) public search: string;
  @bindable public currentCount: number;

  private log: Logger;
  
  constructor(private element: Element) {
    this.log = getLogger('comp:listing-toolbar');
  }
}
