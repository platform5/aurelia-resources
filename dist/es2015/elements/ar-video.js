var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
var ArVideo = /** @class */ (function () {
    function ArVideo(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.url = '';
        this.ratio = 16 / 9;
        this.autoPlay = false; // TODO
        this.provider = 'none';
        this.videoId = '';
    }
    ArVideo.prototype.bind = function () {
        this.themeChanged(this.theme);
        this.urlChanged();
    };
    ArVideo.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'ar-video';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    ArVideo.prototype.urlChanged = function () {
        this.detectProvider();
    };
    ArVideo.prototype.detectProvider = function () {
        if (!this.url) {
            this.provider = 'none';
            return;
        }
        if (this.url.indexOf('youtube.com') !== -1) {
            this.videoId = this.youtubeVideoId(this.url);
            if (!this.videoId) {
                this.provider = 'unkown';
            }
            else {
                this.provider = 'youtube';
            }
        }
        else if (this.url.indexOf('vimeo.com') !== -1) {
            this.videoId = this.vimeoVideoId(this.url);
            if (!this.videoId) {
                this.provider = 'unkown';
            }
            else {
                this.provider = 'vimeo';
            }
        }
        else {
            this.url = 'unkown';
        }
    };
    ArVideo.prototype.youtubeVideoId = function (youtubeUrl) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = youtubeUrl.match(regExp);
        if (match && match[2].length == 11) {
            return match[2];
        }
        else {
            return '';
        }
    };
    ArVideo.prototype.vimeoVideoId = function (vimeoUrl) {
        var regExp = /^.*(staffpicks\/|vimeo\.com\/)([^#\&\?\/]*).*/;
        var match = vimeoUrl.match(regExp);
        if (match && (match[2].length == 8 || match[2].length == 9)) {
            return match[2];
        }
        else {
            return '';
        }
    };
    __decorate([
        bindable
    ], ArVideo.prototype, "theme", void 0);
    __decorate([
        bindable
    ], ArVideo.prototype, "url", void 0);
    __decorate([
        bindable
    ], ArVideo.prototype, "ratio", void 0);
    __decorate([
        bindable
    ], ArVideo.prototype, "autoPlay", void 0);
    ArVideo = __decorate([
        inject(Element, StyleEngine),
        customElement('ar-video')
    ], ArVideo);
    return ArVideo;
}());
export { ArVideo };
