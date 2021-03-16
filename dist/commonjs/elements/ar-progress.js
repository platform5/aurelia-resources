"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArProgress = void 0;
// https://www.w3schools.com/howto/howto_js_rangeslider.asp
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var core_1 = require("@aurelia-ux/core");
var aurelia_logging_1 = require("aurelia-logging");
var ArProgress = /** @class */ (function () {
    function ArProgress(element, styleEngine) {
        var _this = this;
        this.element = element;
        this.styleEngine = styleEngine;
        this.value = 0;
        this.label = '';
        this.type = 'circle'; // circle, line
        this.finePosition = 'ext';
        this.width = '100%';
        this.animate = true;
        this.fineStrokeWidth = 4;
        this.largeStrokeWidth = 4;
        this.svgWidth = 100;
        this.increment = 2;
        this.timeout = 20;
        this.fineArc = ''; // arc of the fine line
        this.largeArc = ''; // arc of the progress
        this._value = 0;
        this.elementWidth = 0;
        this.fontSize = '40px'; // will be calculated automatically according to element width
        this.lineFontSize = '12px'; // will be calculated automatically according to element height
        this.animating = false;
        this.log = aurelia_logging_1.getLogger('ar-progress');
        this.handleResize = function (e) {
            _this.elementWidth = _this.element.offsetWidth;
            _this.fontSize = _this.elementWidth * 0.35 + "px";
        };
    }
    ArProgress.prototype.bind = function () {
        var element = this.element;
        this.valueChanged();
        this.themeChanged(this.theme);
    };
    ArProgress.prototype.attached = function () {
        var _this = this;
        this.handleResize(null);
        window.addEventListener('resize', this.handleResize);
        this.setFineArc();
        this.typeChanged();
        setTimeout(function () {
            _this.typeChanged();
        }, 100);
    };
    ArProgress.prototype.detached = function () {
        window.removeEventListener('resize', this.handleResize);
    };
    ArProgress.prototype.widthChanged = function () {
        this.handleResize(null);
    };
    ArProgress.prototype.finePositionChanged = function () {
        this.setFineArc();
    };
    ArProgress.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'ar-progress';
        }
        if (newValue == null || newValue.largeStrokeWidth == null) {
            this.largeStrokeWidth = 4;
        }
        else {
            // adjust stroke width to theme
            this.largeStrokeWidth = newValue.largeStrokeWidth;
        }
        if (newValue == null || newValue.fineStrokeWidth == null) {
            this.fineStrokeWidth = 1;
        }
        else {
            // adjust stroke width to theme
            this.fineStrokeWidth = newValue.fineStrokeWidth;
        }
        this.styleEngine.applyTheme(newValue, this.element);
        this.setFineArc();
        this.updateLargeArc();
    };
    ArProgress.prototype.valueChanged = function () {
        var _this = this;
        this.value = Math.round(this.value);
        if (!this.animate) {
            this._value = this.value;
            if (!this.largePath) {
                // wait 250ms to allow the view to be ready to have a value change in path arc
                setTimeout(function () {
                    _this.updateLargeArc();
                }, 250);
            }
            else {
                // if this.largePath exists it means the view is ready
                this.updateLargeArc();
            }
            return;
        }
        this.startAnimation();
    };
    ArProgress.prototype.animateChanged = function () {
        if (this.animate) {
            this._value = 0;
            this.startAnimation();
        }
    };
    ArProgress.prototype.typeChanged = function () {
        var _this = this;
        if (this.type === 'line') {
            // calculate font size
            var firstDiv = this.element.getElementsByTagName('div')[0];
            if (!firstDiv && this.type === 'line') {
                setTimeout(function () { _this.typeChanged(); }, 50);
                return;
            }
            var secondDiv = firstDiv.getElementsByTagName('div')[0];
            if (!secondDiv && this.type === 'line') {
                setTimeout(function () { _this.typeChanged(); }, 50);
                return;
            }
            var height = secondDiv.offsetHeight;
            this.lineFontSize = height * 0.55 + "px";
        }
        else if (this.type === 'circle') {
            setTimeout(function () {
                _this.setFineArc();
                _this.updateLargeArc();
            }, 200);
        }
    };
    ArProgress.prototype.setFineArc = function () {
        var angle = 360;
        // setting the default radius to place it at the ext of the large circle
        var radius = this.svgWidth / 2 - this.fineStrokeWidth / 2;
        if (this.finePosition === 'center') {
            radius = this.svgWidth / 2 - this.largeStrokeWidth / 2;
        }
        else if (this.finePosition === 'int') {
            radius = this.svgWidth / 2 - this.largeStrokeWidth + this.fineStrokeWidth / 2;
        }
        this.fineArc = this.describeArc(this.svgWidth / 2, this.svgWidth / 2, radius, 0, angle);
        if (this.finePath)
            this.finePath.setAttribute('d', this.fineArc);
    };
    ArProgress.prototype.startAnimation = function () {
        var _this = this;
        if (this.animating)
            return;
        this.animating = setInterval(function () {
            if (_this._value == _this.value) {
                clearInterval(_this.animating);
                _this.animating = null;
            }
            if (_this._value > _this.value)
                _this._value = Math.max(_this._value - _this.increment, _this.value);
            if (_this._value < _this.value)
                _this._value = Math.min(_this._value + _this.increment, _this.value);
            _this.updateLargeArc();
        }, this.timeout);
    };
    ArProgress.prototype.updateLargeArc = function () {
        var angle = this._value / 100 * 360;
        this.largeArc = this.describeArc(this.svgWidth / 2, this.svgWidth / 2, this.svgWidth / 2 - this.largeStrokeWidth / 2, 0, angle);
        if (this.largePath)
            this.largePath.setAttribute('d', this.largeArc);
    };
    ArProgress.prototype.polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        var xy = {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
        xy.x = Math.floor(xy.x * 100) / 100;
        xy.y = Math.floor(xy.y * 100) / 100;
        return xy;
    };
    ArProgress.prototype.describeArc = function (x, y, radius, startAngle, endAngle) {
        var start = this.polarToCartesian(x, y, radius, endAngle);
        var end = this.polarToCartesian(x, y, radius, startAngle);
        var arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
        var d = [
            'M', start.x, start.y,
            'A', radius, radius, 0, arcSweep, 0, end.x, end.y
        ].join(' ');
        return d;
    };
    __decorate([
        aurelia_templating_1.bindable
    ], ArProgress.prototype, "theme", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArProgress.prototype, "value", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArProgress.prototype, "label", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArProgress.prototype, "type", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArProgress.prototype, "finePosition", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArProgress.prototype, "width", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArProgress.prototype, "animate", void 0);
    ArProgress = __decorate([
        aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
        aurelia_templating_1.customElement('ar-progress')
    ], ArProgress);
    return ArProgress;
}());
exports.ArProgress = ArProgress;
function stopEvent(e) {
    e.stopPropagation();
}
