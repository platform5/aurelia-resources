"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslateValueConverter = void 0;
var aurelia_binding_1 = require("aurelia-binding");
var aurelia_framework_1 = require("aurelia-framework");
// This valueConverter will be registered if no other t valueConverter are registered
var TranslateValueConverter = /** @class */ (function () {
    function TranslateValueConverter(container) {
        this.container = container;
        this.tVC = null;
        var aurelia = this.container.get(aurelia_framework_1.Aurelia);
        if (aurelia.resources.getValueConverter('t')) {
            this.tVC = aurelia.resources.getValueConverter('t');
        }
    }
    TranslateValueConverter.prototype.toView = function (value) {
        if (this.tVC !== null && this.tVC.toView) {
            try {
                var translatedValue = this.tVC.toView(value);
                return translatedValue;
            }
            catch (error) {
                // ignore
            }
        }
        return value;
    };
    TranslateValueConverter = __decorate([
        aurelia_binding_1.valueConverter('translate'),
        aurelia_framework_1.inject(aurelia_framework_1.Container)
    ], TranslateValueConverter);
    return TranslateValueConverter;
}());
exports.TranslateValueConverter = TranslateValueConverter;
