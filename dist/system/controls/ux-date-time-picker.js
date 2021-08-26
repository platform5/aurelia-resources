System.register(["aurelia-framework", "moment"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, moment, UxDateTimePicker;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (moment_1) {
                moment = moment_1;
            }
        ],
        execute: function () {
            UxDateTimePicker = /** @class */ (function () {
                function UxDateTimePicker(element) {
                    this.element = element;
                    this.step = 3600;
                    this.preventApply = false;
                }
                UxDateTimePicker.prototype.bind = function () {
                    this.valueChanged();
                };
                UxDateTimePicker.prototype.valueChanged = function () {
                    this.setValueAndTime(this.value);
                };
                UxDateTimePicker.prototype.setValueAndTime = function (newValue) {
                    this.preventApply = true;
                    this._value = newValue;
                    this.applyDateToTime();
                    this.preventApply = false;
                };
                UxDateTimePicker.prototype.applyDateToTime = function () {
                    if (!this._value) {
                        this.time = '';
                        return;
                    }
                    var m = moment(this._value);
                    if (!m.isValid()) {
                        this.time = '';
                        return;
                    }
                    this.time = m.format('HH:mm');
                };
                UxDateTimePicker.prototype._valueChanged = function () {
                    this.requestApplyTimeToDate();
                };
                UxDateTimePicker.prototype.timeChanged = function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        this._valueChanged();
                    }
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
                    if (!this._value) {
                        this.time = '';
                        return;
                    }
                    var m = moment(this._value);
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
                    this._value = m.toDate();
                    this.value = this._value;
                    setTimeout(function () {
                        _this.preventApply = false;
                        _this.notifyChange();
                    }, 5);
                };
                UxDateTimePicker.prototype.notifyChange = function () {
                    this.element.dispatchEvent(new CustomEvent('change', { detail: this.value, bubbles: true }));
                };
                __decorate([
                    aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay })
                ], UxDateTimePicker.prototype, "value", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], UxDateTimePicker.prototype, "defaultTime", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], UxDateTimePicker.prototype, "step", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], UxDateTimePicker.prototype, "label", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], UxDateTimePicker.prototype, "placeholder", void 0);
                __decorate([
                    aurelia_framework_1.observable
                ], UxDateTimePicker.prototype, "time", void 0);
                __decorate([
                    aurelia_framework_1.observable
                ], UxDateTimePicker.prototype, "_value", void 0);
                UxDateTimePicker = __decorate([
                    aurelia_framework_1.inject(Element)
                ], UxDateTimePicker);
                return UxDateTimePicker;
            }());
            exports_1("UxDateTimePicker", UxDateTimePicker);
        }
    };
});
