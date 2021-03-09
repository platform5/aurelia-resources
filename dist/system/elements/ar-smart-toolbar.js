System.register(["aurelia-templating", "aurelia-dependency-injection", "@aurelia-ux/core", "aurelia-logging", "aurelia-event-aggregator"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_templating_1, aurelia_dependency_injection_1, core_1, aurelia_logging_1, aurelia_event_aggregator_1, ArSmartToolbar;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
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
            ArSmartToolbar = /** @class */ (function () {
                function ArSmartToolbar(element, styleEngine, eventAggregator) {
                    this.element = element;
                    this.styleEngine = styleEngine;
                    this.eventAggregator = eventAggregator;
                    this.position = 'top';
                    this.shrinkOnScroll = false;
                    this.log = aurelia_logging_1.getLogger('ar-smart-toolbar');
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
                    aurelia_templating_1.bindable
                ], ArSmartToolbar.prototype, "id", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], ArSmartToolbar.prototype, "position", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], ArSmartToolbar.prototype, "shrinkOnScroll", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], ArSmartToolbar.prototype, "theme", void 0);
                ArSmartToolbar = __decorate([
                    aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine, aurelia_event_aggregator_1.EventAggregator),
                    aurelia_templating_1.customElement('ar-smart-toolbar')
                ], ArSmartToolbar);
                return ArSmartToolbar;
            }());
            exports_1("ArSmartToolbar", ArSmartToolbar);
        }
    };
});
