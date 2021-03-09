System.register(["aurelia-framework", "aurelia-templating", "@aurelia-ux/core", "aurelia-logging", "aurelia-event-aggregator"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, aurelia_templating_1, core_1, aurelia_logging_1, aurelia_event_aggregator_1, ArLangSelector;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            },
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            }
        ],
        execute: function () {
            ArLangSelector = /** @class */ (function () {
                function ArLangSelector(element, styleEngine, ea) {
                    this.element = element;
                    this.styleEngine = styleEngine;
                    this.ea = ea;
                    this.locales = [];
                    this.dicoPrefix = 'lang.';
                    this.showSelector = false;
                    this.log = aurelia_logging_1.getLogger('ar-lang-selector');
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
                        var settings = aurelia_framework_1.Container.instance.get('sd-settings');
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
                    aurelia_framework_1.bindable
                ], ArLangSelector.prototype, "theme", void 0);
                __decorate([
                    aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneWay })
                ], ArLangSelector.prototype, "locale", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], ArLangSelector.prototype, "locales", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], ArLangSelector.prototype, "dicoPrefix", void 0);
                ArLangSelector = __decorate([
                    aurelia_framework_1.inject(Element, core_1.StyleEngine, aurelia_event_aggregator_1.EventAggregator),
                    aurelia_templating_1.customElement('ar-lang-selector')
                ], ArLangSelector);
                return ArLangSelector;
            }());
            exports_1("ArLangSelector", ArLangSelector);
        }
    };
});
