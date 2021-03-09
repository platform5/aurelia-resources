System.register(["aurelia-templating", "aurelia-dependency-injection", "@aurelia-ux/core", "aurelia-logging", "../helpers/dom"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_templating_1, aurelia_dependency_injection_1, core_1, aurelia_logging_1, dom_1, ArSlider;
    var __moduleName = context_1 && context_1.id;
    function stopEvent(e) {
        e.stopPropagation();
    }
    return {
        setters: [
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            },
            function (dom_1_1) {
                dom_1 = dom_1_1;
            }
        ],
        execute: function () {
            ArSlider = /** @class */ (function () {
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
                    this.log = aurelia_logging_1.getLogger('ar-slider');
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
                    dom_1.DomHelpers.horizontalScrollToX(this.container, this.container.scrollLeft, this.slides[slideIndex].element.offsetLeft, 0, 1 / this.transition, 20, dom_1.DomHelpers.easeOutCuaic);
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
                    aurelia_templating_1.bindable
                ], ArSlider.prototype, "theme", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], ArSlider.prototype, "interval", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], ArSlider.prototype, "transition", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], ArSlider.prototype, "slideBreakpoint", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], ArSlider.prototype, "margin", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], ArSlider.prototype, "gutter", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], ArSlider.prototype, "currentSlide", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], ArSlider.prototype, "showBullets", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], ArSlider.prototype, "showArrows", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], ArSlider.prototype, "autorun", void 0);
                __decorate([
                    aurelia_templating_1.children('ar-slide')
                ], ArSlider.prototype, "slides", void 0);
                ArSlider = __decorate([
                    aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
                    aurelia_templating_1.customElement('ar-slider')
                ], ArSlider);
                return ArSlider;
            }());
            exports_1("ArSlider", ArSlider);
        }
    };
});
