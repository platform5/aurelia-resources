System.register(["aurelia-templating", "aurelia-pal", "aurelia-binding", "aurelia-dependency-injection", "@aurelia-ux/modal"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_templating_1, aurelia_pal_1, aurelia_binding_1, aurelia_dependency_injection_1, modal_1, FilterBooleanControl, getVm, defineFilterBooleanControlElementApis;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            },
            function (aurelia_binding_1_1) {
                aurelia_binding_1 = aurelia_binding_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (modal_1_1) {
                modal_1 = modal_1_1;
            }
        ],
        execute: function () {
            FilterBooleanControl = /** @class */ (function () {
                function FilterBooleanControl(element, modalService) {
                    this.element = element;
                    this.modalService = modalService;
                    this.disabled = false;
                    this.readonly = false;
                    this.labelType = 'true';
                    this.focused = false;
                    defineFilterBooleanControlElementApis(element);
                }
                FilterBooleanControl.prototype.getValue = function () {
                    return this.value;
                };
                FilterBooleanControl.prototype.setValue = function (value) {
                    if (value === undefined) {
                        this.value = undefined;
                    }
                    else {
                        this.value = value === true || (typeof value === 'string' && value !== '');
                    }
                };
                FilterBooleanControl.prototype.valueChanged = function () {
                    if (typeof this.value !== 'boolean' && this.value !== undefined) {
                        this.setValue(this.value);
                        return;
                    }
                    this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('change', { bubbles: true }));
                    this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('input', { bubbles: true }));
                };
                Object.defineProperty(FilterBooleanControl.prototype, "hasValue", {
                    get: function () {
                        return this.value !== undefined;
                    },
                    enumerable: true,
                    configurable: true
                });
                FilterBooleanControl.prototype.click = function (value) {
                    if (this.value === value) {
                        this.value = undefined;
                    }
                    else {
                        this.value = value;
                    }
                };
                __decorate([
                    aurelia_templating_1.bindable
                ], FilterBooleanControl.prototype, "disabled", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], FilterBooleanControl.prototype, "readonly", void 0);
                __decorate([
                    aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
                ], FilterBooleanControl.prototype, "value", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], FilterBooleanControl.prototype, "labelType", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], FilterBooleanControl.prototype, "labelYes", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], FilterBooleanControl.prototype, "labelNo", void 0);
                __decorate([
                    aurelia_binding_1.observable
                ], FilterBooleanControl.prototype, "focused", void 0);
                __decorate([
                    aurelia_binding_1.computedFrom('value')
                ], FilterBooleanControl.prototype, "hasValue", null);
                FilterBooleanControl = __decorate([
                    aurelia_dependency_injection_1.inject(Element, modal_1.UxModalService),
                    aurelia_templating_1.customElement('filter-boolean-control'),
                    aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./filter-boolean-control.html'))
                ], FilterBooleanControl);
                return FilterBooleanControl;
            }());
            exports_1("FilterBooleanControl", FilterBooleanControl);
            getVm = function (_) { return _.au.controller.viewModel; };
            defineFilterBooleanControlElementApis = function (element) {
                Object.defineProperties(element, {
                    value: {
                        get: function () {
                            return getVm(this).getValue();
                        },
                        set: function (value) {
                            getVm(this).setValue(value);
                        },
                        configurable: true
                    }
                });
            };
        }
    };
});
