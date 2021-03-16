var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ArOption = void 0;
    var ArOption = /** @class */ (function () {
        function ArOption() {
            this.label = '';
            this.checked = false;
        }
        ArOption.prototype.valueChanged = function () {
        };
        ArOption.prototype.labelChanged = function () {
        };
        Object.defineProperty(ArOption.prototype, "computedLabel", {
            get: function () {
                if (this.label)
                    return this.label;
                if (this.value && typeof this.value === 'string')
                    return this.value;
                if (this.value && this.value.toString)
                    return this.value.toString();
                return '';
            },
            enumerable: false,
            configurable: true
        });
        __decorate([
            aurelia_framework_1.bindable
        ], ArOption.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable
        ], ArOption.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable
        ], ArOption.prototype, "checked", void 0);
        return ArOption;
    }());
    exports.ArOption = ArOption;
});
