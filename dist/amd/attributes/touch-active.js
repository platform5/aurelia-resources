var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TouchActiveCustomAttribute = /** @class */ (function () {
        function TouchActiveCustomAttribute(element) {
            var _this = this;
            this.element = element;
            this.element.addEventListener('touchstart', function () {
                _this.element.classList.add('touching');
            });
            this.element.addEventListener('touchend', function () {
                _this.element.classList.remove('touching');
            });
            this.element.addEventListener('touchcancel', function () {
                _this.element.classList.remove('touching');
            });
        }
        TouchActiveCustomAttribute = __decorate([
            aurelia_framework_1.inject(Element)
        ], TouchActiveCustomAttribute);
        return TouchActiveCustomAttribute;
    }());
    exports.TouchActiveCustomAttribute = TouchActiveCustomAttribute;
});
