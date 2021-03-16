var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
var ArList = /** @class */ (function () {
    function ArList(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
    }
    ArList.prototype.bind = function () {
        this.themeChanged(this.theme);
    };
    ArList.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'ar-list';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    __decorate([
        bindable
    ], ArList.prototype, "theme", void 0);
    ArList = __decorate([
        inject(Element, StyleEngine),
        customElement('ar-list')
    ], ArList);
    return ArList;
}());
export { ArList };
