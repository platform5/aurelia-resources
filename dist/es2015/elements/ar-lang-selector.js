var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject, bindable, bindingMode, Container } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';
import { StyleEngine } from '@aurelia-ux/core';
//import languages from '../helpers/languages';
import { getLogger } from 'aurelia-logging';
import { EventAggregator } from 'aurelia-event-aggregator';
var ArLangSelector = /** @class */ (function () {
    function ArLangSelector(element, styleEngine, ea) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.ea = ea;
        this.locales = [];
        this.dicoPrefix = 'lang.';
        this.showSelector = false;
        this.log = getLogger('ar-lang-selector');
    }
    ArLangSelector.prototype.attached = function () {
        // this.sub = this.ea.subscribe('locale:change', (locale: string) => {
        //   this.locale = locale;
        // });
    };
    ArLangSelector.prototype.detached = function () {
        if (this.sub)
            this.sub.dispose();
    };
    ArLangSelector.prototype.bind = function () {
        this.setLocales();
        this.themeChanged(this.theme);
    };
    ArLangSelector.prototype.setLocales = function () {
        if (this.locales.length === 0) {
            // use settings as default
            var settings = Container.instance.get('sd-settings');
            if (settings && settings.locales) {
                this.locales = settings.locales;
            }
        }
    };
    ArLangSelector.prototype.setLocale = function (locale) {
        this.locale = locale;
        this.ea.publish('locale:changed', this.locale);
        this.showSelector = false;
    };
    ArLangSelector.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'ar-lang-selector';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    __decorate([
        bindable
    ], ArLangSelector.prototype, "theme", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.oneWay })
    ], ArLangSelector.prototype, "locale", void 0);
    __decorate([
        bindable
    ], ArLangSelector.prototype, "locales", void 0);
    __decorate([
        bindable
    ], ArLangSelector.prototype, "dicoPrefix", void 0);
    ArLangSelector = __decorate([
        inject(Element, StyleEngine, EventAggregator),
        customElement('ar-lang-selector')
    ], ArLangSelector);
    return ArLangSelector;
}());
export { ArLangSelector };
