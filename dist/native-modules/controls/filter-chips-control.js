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
var FilterChipsControl = /** @class */ (function () {
    function FilterChipsControl(element, modalService) {
        this.element = element;
        this.modalService = modalService;
        this.disabled = false;
        this.readonly = false;
        this.multiple = false;
        this.options = [];
        this.labelKey = '';
        this.valueKey = '';
        this.focused = false;
        defineFilterChipsControlElementApis(element);
    }
    FilterChipsControl.prototype.getValue = function () {
        return this.value;
    };
    FilterChipsControl.prototype.setValue = function (value) {
        if (value === undefined) {
            this.value = undefined;
        }
        else {
            this.value = value;
        }
    };
    FilterChipsControl.prototype.valueChanged = function (newValue, oldValue) {
        this.fixValue();
        if (!newValue || !oldValue || JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
            this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
            this.element.dispatchEvent(DOM.createCustomEvent('input', { bubbles: true }));
        }
    };
    FilterChipsControl.prototype.fixValue = function () {
        if (this.multiple && !Array.isArray(this.value)) {
            this.value = [];
        }
        else if (!this.multiple && Array.isArray(this.value)) {
            this.value = undefined;
        }
    };
    Object.defineProperty(FilterChipsControl.prototype, "hasValue", {
        get: function () {
            return this.multiple ? this.value.length > 0 : this.value !== undefined;
        },
        enumerable: false,
        configurable: true
    });
    FilterChipsControl.prototype.toggle = function (value) {
        if (this.multiple) {
            if (!Array.isArray(value)) {
                this.fixValue();
            }
            var index = this.value.indexOf(value);
            var originalValue = [].concat.apply([], this.value);
            if (index === -1) {
                this.value.push(value);
            }
            else {
                this.value.splice(index, 1);
            }
            this.valueChanged(this.value, originalValue);
        }
        else {
            if (Array.isArray(value)) {
                this.fixValue();
            }
            var originalValue = this.value;
            if (this.value === value) {
                this.value = undefined;
            }
            else {
                this.value = value;
            }
            this.valueChanged(this.value, originalValue);
        }
    };
    FilterChipsControl.prototype.isSelected = function (v) {
        if (this.multiple) {
            if (!Array.isArray(this.value)) {
                this.fixValue();
            }
            var index = this.value.indexOf(v);
            return index !== -1;
        }
        else {
            if (Array.isArray(this.value)) {
                this.fixValue();
            }
            return this.value === v;
        }
    };
    __decorate([
        bindable
    ], FilterChipsControl.prototype, "disabled", void 0);
    __decorate([
        bindable
    ], FilterChipsControl.prototype, "readonly", void 0);
    __decorate([
        bindable
    ], FilterChipsControl.prototype, "multiple", void 0);
    __decorate([
        bindable
    ], FilterChipsControl.prototype, "options", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay })
    ], FilterChipsControl.prototype, "value", void 0);
    __decorate([
        bindable
    ], FilterChipsControl.prototype, "labelKey", void 0);
    __decorate([
        bindable
    ], FilterChipsControl.prototype, "valueKey", void 0);
    __decorate([
        observable
    ], FilterChipsControl.prototype, "focused", void 0);
    __decorate([
        computedFrom('value')
    ], FilterChipsControl.prototype, "hasValue", null);
    FilterChipsControl = __decorate([
        inject(Element, UxModalService),
        customElement('filter-chips-control'),
        useView(PLATFORM.moduleName('./filter-chips-control.html'))
    ], FilterChipsControl);
    return FilterChipsControl;
}());
export { FilterChipsControl };
var getVm = function (_) { return _.au.controller.viewModel; };
var defineFilterChipsControlElementApis = function (element) {
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
