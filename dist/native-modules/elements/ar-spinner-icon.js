var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
import { getLogger } from 'aurelia-logging';
var ArSpinnerIcon = /** @class */ (function () {
    function ArSpinnerIcon(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.log = getLogger('ar-spinner-icon');
    }
    ArSpinnerIcon.prototype.bind = function () {
        if (this.size) {
            this.theme.size = this.size;
        }
        this.themeChanged(this.theme);
    };
    ArSpinnerIcon.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'ar-spinner-icon';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    __decorate([
        bindable
    ], ArSpinnerIcon.prototype, "size", void 0);
    __decorate([
        bindable
    ], ArSpinnerIcon.prototype, "color", void 0);
    __decorate([
        bindable
    ], ArSpinnerIcon.prototype, "theme", void 0);
    ArSpinnerIcon = __decorate([
        inject(Element, StyleEngine),
        customElement('ar-spinner-icon')
    ], ArSpinnerIcon);
    return ArSpinnerIcon;
}());
export { ArSpinnerIcon };
