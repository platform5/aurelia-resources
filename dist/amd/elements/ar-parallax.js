var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-framework", "aurelia-logging"], function (require, exports, aurelia_framework_1, aurelia_logging_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var log = aurelia_logging_1.getLogger('ar-parallax');
    var ArParallax = /** @class */ (function () {
        function ArParallax(element) {
            var _this = this;
            this.element = element;
            this.intensity = 30;
            this.direction = 'slow';
            this.height = 300;
            this.compensation = 0;
            this.ready = false;
            this.minScroll = 0;
            this.maxScroll = 0;
            this.parallaxNow = 0;
            this.handleResize = function (e) {
                // measure the way
                _this.height = _this.imageElement.height * (1 - (_this.intensity / 100));
                _this.parallaxWay = _this.imageElement.height * (_this.intensity / 100);
            };
            this.handleScroll = function (e) {
                if (!_this.container)
                    return;
                if (_this.element.offsetTop > _this.container.offsetHeight) {
                    _this.minScroll = _this.element.offsetTop - _this.container.offsetHeight;
                }
                else {
                    _this.minScroll = 0;
                }
                var body = document.body;
                var html = document.documentElement;
                var totalHeight = Math.max(_this.container.scrollHeight, _this.container.offsetHeight);
                var spaceBottom = totalHeight - _this.element.offsetTop - _this.height;
                if (spaceBottom < _this.container.offsetHeight) {
                    _this.maxScroll = _this.element.offsetTop - _this.container.offsetHeight + _this.height + spaceBottom;
                }
                else {
                    _this.maxScroll = _this.element.offsetTop + _this.height;
                }
                var progress = (_this.container.scrollTop - _this.minScroll) / (_this.maxScroll - _this.minScroll);
                if (progress < 0)
                    return;
                if (progress > 1)
                    return;
                if (_this.direction === 'fast') {
                    _this.compensation = 0;
                    progress = 1 - progress;
                    var progressUsed = progress - 0.5;
                    _this.parallaxNow = (_this.parallaxWay * progressUsed) - (_this.parallaxWay / 2);
                }
                else {
                    var maxScroll = _this.height + _this.height + _this.container.offsetHeight;
                    var maxWay = _this.maxScroll - _this.minScroll;
                    var percentWay = maxWay / maxScroll;
                    if (percentWay > 0.2)
                        percentWay = percentWay * 2; // add some security in some cases
                    _this.compensation = _this.imageElement.height * (_this.intensity / 100) * (1 - percentWay);
                    var progressUsed = progress - 0.5;
                    _this.parallaxNow = (_this.parallaxWay * progressUsed) - (_this.parallaxWay / 2);
                }
                if (_this.element.offsetTop > _this.container.offsetHeight) {
                }
                else {
                    _this.parallaxNow += _this.compensation;
                }
                _this.imageElement.style.transform = 'translateY(' + _this.parallaxNow + 'px)';
            };
        }
        ArParallax.prototype.bind = function () {
        };
        ArParallax.prototype.attached = function () {
            var _this = this;
            this.container = this.findScrollingContainer();
            if (this.container) {
                this.container.addEventListener('resize', this.handleResize);
                this.container.addEventListener('scroll', this.handleScroll);
            }
            this.imageElement = this.findImage();
            if (this.imageElement.complete) {
                this.handleResize(null);
                this.handleScroll(null);
                this.ready = true;
            }
            else if (this.imageElement) {
                this.imageElement.onload = function () {
                    _this.handleResize(null);
                    _this.handleScroll(null);
                    _this.ready = true;
                };
            }
        };
        ArParallax.prototype.detached = function () {
            this.container.removeEventListener('resize', this.handleResize);
            this.container.removeEventListener('scroll', this.handleScroll);
        };
        ArParallax.prototype.findImage = function () {
            return this.element.querySelector('img');
        };
        ArParallax.prototype.findScrollingContainer = function () {
            var currentElement = this.element;
            var found = false;
            var counter = 0;
            do {
                currentElement = currentElement.parentElement;
                var overflowY = void 0;
                if (window.getComputedStyle) {
                    var style = window.getComputedStyle(currentElement, null);
                    overflowY = style.overflowY;
                }
                else if (currentElement.currentStyle) {
                    overflowY = currentElement.currentStyle.overflowY;
                }
                if (overflowY === 'scroll')
                    found = true;
                else if (overflowY === 'auto')
                    found = true;
                else if (currentElement.tagName === 'BODY')
                    found = true;
                counter++;
            } while (found === false && currentElement.parentElement && counter < 1000);
            if (found)
                return currentElement;
            else
                return null;
        };
        __decorate([
            aurelia_framework_1.bindable
        ], ArParallax.prototype, "intensity", void 0);
        __decorate([
            aurelia_framework_1.bindable
        ], ArParallax.prototype, "direction", void 0);
        ArParallax = __decorate([
            aurelia_framework_1.inject(Element)
        ], ArParallax);
        return ArParallax;
    }());
    exports.ArParallax = ArParallax;
});
