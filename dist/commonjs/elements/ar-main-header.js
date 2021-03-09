"use strict";
// interesting link for video detection in the future: https://davidwalsh.name/detect-supported-video-formats-javascript
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_templating_1 = require("aurelia-templating");
var core_1 = require("@aurelia-ux/core");
var ArMainHeader = /** @class */ (function () {
    function ArMainHeader(element, styleEngine) {
        var _this = this;
        this.element = element;
        this.styleEngine = styleEngine;
        this.fixedHeight = 300;
        this.fullScreen = true;
        this.transition = 'fade';
        this.duration = 10000;
        this.headerHeight = 300;
        this.backgroundIndex = 0;
        this.handleResize = function (e) {
            if (!_this.fullScreen) {
                _this.headerHeight = _this.fixedHeight;
                return;
            }
            var toolbar;
            var toolbarHeight = 0;
            // try to find a ar-smart-toolbar
            if (document.getElementsByTagName('ar-smart-toolbar')) {
                toolbar = document.getElementsByTagName('ar-smart-toolbar')[0];
            }
            // or a toolbar
            if (document.getElementsByTagName('toolbar')) {
                toolbar = document.getElementsByTagName('toolbar')[0];
            }
            if (toolbar) {
                toolbarHeight = toolbar.offsetHeight;
            }
            var screenHeight = window.innerHeight;
            _this.headerHeight = screenHeight - toolbarHeight;
        };
    }
    ArMainHeader.prototype.attached = function () {
        window.addEventListener('resize', this.handleResize);
        this.handleResize(null);
    };
    ArMainHeader.prototype.detached = function () {
        window.removeEventListener('resize', this.handleResize);
        clearInterval(this.severalUrlTimeout);
    };
    ArMainHeader.prototype.bind = function () {
        this.themeChanged(this.theme);
        this.backgroundUrlsChanged();
        this.fullScreenChanged();
    };
    ArMainHeader.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'ar-main-header';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    ArMainHeader.prototype.fullScreenChanged = function () {
        if (!this.fullScreen) {
            this.headerHeight = this.fixedHeight;
            window.removeEventListener('resize', this.handleResize);
        }
        else {
            window.addEventListener('resize', this.handleResize);
            this.handleResize(null);
        }
    };
    ArMainHeader.prototype.backgroundUrlsChanged = function () {
        var _this = this;
        clearInterval(this.severalUrlTimeout);
        this.backgroundIndex = 0;
        if (this.backgroundUrls && this.backgroundUrls.length && this.backgroundUrls.length > 1) {
            this.severalUrlTimeout = setInterval(function () {
                _this.backgroundIndex++;
                if (_this.backgroundIndex >= _this.backgroundUrls.length)
                    _this.backgroundIndex = 0;
            }, this.duration);
        }
    };
    __decorate([
        aurelia_framework_1.bindable
    ], ArMainHeader.prototype, "backgroundUrls", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArMainHeader.prototype, "backgroundUrl", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArMainHeader.prototype, "mp4Link", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArMainHeader.prototype, "theme", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArMainHeader.prototype, "fixedHeight", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArMainHeader.prototype, "fullScreen", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArMainHeader.prototype, "transition", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArMainHeader.prototype, "duration", void 0);
    ArMainHeader = __decorate([
        aurelia_framework_1.inject(Element, core_1.StyleEngine),
        aurelia_templating_1.customElement('ar-main-header')
    ], ArMainHeader);
    return ArMainHeader;
}());
exports.ArMainHeader = ArMainHeader;
