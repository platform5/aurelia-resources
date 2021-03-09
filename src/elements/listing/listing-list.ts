import { bindable } from 'aurelia-templating';
import { inject, children } from 'aurelia-framework';
import { getLogger } from 'aurelia-logging';

const log = getLogger('comp:listing-list')

interface UxListItem {}

@inject(Element)
export class ListingList {    

  @bindable separators: boolean = true;
  @bindable public firstLetterContainerSelector = '.ux-list-item__content > div';
  @bindable public separatorSelector = '';
  @bindable public separator: 'first-letter' | 'all' = 'all';
  @children('ux-list-item:not(.ux-list-item--separator)') private items: Array<UxListItem & {element: HTMLElement}> = [];
  
  constructor(private element: Element) {

  }

  public attached() {
    this.itemsChanged();
  }

  public itemsChanged() {
    if (!Array.isArray(this.items)) {
      return;
    }
    const separators = this.element.querySelectorAll('.ux-list-item--separator');
    const elements = this.element.querySelectorAll('ux-list-item:not(.ux-list-item--separator)');
    if (elements.length !== this.items.length) {
      log.warn('elements.length !== this.items.length');
    }
    for (let index = 0; index < separators.length; index++) {
      const separator = separators.item(index);
      this.element.removeChild(separator);
    }
    if (!this.separators) return;
    let currentSeparator = '';

    const separatorSelector = this.separatorSelector || this.firstLetterContainerSelector;
    const separatorType: 'first-letter' | 'all' = this.separatorSelector ? this.separator : 'first-letter';

    for (let index = 0; index < this.items.length; index++) {
      const element = elements[index];
      const firstLetterContainer = element.querySelector(separatorSelector);
      if (firstLetterContainer) {
        let separator = firstLetterContainer.textContent.trim().toUpperCase();
        if (separatorType === 'first-letter') {
          separator = separator.substr(0, 1);
        }
        if (separator && currentSeparator !== separator) {
          const separatorElement = document.createElement('ux-list-item');
          separatorElement.classList.add('ux-list-item--separator', 'ux-list-item');
          separatorElement.innerHTML = `${separator}`;
          this.element.insertBefore(separatorElement, element);
          currentSeparator = separator;
        }
      }
    }
  }

}
