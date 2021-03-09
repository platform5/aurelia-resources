var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, useView } from 'aurelia-templating';
import { DOM, PLATFORM } from 'aurelia-pal';
import { observable, computedFrom, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { UxModalService } from '@aurelia-ux/modal';
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
        this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
        this.element.dispatchEvent(DOM.createCustomEvent('input', { bubbles: true }));
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
        bindable
    ], FilterBooleanControl.prototype, "disabled", void 0);
    __decorate([
        bindable
    ], FilterBooleanControl.prototype, "readonly", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay })
    ], FilterBooleanControl.prototype, "value", void 0);
    __decorate([
        bindable
    ], FilterBooleanControl.prototype, "labelType", void 0);
    __decorate([
        bindable
    ], FilterBooleanControl.prototype, "labelYes", void 0);
    __decorate([
        bindable
    ], FilterBooleanControl.prototype, "labelNo", void 0);
    __decorate([
        observable
    ], FilterBooleanControl.prototype, "focused", void 0);
    __decorate([
        computedFrom('value')
    ], FilterBooleanControl.prototype, "hasValue", null);
    FilterBooleanControl = __decorate([
        inject(Element, UxModalService),
        customElement('filter-boolean-control'),
        useView(PLATFORM.moduleName('./filter-boolean-control.html'))
    ], FilterBooleanControl);
    return FilterBooleanControl;
}());
export { FilterBooleanControl };
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
