var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject, observable, bindable, bindingMode, computedFrom } from 'aurelia-framework';
import { getLogger } from 'aurelia-logging';
import countries from '../helpers/countries';
import PhoneNumber from 'awesome-phonenumber';
//import { DOM } from 'aurelia-pal';
var UxInputIntPhone = /** @class */ (function () {
    function UxInputIntPhone(element) {
        this.element = element;
        this.disabled = false;
        this.countriesFilter = null;
        //private countries = countries;
        this.uxInputTheme = {};
        this.uxSelectTheme = {};
        this.inputValue = '';
        //clickExemple(event) {
        //  event.stopPropagation();
        //  let event = DOM.createCustomEvent('click-item', {detail: this.element});
        //  this.element.dispatchEvent(event);
        //}
        this.countryCode = 'ch';
        this.countryPrefix = '+41';
        this.phonePlaceholder = '079 000 00 00';
        this.preventInternalValueUpdate = false;
        this.log = getLogger('comp:ux-input-int-phone');
    }
    Object.defineProperty(UxInputIntPhone.prototype, "countries", {
        get: function () {
            var _this = this;
            if (!this.countriesFilter)
                return countries;
            return countries.filter(function (i) { return _this.countriesFilter.indexOf(i.countryCode2) !== -1; });
        },
        enumerable: false,
        configurable: true
    });
    UxInputIntPhone.prototype.attached = function () {
        var _this = this;
        setTimeout(function () {
            var inputEl = _this.element.querySelector('input');
            if (inputEl instanceof HTMLInputElement) {
                // type="tel" pattern="[0-9]*" novalidate
                inputEl.setAttribute('type', 'tel');
                inputEl.setAttribute('pattern', '[0-9 ]*');
                inputEl.setAttribute('novalidate', 'novalidate');
                _this.countryCode = 'CH';
            }
        }, 50);
    };
    UxInputIntPhone.prototype.getCountryPrefix = function (countryCode) {
        return '+' + PhoneNumber.getCountryCodeForRegionCode(countryCode).toString();
    };
    UxInputIntPhone.prototype.countryCodeChanged = function () {
        this.countryPrefix = this.getCountryPrefix(this.countryCode);
        this.phonePlaceholder = PhoneNumber.getExample(this.countryCode, 'mobile').getNumber('national');
        var number = new PhoneNumber(this.inputValue || '', this.countryCode);
        if (!number.isValid()) {
            this.inputValue = '';
        }
    };
    UxInputIntPhone.prototype.openCountrySelector = function (event) {
        event.stopPropagation();
        //if (document.activeElement instanceof HTMLInputElement) document.activeElement.blur();
        //this.countrySelector.focus();
        this.countrySelect.focus();
    };
    UxInputIntPhone.prototype.inputValueChanged = function () {
        if (this.inputValue === undefined || this.inputValue === null) {
            this.isValid = this.isPossible = this.isMobile = false;
            this.national = this.international = this.value = '';
            return;
        }
        var iv = this.inputValue.toString();
        var number = new PhoneNumber(iv, this.countryCode);
        this.isValid = number.isValid();
        this.isPossible = number.isPossible();
        this.isMobile = number.isMobile();
        this.preventInternalValueUpdate = true;
        this.national = number.getNumber('national');
        this.value = this.international = number.getNumber();
        this.preventInternalValueUpdate = false;
        var ayt = PhoneNumber.getAsYouType(this.countryCode);
        ayt.reset(this.inputValue.replace(/[^+0-9]/g, ''));
        var newNumber = ayt.number();
        if (newNumber !== this.inputValue)
            this.inputValue = newNumber;
    };
    UxInputIntPhone.prototype.nationalChanged = function () {
        if (this.preventInternalValueUpdate)
            return;
        var number = new PhoneNumber(this.national, this.countryCode);
        this.inputValue = number.getNumber('national');
    };
    UxInputIntPhone.prototype.internationalChanged = function () {
        if (this.preventInternalValueUpdate)
            return;
        var number = new PhoneNumber(this.international, this.countryCode);
        this.inputValue = number.getNumber('national');
    };
    UxInputIntPhone.prototype.valueChanged = function () {
        if (this.preventInternalValueUpdate)
            return;
        var number = new PhoneNumber(this.value || '', this.countryCode);
        this.inputValue = number.getNumber('national');
    };
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay })
    ], UxInputIntPhone.prototype, "value", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay })
    ], UxInputIntPhone.prototype, "national", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay })
    ], UxInputIntPhone.prototype, "international", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.fromView })
    ], UxInputIntPhone.prototype, "isValid", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.fromView })
    ], UxInputIntPhone.prototype, "isMobile", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.fromView })
    ], UxInputIntPhone.prototype, "isPossible", void 0);
    __decorate([
        bindable
    ], UxInputIntPhone.prototype, "disabled", void 0);
    __decorate([
        bindable
    ], UxInputIntPhone.prototype, "label", void 0);
    __decorate([
        bindable
    ], UxInputIntPhone.prototype, "countriesFilter", void 0);
    __decorate([
        bindable
    ], UxInputIntPhone.prototype, "autocomplete", void 0);
    __decorate([
        bindable
    ], UxInputIntPhone.prototype, "uxInputTheme", void 0);
    __decorate([
        bindable
    ], UxInputIntPhone.prototype, "uxSelectTheme", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.fromView })
    ], UxInputIntPhone.prototype, "inputValue", void 0);
    __decorate([
        computedFrom('countriesFilter')
    ], UxInputIntPhone.prototype, "countries", null);
    __decorate([
        observable
    ], UxInputIntPhone.prototype, "countryCode", void 0);
    UxInputIntPhone = __decorate([
        inject(Element)
    ], UxInputIntPhone);
    return UxInputIntPhone;
}());
export { UxInputIntPhone };
