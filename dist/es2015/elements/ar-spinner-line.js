var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
import { ArSpinnerLineTheme } from './ar-spinner-line-theme';
import { getLogger } from 'aurelia-logging';
var ArSpinnerLine = /** @class */ (function () {
    function ArSpinnerLine(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.active = true;
        this.log = getLogger('ar-spinner-line');
    }
    ArSpinnerLine.prototype.bind = function () {
        if (!this.theme)
            this.theme = new ArSpinnerLineTheme;
        if (this.height) {
            this.theme.height = this.height;
        }
        this.themeChanged(this.theme);
    };
    ArSpinnerLine.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'ar-spinner-line';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    __decorate([
        bindable
    ], ArSpinnerLine.prototype, "height", void 0);
    __decorate([
        bindable
    ], ArSpinnerLine.prototype, "theme", void 0);
    __decorate([
        bindable
    ], ArSpinnerLine.prototype, "active", void 0);
    ArSpinnerLine = __decorate([
        inject(Element, StyleEngine),
        customElement('ar-spinner-line')
    ], ArSpinnerLine);
    return ArSpinnerLine;
}());
export { ArSpinnerLine };
