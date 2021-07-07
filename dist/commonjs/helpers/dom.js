"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomHelpers = void 0;
var DomHelpers = /** @class */ (function () {
    function DomHelpers() {
    }
    DomHelpers.getContainer = function (element) {
        var _a, _b;
        if ((_b = (_a = element === null || element === void 0 ? void 0 : element.au) === null || _a === void 0 ? void 0 : _a.controller) === null || _b === void 0 ? void 0 : _b.container) {
            return element.au.controller.container;
        }
        if (element.parentElement) {
            return DomHelpers.getContainer(element.parentElement);
        }
        return undefined;
    };
    DomHelpers.disablePinch = function () {
        document.addEventListener('touchmove', function (event) {
            if (event.scale !== 1) {
                event.preventDefault();
            }
        }, false);
    };
    DomHelpers.disableDoubleTapToZoom = function () {
        var lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            var now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    };
    DomHelpers.scrollToTop = function (element, animate, duration, operation) {
        if (animate === void 0) { animate = false; }
        if (duration === void 0) { duration = 200; }
        if (operation === void 0) { operation = DomHelpers.easeOutCuaic; }
        if (!animate) {
            element.scrollTop = 0;
            return;
        }
        this.scrollToX(element, element.scrollTop, 0, 0, 1 / duration, 20, operation);
    };
    DomHelpers.scrollToBottom = function (element, animate, duration, operation) {
        if (animate === void 0) { animate = false; }
        if (duration === void 0) { duration = 200; }
        if (operation === void 0) { operation = DomHelpers.easeOutCuaic; }
        var scrollHeight = element.scrollHeight - element.offsetHeight;
        if (!animate) {
            element.scrollTop = scrollHeight;
            return;
        }
        this.scrollToX(element, element.scrollTop, scrollHeight, 0, 1 / duration, 20, operation);
    };
    DomHelpers.scrollToX = function (element, x1, x2, t, v, step, operation) {
        var _this = this;
        if (t < 0 || t > 1 || v <= 0)
            return;
        element.scrollTop = x1 - (x1 - x2) * operation(t);
        t += v * step;
        setTimeout(function () {
            _this.scrollToX(element, x1, x2, t, v, step, operation);
        }, step);
    };
    DomHelpers.horizontalScrollToX = function (element, x1, x2, t, v, step, operation) {
        var _this = this;
        if (t < 0 || t > 1 || v <= 0)
            return;
        element.scrollLeft = x1 - (x1 - x2) * operation(t);
        t += v * step;
        setTimeout(function () {
            _this.horizontalScrollToX(element, x1, x2, t, v, step, operation);
        }, step);
    };
    DomHelpers.linearTween = function (t) {
        return t;
    };
    DomHelpers.easeInQuad = function (t) {
        return t * t;
    };
    DomHelpers.easeOutQuad = function (t) {
        return -t * (t - 2);
    };
    DomHelpers.easeInOutQuad = function (t) {
        t /= 0.5;
        if (t < 1)
            return t * t / 2;
        t--;
        return (t * (t - 2) - 1) / 2;
    };
    DomHelpers.easeInCuaic = function (t) {
        return t * t * t;
    };
    DomHelpers.easeOutCuaic = function (t) {
        t--;
        return t * t * t + 1;
    };
    DomHelpers.easeInOutCuaic = function (t) {
        t /= 0.5;
        if (t < 1)
            return t * t * t / 2;
        t -= 2;
        return (t * t * t + 2) / 2;
    };
    DomHelpers.easeInQuart = function (t) {
        return t * t * t * t;
    };
    DomHelpers.easeOutQuart = function (t) {
        t--;
        return -(t * t * t * t - 1);
    };
    DomHelpers.easeInOutQuart = function (t) {
        t /= 0.5;
        if (t < 1)
            return 0.5 * t * t * t * t;
        t -= 2;
        return -(t * t * t * t - 2) / 2;
    };
    DomHelpers.easeInQuint = function (t) {
        return t * t * t * t * t;
    };
    DomHelpers.easeOutQuint = function (t) {
        t--;
        return t * t * t * t * t + 1;
    };
    DomHelpers.easeInOutQuint = function (t) {
        t /= 0.5;
        if (t < 1)
            return t * t * t * t * t / 2;
        t -= 2;
        return (t * t * t * t * t + 2) / 2;
    };
    DomHelpers.easeInSine = function (t) {
        return -Math.cos(t / (Math.PI / 2)) + 1;
    };
    DomHelpers.easeOutSine = function (t) {
        return Math.sin(t / (Math.PI / 2));
    };
    DomHelpers.easeInOutSine = function (t) {
        return -(Math.cos(Math.PI * t) - 1) / 2;
    };
    DomHelpers.easeInExpo = function (t) {
        return Math.pow(2, 10 * (t - 1));
    };
    DomHelpers.easeOutExpo = function (t) {
        return -Math.pow(2, -10 * t) + 1;
    };
    DomHelpers.easeInOutExpo = function (t) {
        t /= 0.5;
        if (t < 1)
            return Math.pow(2, 10 * (t - 1)) / 2;
        t--;
        return (-Math.pow(2, -10 * t) + 2) / 2;
    };
    DomHelpers.easeInCirc = function (t) {
        return -Math.sqrt(1 - t * t) - 1;
    };
    DomHelpers.easeOutCirc = function (t) {
        t--;
        return Math.sqrt(1 - t * t);
    };
    DomHelpers.easeInOutCirc = function (t) {
        t /= 0.5;
        if (t < 1)
            return -(Math.sqrt(1 - t * t) - 1) / 2;
        t -= 2;
        return (Math.sqrt(1 - t * t) + 1) / 2;
    };
    return DomHelpers;
}());
exports.DomHelpers = DomHelpers;
