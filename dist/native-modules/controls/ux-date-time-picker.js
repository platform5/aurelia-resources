var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { bindable, bindingMode, observable, inject } from 'aurelia-framework';
import * as moment from 'moment';
var UxDateTimePicker = /** @class */ (function () {
    function UxDateTimePicker(element) {
        this.element = element;
        this.step = 3600;
        this.preventApply = false;
    }
    UxDateTimePicker.prototype.bind = function () {
        this.applyDateToTime();
    };
    UxDateTimePicker.prototype.setValueAndTime = function (newValue) {
        this.value = newValue;
        this.applyDateToTime();
    };
    UxDateTimePicker.prototype.valueChanged = function () {
        this.requestApplyTimeToDate();
    };
    UxDateTimePicker.prototype.timeChanged = function (newValue, oldValue) {
        if (newValue !== oldValue) {
            this.applyTimeToDate();
        }
    };
    UxDateTimePicker.prototype.applyDateToTime = function () {
        if (!this.value) {
            this.time = '';
            return;
        }
        var m = moment(this.value);
        if (!m.isValid()) {
            this.time = '';
            return;
        }
        this.time = m.format('HH:mm');
    };
    UxDateTimePicker.prototype.requestApplyTimeToDate = function () {
        var _this = this;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            _this.applyTimeToDate();
        }, 50);
    };
    UxDateTimePicker.prototype.applyTimeToDate = function () {
        var _this = this;
        if (this.preventApply) {
            return;
        }
        if (!this.value) {
            this.time = '';
            return;
        }
        var m = moment(this.value);
        if (!m.isValid()) {
            this.time = '';
            return;
        }
        if (!this.time && this.defaultTime) {
            this.time = this.defaultTime;
            return; // this will trigger the timeChanged observer and come back here
        }
        var timeValues = this.time.split(':');
        var hour = parseInt(timeValues[0], 10);
        var minutes = parseInt(timeValues[1], 10);
        if (m.hour() === hour && m.minute() === minutes) {
            return; // time is correct
        }
        this.preventApply = true;
        m.hour(hour).minute(minutes);
        this.value = m.toDate();
        setTimeout(function () {
            _this.preventApply = false;
            _this.notifyChange();
        }, 5);
    };
    UxDateTimePicker.prototype.notifyChange = function () {
        this.element.dispatchEvent(new CustomEvent('change', { detail: this.value, bubbles: true }));
    };
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay })
    ], UxDateTimePicker.prototype, "value", void 0);
    __decorate([
        bindable
    ], UxDateTimePicker.prototype, "defaultTime", void 0);
    __decorate([
        bindable
    ], UxDateTimePicker.prototype, "step", void 0);
    __decorate([
        bindable
    ], UxDateTimePicker.prototype, "label", void 0);
    __decorate([
        bindable
    ], UxDateTimePicker.prototype, "placeholder", void 0);
    __decorate([
        observable
    ], UxDateTimePicker.prototype, "time", void 0);
    UxDateTimePicker = __decorate([
        inject(Element)
    ], UxDateTimePicker);
    return UxDateTimePicker;
}());
export { UxDateTimePicker };
