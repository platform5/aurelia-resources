var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "../helpers/number", "aurelia-framework"], function (require, exports, number_1, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NumStringValueConverter = /** @class */ (function () {
        function NumStringValueConverter() {
        }
        NumStringValueConverter.prototype.toView = function (value) {
            return number_1.NumberHelper.numString(value);
        };
        NumStringValueConverter = __decorate([
            aurelia_framework_1.valueConverter('numString')
        ], NumStringValueConverter);
        return NumStringValueConverter;
    }());
    exports.NumStringValueConverter = NumStringValueConverter;
    var RoundValueConverter = /** @class */ (function () {
        function RoundValueConverter() {
        }
        RoundValueConverter.prototype.toView = function (value) {
            return number_1.NumberHelper.round(value).toString();
        };
        RoundValueConverter = __decorate([
            aurelia_framework_1.valueConverter('round')
        ], RoundValueConverter);
        return RoundValueConverter;
    }());
    exports.RoundValueConverter = RoundValueConverter;
    var AddZeroDecimalValueConverter = /** @class */ (function () {
        function AddZeroDecimalValueConverter() {
        }
        AddZeroDecimalValueConverter.prototype.toView = function (value) {
            return number_1.NumberHelper.addZeroDecimals(value);
        };
        AddZeroDecimalValueConverter = __decorate([
            aurelia_framework_1.valueConverter('addZeroDecimals')
        ], AddZeroDecimalValueConverter);
        return AddZeroDecimalValueConverter;
    }());
    exports.AddZeroDecimalValueConverter = AddZeroDecimalValueConverter;
});
