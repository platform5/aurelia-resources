"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArMainFooter = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_templating_1 = require("aurelia-templating");
var core_1 = require("@aurelia-ux/core");
var ArMainFooter = /** @class */ (function () {
    function ArMainFooter(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
    }
    ArMainFooter.prototype.bind = function () {
        this.themeChanged(this.theme);
    };
    ArMainFooter.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'ar-main-footer';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    __decorate([
        aurelia_framework_1.bindable
    ], ArMainFooter.prototype, "theme", void 0);
    ArMainFooter = __decorate([
        aurelia_framework_1.inject(Element, core_1.StyleEngine),
        aurelia_templating_1.customElement('ar-main-footer')
    ], ArMainFooter);
    return ArMainFooter;
}());
exports.ArMainFooter = ArMainFooter;
