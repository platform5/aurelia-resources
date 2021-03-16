"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmoothScroll = void 0;
var dom_1 = require("./../helpers/dom");
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_router_1 = require("aurelia-router");
var SmoothScroll = /** @class */ (function () {
    function SmoothScroll(element, animator, router) {
        this.subs = [];
        this.element = element;
        var config = SmoothScroll_1.defaultConfig;
        if (config.duration !== undefined)
            this.duration = config.duration;
        if (config.easing)
            this.easing = config.easing;
        if (config.container)
            this.container = config.container;
        if (config.offsetContainer)
            this.offsetContainer = config.offsetContainer;
        if (config.offset !== undefined)
            this.offset = config.offset;
    }
    SmoothScroll_1 = SmoothScroll;
    SmoothScroll.prototype.attached = function () {
        var sub = this.onClick.bind(this);
        this.subs.push(sub);
        this.element.addEventListener('click', sub);
    };
    SmoothScroll.prototype.detached = function () {
        if (this.subs)
            for (var _i = 0, _a = this.subs; _i < _a.length; _i++) {
                var sub = _a[_i];
                this.element.removeEventListener('click', sub);
            }
    };
    SmoothScroll.prototype.onClick = function (event) {
        event.preventDefault();
        this.scrollTo(this.element.getAttribute('href'));
        return false;
    };
    SmoothScroll.prototype.scrollTo = function (elementOrHash) {
        var target = elementOrHash;
        var hash = null;
        //find target by id or name
        if (typeof elementOrHash === 'string' && elementOrHash.indexOf('#') === 0) {
            hash = elementOrHash.slice(1, elementOrHash.length);
            if (hash) {
                target = document.body.querySelector("[id=\"" + hash + "\"]");
                if (!target)
                    target = document.body.querySelector("[name=\"" + hash + "\"]");
            }
            else {
                target = document.body;
            }
            /*
            TODO: Fix the problem that when using this part the router starts to have problems
            if (history) {
              history.pushState(null, null, '#' + hash);
            } else {
              //fallback to location.hash
              let t = document.body.scrollTop;
              location.hash = hash;
              document.body.scrollTop = t;
            }
            */
        }
        var e;
        if (this.container === 'body') {
            e = document.documentElement;
        }
        else if (this.container instanceof HTMLElement) {
            e = this.container;
        }
        else {
            var select = document.querySelector(this.container);
            if (select)
                e = select;
            else
                e = document.documentElement;
        }
        if (e.scrollTop === 0) {
            var t = e.scrollTop;
            ++e.scrollTop;
            e = t + 1 === e.scrollTop-- ? e : document.body;
        }
        var style = target.currentStyle || window.getComputedStyle(target);
        var marginTop = parseInt(style.marginTop, 10);
        var from = e.offsetTop;
        var to = target.offsetTop - this.getOffset() - (this.offset || 0) - marginTop;
        var easing = dom_1.DomHelpers.easeOutCuaic;
        if (this.easing && dom_1.DomHelpers[this.easing])
            easing = dom_1.DomHelpers[this.easing];
        dom_1.DomHelpers.scrollToX(e, from, to, 0, 1 / this.duration, 20, easing);
    };
    SmoothScroll.prototype.getOffset = function () {
        if (!this.offsetContainer)
            return 0;
        if (this.container instanceof HTMLElement) {
            return this.container.offsetHeight;
        }
        else {
            var container = document.querySelector(this.offsetContainer);
            if (container) {
                return container.offsetHeight;
            }
        }
        return 0;
    };
    var SmoothScroll_1;
    SmoothScroll.defaultConfig = {
        duration: 400,
        easing: 'ease-in',
        container: 'body',
        offsetContainer: 'header',
        offset: 0
    };
    __decorate([
        aurelia_framework_1.bindable
    ], SmoothScroll.prototype, "duration", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], SmoothScroll.prototype, "easing", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], SmoothScroll.prototype, "container", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], SmoothScroll.prototype, "offsetContainer", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], SmoothScroll.prototype, "offset", void 0);
    SmoothScroll = SmoothScroll_1 = __decorate([
        aurelia_framework_1.customAttribute('smooth-scroll'),
        aurelia_framework_1.noView,
        aurelia_framework_1.inject(Element, aurelia_router_1.Router)
    ], SmoothScroll);
    return SmoothScroll;
}());
exports.SmoothScroll = SmoothScroll;
