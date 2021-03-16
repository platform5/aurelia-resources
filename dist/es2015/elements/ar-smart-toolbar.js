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
import { EventAggregator } from 'aurelia-event-aggregator';
var ArSmartToolbar = /** @class */ (function () {
    function ArSmartToolbar(element, styleEngine, eventAggregator) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.eventAggregator = eventAggregator;
        this.position = 'top';
        this.shrinkOnScroll = false;
        this.log = getLogger('ar-smart-toolbar');
        this.handleResize = function (e) {
        };
    }
    ArSmartToolbar.prototype.bind = function () {
        var element = this.element;
        this.themeChanged(this.theme);
    };
    ArSmartToolbar.prototype.attached = function () {
        this.handleResize(null);
        window.addEventListener('resize', this.handleResize);
    };
    ArSmartToolbar.prototype.detached = function () {
        window.removeEventListener('resize', this.handleResize);
    };
    ArSmartToolbar.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'ar-smart-toolbar';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    __decorate([
        bindable
    ], ArSmartToolbar.prototype, "id", void 0);
    __decorate([
        bindable
    ], ArSmartToolbar.prototype, "position", void 0);
    __decorate([
        bindable
    ], ArSmartToolbar.prototype, "shrinkOnScroll", void 0);
    __decorate([
        bindable
    ], ArSmartToolbar.prototype, "theme", void 0);
    ArSmartToolbar = __decorate([
        inject(Element, StyleEngine, EventAggregator),
        customElement('ar-smart-toolbar')
    ], ArSmartToolbar);
    return ArSmartToolbar;
}());
export { ArSmartToolbar };
