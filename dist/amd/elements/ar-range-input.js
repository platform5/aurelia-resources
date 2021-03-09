var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "multirange", "aurelia-templating", "aurelia-pal", "aurelia-binding", "aurelia-dependency-injection", "@aurelia-ux/core", "aurelia-logging"], function (require, exports, multirange, aurelia_templating_1, aurelia_pal_1, aurelia_binding_1, aurelia_dependency_injection_1, core_1, aurelia_logging_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var log = aurelia_logging_1.getLogger('ar-range-input');
    var ArRangeInput = /** @class */ (function () {
        function ArRangeInput(element, styleEngine) {
            this.element = element;
            this.styleEngine = styleEngine;
            this.type = 'circle'; // circle, square, progress
            this.value = 0;
            this.min = 0;
            this.max = 100;
            this.step = 1;
            this.multiple = false;
            this.low = null;
            this.high = null;
            this.rawValueUpdating = false;
            this.handleResize = function (e) {
            };
        }
        ArRangeInput.prototype.bind = function () {
            var element = this.element;
            this.valueChanged();
            this.themeChanged(this.theme);
        };
        ArRangeInput.prototype.attached = function () {
            this.handleResize(null);
            window.addEventListener('resize', this.handleResize);
            this.setMultirange();
        };
        ArRangeInput.prototype.multipleChanged = function () {
            this.setMultirange();
        };
        ArRangeInput.prototype.setMultirange = function () {
            // if (!(window as any).multirange) {
            //   throw new Error('Missing multirange in globals');
            // }
            var input = this.element.getElementsByTagName('INPUT');
            if (!input[0])
                return;
            if (this.multiple) {
                input[0].setAttribute('multiple', 'multiple');
                this.rawValue = this.low.toString() + "," + this.high.toString();
                input[0].setAttribute('value', this.rawValue);
                multirange(input[0]);
            }
            else {
                input[0].removeAttribute('multiple');
            }
            this.listenToInputChange();
        };
        ArRangeInput.prototype.listenToInputChange = function () {
            var _this = this;
            if (!this.multiple)
                return;
            var inputs = this.element.getElementsByTagName('INPUT');
            var original = this.element.getElementsByClassName('original');
            if (original[0])
                original = original[0];
            else
                return;
            for (var index = 0; index < inputs.length; index++) {
                var input = inputs.item(index);
                if (input.classList.contains('__l'))
                    continue;
                input.addEventListener('input', function () {
                    _this.low = original.valueLow;
                    _this.high = original.valueHigh;
                });
                input.classList.add('__l');
            }
        };
        ArRangeInput.prototype.detached = function () {
            window.removeEventListener('resize', this.handleResize);
        };
        ArRangeInput.prototype.themeChanged = function (newValue) {
            if (newValue != null && newValue.themeKey == null) {
                newValue.themeKey = 'ar-range-input';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        };
        ArRangeInput.prototype.valueChanged = function () {
            if (!this.rawValueUpdating)
                this.rawValue = this.value.toString();
            var diff = this.max - this.min;
            var pos = this.value - this.min;
            this.progress = pos / diff * 100;
            var event = aurelia_pal_1.DOM.createCustomEvent('change', { bubbles: true, detail: this.progress });
            this.element.dispatchEvent(event);
        };
        ArRangeInput.prototype.rawValueChanged = function () {
            this.rawValueUpdating = true;
            this.value = parseFloat(this.rawValue);
            this.rawValueUpdating = false;
        };
        __decorate([
            aurelia_templating_1.bindable
        ], ArRangeInput.prototype, "theme", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArRangeInput.prototype, "type", void 0);
        __decorate([
            aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
        ], ArRangeInput.prototype, "value", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArRangeInput.prototype, "min", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArRangeInput.prototype, "max", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArRangeInput.prototype, "step", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArRangeInput.prototype, "multiple", void 0);
        __decorate([
            aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
        ], ArRangeInput.prototype, "low", void 0);
        __decorate([
            aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
        ], ArRangeInput.prototype, "high", void 0);
        __decorate([
            aurelia_binding_1.observable
        ], ArRangeInput.prototype, "rawValue", void 0);
        ArRangeInput = __decorate([
            aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
            aurelia_templating_1.customElement('ar-range-input')
        ], ArRangeInput);
        return ArRangeInput;
    }());
    exports.ArRangeInput = ArRangeInput;
    function stopEvent(e) {
        e.stopPropagation();
    }
});
