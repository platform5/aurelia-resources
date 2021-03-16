"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArTimeline = void 0;
// https://www.w3schools.com/howto/howto_css_timeline.asp
// https://webdesign.tutsplus.com/tutorials/building-a-vertical-timeline-with-css-and-a-touch-of-javascript--cms-26528
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var core_1 = require("@aurelia-ux/core");
var aurelia_logging_1 = require("aurelia-logging");
var ArTimeline = /** @class */ (function () {
    function ArTimeline(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.colors = 'primary-white'; // primary-accent, accent-white, primary-app, accent-app
        this.autoOrder = true;
        this.order = 'asc';
        this.placeUndatedItemAtThe = 'end';
        this.positionning = 'alt'; // all-left, all-right, manual
        this.limit = -1;
        this.items = [];
        this.log = aurelia_logging_1.getLogger('ar-timeline');
        this.handleResize = function (e) {
        };
    }
    ArTimeline.prototype.bind = function () {
        this.themeChanged(this.theme);
    };
    ArTimeline.prototype.attached = function () {
        this.handleResize(null);
        window.addEventListener('resize', this.handleResize);
        this.autoOrderChanged();
        this.colorsChanged();
        this.positionningChanged();
    };
    ArTimeline.prototype.detached = function () {
        window.removeEventListener('resize', this.handleResize);
    };
    ArTimeline.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'ar-timeline';
        }
    };
    ArTimeline.prototype.colorsChanged = function () {
    };
    ArTimeline.prototype.itemsChanged = function () {
        this.autoOrderChanged();
    };
    ArTimeline.prototype.orderChanged = function () {
        this.autoOrderChanged();
    };
    ArTimeline.prototype.placeUndatedItemAtTheChanged = function () {
        this.autoOrderChanged();
    };
    ArTimeline.prototype.autoOrderChanged = function () {
        // by giving this method a small timeout
        // it allows the items to run the fixing script
        // for the date
        if (!this.items || this.items.length === 0)
            return;
        if (this.autoOrder) {
            var itemTimes = [];
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.date && item.date instanceof Date)
                    itemTimes.push(item.date.getTime());
            }
            itemTimes.sort(function (a, b) {
                if (a < b)
                    return -1;
                if (a > b)
                    return 1;
                return 0;
            });
            if (this.order === 'desc') {
                itemTimes.reverse();
            }
            for (var _b = 0, _c = this.items; _b < _c.length; _b++) {
                var item = _c[_b];
                if (item.date && item.date instanceof Date)
                    item.order = itemTimes.indexOf(item.date.getTime());
                else if (this.placeUndatedItemAtThe === 'beginning')
                    item.order = 0;
                else
                    item.order = this.items.length;
                item.hidden = (this.limit === -1) ? false : item.order > this.limit - 1;
            }
        }
        else {
            var index = 0;
            for (var _d = 0, _e = this.items; _d < _e.length; _d++) {
                var item = _e[_d];
                index++;
                item.hidden = (this.limit === -1) ? false : index > this.limit;
                item.order = null;
            }
        }
        this.positionningChanged();
    };
    ArTimeline.prototype.positionningChanged = function () {
        if (this.positionning === 'manual' || this.positionning === 'auto') {
            return;
        }
        if (this.positionning === 'all-right') {
            for (var _i = 0, _a = this.items || []; _i < _a.length; _i++) {
                var item = _a[_i];
                item.position = 'right';
            }
            return;
        }
        if (this.positionning === 'all-left') {
            for (var _b = 0, _c = this.items || []; _b < _c.length; _b++) {
                var item = _c[_b];
                item.position = 'left';
            }
            return;
        }
        var itemsToOrder = [];
        for (var _d = 0, _e = this.items || []; _d < _e.length; _d++) {
            var item = _e[_d];
            itemsToOrder.push(item);
        }
        itemsToOrder.sort(function (a, b) {
            if (a.order < b.order)
                return -1;
            else if (a.order > b.order)
                return 1;
            return 0;
        });
        var position = 'left';
        for (var _f = 0, _g = itemsToOrder || []; _f < _g.length; _f++) {
            var item = _g[_f];
            item.position = position;
            if (position === 'left')
                position = 'right';
            else if (position === 'right')
                position = 'left';
        }
    };
    __decorate([
        aurelia_templating_1.bindable
    ], ArTimeline.prototype, "theme", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArTimeline.prototype, "colors", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArTimeline.prototype, "autoOrder", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArTimeline.prototype, "order", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArTimeline.prototype, "placeUndatedItemAtThe", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArTimeline.prototype, "positionning", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArTimeline.prototype, "limit", void 0);
    __decorate([
        aurelia_templating_1.children('ar-timeline-item')
    ], ArTimeline.prototype, "items", void 0);
    ArTimeline = __decorate([
        aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
        aurelia_templating_1.customElement('ar-timeline')
    ], ArTimeline);
    return ArTimeline;
}());
exports.ArTimeline = ArTimeline;
function stopEvent(e) {
    e.stopPropagation();
}
