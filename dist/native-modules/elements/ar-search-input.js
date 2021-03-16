var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject, bindable, bindingMode } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';
import { StyleEngine } from '@aurelia-ux/core';
import { DOM } from 'aurelia-pal';
import { observable } from 'aurelia-binding';
var ArSearchInput = /** @class */ (function () {
    function ArSearchInput(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.autofocus = null;
        this.rawValue = '';
        this.focused = false;
        Object.setPrototypeOf(element, arSearchInputElementProto);
    }
    ArSearchInput.prototype.attached = function () {
        this.inputbox.addEventListener('change', stopEvent);
        this.inputbox.addEventListener('input', stopEvent);
    };
    ArSearchInput.prototype.detached = function () {
        if (this.inputbox)
            this.inputbox.removeEventListener('change', stopEvent);
        if (this.inputbox)
            this.inputbox.removeEventListener('input', stopEvent);
    };
    ArSearchInput.prototype.bind = function () {
        if (this.autofocus || this.autofocus === '') {
            this.focused = true;
        }
        this.themeChanged(this.theme);
    };
    ArSearchInput.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'ar-search-input';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    ArSearchInput.prototype.focusedChanged = function (focused) {
        this.element.dispatchEvent(DOM.createCustomEvent(focused ? 'focus' : 'blur', { bubbles: false }));
    };
    ArSearchInput.prototype.getValue = function () {
        return this.value;
    };
    ArSearchInput.prototype.setValue = function (value) {
        var oldValue = this.value;
        var newValue = this.processRawValue(value);
        if (oldValue !== newValue) {
            this.value = newValue;
            this.ignoreRawChanges = true;
            this.rawValue = newValue === null || newValue === undefined ? '' : newValue.toString();
            this.ignoreRawChanges = false;
            this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
        }
    };
    ArSearchInput.prototype.processRawValue = function (rawValue) {
        var newValue = rawValue;
        return newValue;
    };
    ArSearchInput.prototype.rawValueChanged = function (newValue) {
        if (this.ignoreRawChanges) {
            return;
        }
        this.setValue(newValue);
    };
    ArSearchInput.prototype.focus = function () {
        this.inputbox.focus();
    };
    __decorate([
        bindable
    ], ArSearchInput.prototype, "autofocus", void 0);
    __decorate([
        bindable
    ], ArSearchInput.prototype, "theme", void 0);
    __decorate([
        bindable
    ], ArSearchInput.prototype, "placeholder", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay })
    ], ArSearchInput.prototype, "value", void 0);
    __decorate([
        observable
    ], ArSearchInput.prototype, "rawValue", void 0);
    __decorate([
        observable
    ], ArSearchInput.prototype, "focused", void 0);
    ArSearchInput = __decorate([
        inject(Element, StyleEngine),
        customElement('ar-search-input')
    ], ArSearchInput);
    return ArSearchInput;
}());
export { ArSearchInput };
function stopEvent(e) {
    e.stopPropagation();
}
var getVm = function (_) { return _.au.controller.viewModel; };
var arSearchInputElementProto = Object.create(HTMLElement.prototype, {
    value: {
        get: function () {
            return getVm(this).getValue();
        },
        set: function (value) {
            getVm(this).setValue(value);
        }
    }
});
