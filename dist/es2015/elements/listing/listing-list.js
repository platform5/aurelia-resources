var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { bindable } from 'aurelia-templating';
import { inject, children } from 'aurelia-framework';
import { getLogger } from 'aurelia-logging';
var log = getLogger('comp:listing-list');
var ListingList = /** @class */ (function () {
    function ListingList(element) {
        this.element = element;
        this.separators = true;
        this.firstLetterContainerSelector = '.ux-list-item__content > div';
        this.separatorSelector = '';
        this.separator = 'all';
        this.items = [];
    }
    ListingList.prototype.attached = function () {
        this.itemsChanged();
    };
    ListingList.prototype.itemsChanged = function () {
        if (!Array.isArray(this.items)) {
            return;
        }
        var separators = this.element.querySelectorAll('.ux-list-item--separator');
        var elements = this.element.querySelectorAll('ux-list-item:not(.ux-list-item--separator)');
        if (elements.length !== this.items.length) {
            log.warn('elements.length !== this.items.length');
        }
        for (var index = 0; index < separators.length; index++) {
            var separator = separators.item(index);
            this.element.removeChild(separator);
        }
        if (!this.separators)
            return;
        var currentSeparator = '';
        var separatorSelector = this.separatorSelector || this.firstLetterContainerSelector;
        var separatorType = this.separatorSelector ? this.separator : 'first-letter';
        for (var index = 0; index < this.items.length; index++) {
            var element = elements[index];
            var firstLetterContainer = element.querySelector(separatorSelector);
            if (firstLetterContainer) {
                var separator = firstLetterContainer.textContent.trim().toUpperCase();
                if (separatorType === 'first-letter') {
                    separator = separator.substr(0, 1);
                }
                if (separator && currentSeparator !== separator) {
                    var separatorElement = document.createElement('ux-list-item');
                    separatorElement.classList.add('ux-list-item--separator', 'ux-list-item');
                    separatorElement.innerHTML = "" + separator;
                    this.element.insertBefore(separatorElement, element);
                    currentSeparator = separator;
                }
            }
        }
    };
    __decorate([
        bindable
    ], ListingList.prototype, "separators", void 0);
    __decorate([
        bindable
    ], ListingList.prototype, "firstLetterContainerSelector", void 0);
    __decorate([
        bindable
    ], ListingList.prototype, "separatorSelector", void 0);
    __decorate([
        bindable
    ], ListingList.prototype, "separator", void 0);
    __decorate([
        children('ux-list-item:not(.ux-list-item--separator)')
    ], ListingList.prototype, "items", void 0);
    ListingList = __decorate([
        inject(Element)
    ], ListingList);
    return ListingList;
}());
export { ListingList };
