"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArNotification = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_notify_1 = require("aurelia-notify");
var core_1 = require("@aurelia-ux/core");
var ArNotification = /** @class */ (function () {
    function ArNotification(controller, element, styleEngine) {
        this.controller = controller;
        this.element = element;
        this.styleEngine = styleEngine;
    }
    ArNotification.prototype.activate = function (model) {
        this.level = model.level;
        this.notification = model.notification;
        this.data = model.data || {};
    };
    ArNotification.prototype.bind = function () {
        this.themeChanged(this.theme);
    };
    ArNotification.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'ar-notification';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    ArNotification.prototype.doAction = function () {
        if (this.data.actionCallback && typeof this.data.actionCallback === 'function') {
            var context = this.data.actionContext || null;
            this.data.actionCallback.call(context);
        }
        this.controller.close();
    };
    __decorate([
        aurelia_framework_1.bindable
    ], ArNotification.prototype, "theme", void 0);
    ArNotification = __decorate([
        aurelia_framework_1.inject(aurelia_notify_1.NotificationController, Element, core_1.StyleEngine)
    ], ArNotification);
    return ArNotification;
}());
exports.ArNotification = ArNotification;
