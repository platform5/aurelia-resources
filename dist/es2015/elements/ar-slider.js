var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, children } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
import { getLogger } from 'aurelia-logging';
import { DomHelpers } from '../helpers/dom';
var ArSlider = /** @class */ (function () {
    function ArSlider(element, styleEngine) {
        var _this = this;
        this.element = element;
        this.styleEngine = styleEngine;
        this.interval = 6000;
        this.transition = 600;
        this.slideBreakpoint = 320;
        this.margin = 20;
        this.gutter = 20;
        this.currentSlide = 0;
        this.showBullets = true;
        this.showArrows = true;
        this.autorun = true;
        this.slides = [];
        this.containerWidth = 320;
        this.slideWidth = 320;
        this.nbColumns = 1;
        this.running = false;
        this.log = getLogger('ar-slider');
        this.handleResize = function (e) {
            var nbColumns = 1;
            _this.containerWidth = _this.element.getElementsByClassName('container')[0].offsetWidth;
            nbColumns = Math.ceil(_this.containerWidth / _this.slideBreakpoint);
            _this.nbColumns = nbColumns;
            _this.positionSlides();
        };
    }
    ArSlider.prototype.bind = function () {
        var element = this.element;
        this.themeChanged(this.theme);
        this.slidesChanged();
        this.autorunChanged();
    };
    ArSlider.prototype.attached = function () {
        this.handleResize(null);
        window.addEventListener('resize', this.handleResize);
    };
    ArSlider.prototype.detached = function () {
        window.removeEventListener('resize', this.handleResize);
    };
    ArSlider.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'ar-slider';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    ArSlider.prototype.intervalChanged = function () {
        if (typeof this.interval === 'string')
            this.interval = parseInt(this.interval, 10);
    };
    ArSlider.prototype.transitionChanged = function () {
        if (typeof this.transition === 'string')
            this.transition = parseInt(this.transition, 10);
    };
    ArSlider.prototype.slideBreakpointChanged = function () {
        if (typeof this.slideBreakpoint === 'string')
            this.slideBreakpoint = parseInt(this.slideBreakpoint, 10);
    };
    ArSlider.prototype.autorunChanged = function () {
        if (!this.autorun && this.running) {
            this.stop();
        }
        if (this.autorun && !this.running) {
            this.start();
        }
    };
    ArSlider.prototype.start = function () {
        var _this = this;
        if (this.running)
            return;
        this.runningInterval = setInterval(function () {
            _this.right();
        }, this.interval);
        this.running = true;
    };
    ArSlider.prototype.stop = function () {
        if (!this.running)
            return;
        clearInterval(this.runningInterval);
        this.runningInterval = null;
        this.running = false;
    };
    ArSlider.prototype.slidesChanged = function () {
        this.positionSlides();
    };
    ArSlider.prototype.positionSlides = function () {
        if (this.nbColumns === 1) {
            this.slideWidth = this.containerWidth;
        }
        else if (this.nbColumns === 2) {
            this.slideWidth = (this.containerWidth - this.gutter) / 2;
        }
        else if (this.nbColumns === 3) {
            this.slideWidth = (this.containerWidth - (this.gutter * 2)) / 3;
        }
        for (var _i = 0, _a = this.slides; _i < _a.length; _i++) {
            var slide = _a[_i];
            slide.width = this.slideWidth;
            slide.gutter = this.gutter;
        }
        this.slideTo(this.currentSlide);
    };
    ArSlider.prototype.slideTo = function (slideIndex) {
        if (!this.slides || !this.slides.length)
            return;
        if (slideIndex < 0)
            return;
        if (slideIndex >= this.slides.length)
            return;
        if (slideIndex > this.slides.length - this.nbColumns) {
            slideIndex = Math.max(0, this.slides.length - this.nbColumns);
        }
        DomHelpers.horizontalScrollToX(this.container, this.container.scrollLeft, this.slides[slideIndex].element.offsetLeft, 0, 1 / this.transition, 20, DomHelpers.easeOutCuaic);
        this.currentSlide = slideIndex;
    };
    ArSlider.prototype.right = function (loop) {
        if (loop === void 0) { loop = true; }
        if (!this.slides || !Array.isArray(this.slides))
            return;
        if (this.currentSlide < this.slides.length - 1)
            this.slideTo(this.currentSlide + 1);
        else if (loop)
            this.slideTo(0);
    };
    ArSlider.prototype.left = function (loop) {
        if (loop === void 0) { loop = true; }
        if (!this.slides || !Array.isArray(this.slides))
            return;
        if (this.currentSlide > 0)
            this.slideTo(this.currentSlide - 1);
        else if (loop)
            this.slideTo(this.slides.length - 1);
    };
    __decorate([
        bindable
    ], ArSlider.prototype, "theme", void 0);
    __decorate([
        bindable
    ], ArSlider.prototype, "interval", void 0);
    __decorate([
        bindable
    ], ArSlider.prototype, "transition", void 0);
    __decorate([
        bindable
    ], ArSlider.prototype, "slideBreakpoint", void 0);
    __decorate([
        bindable
    ], ArSlider.prototype, "margin", void 0);
    __decorate([
        bindable
    ], ArSlider.prototype, "gutter", void 0);
    __decorate([
        bindable
    ], ArSlider.prototype, "currentSlide", void 0);
    __decorate([
        bindable
    ], ArSlider.prototype, "showBullets", void 0);
    __decorate([
        bindable
    ], ArSlider.prototype, "showArrows", void 0);
    __decorate([
        bindable
    ], ArSlider.prototype, "autorun", void 0);
    __decorate([
        children('ar-slide')
    ], ArSlider.prototype, "slides", void 0);
    ArSlider = __decorate([
        inject(Element, StyleEngine),
        customElement('ar-slider')
    ], ArSlider);
    return ArSlider;
}());
export { ArSlider };
function stopEvent(e) {
    e.stopPropagation();
}
