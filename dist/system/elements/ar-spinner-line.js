System.register(["aurelia-templating", "aurelia-dependency-injection", "@aurelia-ux/core", "./ar-spinner-line-theme", "aurelia-logging"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_templating_1, aurelia_dependency_injection_1, core_1, ar_spinner_line_theme_1, aurelia_logging_1, ArSpinnerLine;
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
            function (ar_spinner_line_theme_1_1) {
                ar_spinner_line_theme_1 = ar_spinner_line_theme_1_1;
            },
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            }
        ],
        execute: function () {
            ArSpinnerLine = /** @class */ (function () {
                function ArSpinnerLine(element, styleEngine) {
                    this.element = element;
                    this.styleEngine = styleEngine;
                    this.active = true;
                    this.log = aurelia_logging_1.getLogger('ar-spinner-line');
                }
                ArSpinnerLine.prototype.bind = function () {
                    if (!this.theme)
                        this.theme = new ar_spinner_line_theme_1.ArSpinnerLineTheme;
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
                    aurelia_templating_1.bindable
                ], ArSpinnerLine.prototype, "height", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], ArSpinnerLine.prototype, "theme", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], ArSpinnerLine.prototype, "active", void 0);
                ArSpinnerLine = __decorate([
                    aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
                    aurelia_templating_1.customElement('ar-spinner-line')
                ], ArSpinnerLine);
                return ArSpinnerLine;
            }());
            exports_1("ArSpinnerLine", ArSpinnerLine);
        }
    };
});
