var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NumberHelper } from '../helpers/number';
import { valueConverter } from 'aurelia-framework';
var NumStringValueConverter = /** @class */ (function () {
    function NumStringValueConverter() {
    }
    NumStringValueConverter.prototype.toView = function (value) {
        return NumberHelper.numString(value);
    };
    NumStringValueConverter = __decorate([
        valueConverter('numString')
    ], NumStringValueConverter);
    return NumStringValueConverter;
}());
export { NumStringValueConverter };
var RoundValueConverter = /** @class */ (function () {
    function RoundValueConverter() {
    }
    RoundValueConverter.prototype.toView = function (value) {
        return NumberHelper.round(value).toString();
    };
    RoundValueConverter = __decorate([
        valueConverter('round')
    ], RoundValueConverter);
    return RoundValueConverter;
}());
export { RoundValueConverter };
var AddZeroDecimalValueConverter = /** @class */ (function () {
    function AddZeroDecimalValueConverter() {
    }
    AddZeroDecimalValueConverter.prototype.toView = function (value) {
        return NumberHelper.addZeroDecimals(value);
    };
    AddZeroDecimalValueConverter = __decorate([
        valueConverter('addZeroDecimals')
    ], AddZeroDecimalValueConverter);
    return AddZeroDecimalValueConverter;
}());
export { AddZeroDecimalValueConverter };
