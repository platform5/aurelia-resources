System.register(["../helpers/number", "aurelia-framework"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var number_1, aurelia_framework_1, NumStringValueConverter, RoundValueConverter, AddZeroDecimalValueConverter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (number_1_1) {
                number_1 = number_1_1;
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
            NumStringValueConverter = /** @class */ (function () {
                function NumStringValueConverter() {
                }
                NumStringValueConverter.prototype.toView = function (value, nbDecimals, separator) {
                    if (typeof value !== 'number') {
                        return value;
                    }
                    return number_1.NumberHelper.numString(value, nbDecimals, separator);
                };
                NumStringValueConverter = __decorate([
                    aurelia_framework_1.valueConverter('numString')
                ], NumStringValueConverter);
                return NumStringValueConverter;
            }());
            exports_1("NumStringValueConverter", NumStringValueConverter);
            RoundValueConverter = /** @class */ (function () {
                function RoundValueConverter() {
                }
                RoundValueConverter.prototype.toView = function (value, nbDecimal) {
                    if (typeof value !== 'number') {
                        return value;
                    }
                    return number_1.NumberHelper.round(value, nbDecimal).toString();
                };
                RoundValueConverter = __decorate([
                    aurelia_framework_1.valueConverter('round')
                ], RoundValueConverter);
                return RoundValueConverter;
            }());
            exports_1("RoundValueConverter", RoundValueConverter);
            AddZeroDecimalValueConverter = /** @class */ (function () {
                function AddZeroDecimalValueConverter() {
                }
                AddZeroDecimalValueConverter.prototype.toView = function (value, nbDecimal) {
                    if (typeof value !== 'number') {
                        return value;
                    }
                    return number_1.NumberHelper.addZeroDecimals(value, nbDecimal);
                };
                AddZeroDecimalValueConverter = __decorate([
                    aurelia_framework_1.valueConverter('addZeroDecimals')
                ], AddZeroDecimalValueConverter);
                return AddZeroDecimalValueConverter;
            }());
            exports_1("AddZeroDecimalValueConverter", AddZeroDecimalValueConverter);
        }
    };
});
