var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-templating", "aurelia-pal", "aurelia-binding", "aurelia-dependency-injection", "@aurelia-ux/modal"], function (require, exports, aurelia_templating_1, aurelia_pal_1, aurelia_binding_1, aurelia_dependency_injection_1, modal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FilterBooleanControl = /** @class */ (function () {
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
    exports.FilterBooleanControl = FilterBooleanControl;
    var getVm = function (_) { return _.au.controller.viewModel; };
    var defineFilterBooleanControlElementApis = function (element) {
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
});
