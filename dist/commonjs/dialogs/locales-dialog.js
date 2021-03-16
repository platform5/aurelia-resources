"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalesDialog = void 0;
var dom_1 = require("./../helpers/dom");
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_dialog_1 = require("aurelia-dialog");
var LocalesDialog = /** @class */ (function () {
    function LocalesDialog(controller) {
        this.controller = controller;
        this.locales = [];
        this.activated = false;
        this.cancelButtonType = 'text';
        this.okButtonType = 'text';
    }
    LocalesDialog_1 = LocalesDialog;
    LocalesDialog.prototype.activate = function (options) {
        if (options && options.locales)
            this.locales = options.locales;
        if (options && options.locale)
            this.selectLocale(options.locale);
        this.activated = true;
        this.setButtons();
    };
    LocalesDialog.prototype.setButtons = function () {
        this.cancelButtonType = LocalesDialog_1.CancelButtonType;
        this.okButtonType = LocalesDialog_1.OkButtonType;
    };
    LocalesDialog.prototype.attached = function () {
        this.centerSelectedLocale();
    };
    LocalesDialog.prototype.centerSelectedLocale = function () {
        if (this.dialogContentElement) {
            // find the current locale line
            var index = this.locales.indexOf(this.locale);
            if (index !== -1) {
                var item = this.dialogContentElement.querySelectorAll('ux-list-item').item(index);
                if (item && item instanceof HTMLElement) {
                    var top_1 = item.offsetTop - (this.dialogContentElement.offsetHeight / 2);
                    dom_1.DomHelpers.scrollToX(this.dialogContentElement, this.dialogContentElement.scrollTop, top_1, 0, 1 / 250, 20, dom_1.DomHelpers.easeOutCuaic);
                }
            }
        }
    };
    LocalesDialog.prototype.selectLocale = function (locale) {
        if (this.locales.indexOf(locale) !== -1) {
            this.locale = locale;
        }
        if (this.activated) {
            this.controller.close(true, this.locale);
        }
    };
    LocalesDialog.prototype.dismiss = function () {
        this.controller.cancel();
    };
    var LocalesDialog_1;
    LocalesDialog.CancelButtonType = 'text';
    LocalesDialog.OkButtonType = 'raised';
    LocalesDialog = LocalesDialog_1 = __decorate([
        aurelia_framework_1.inject(aurelia_dialog_1.DialogController)
    ], LocalesDialog);
    return LocalesDialog;
}());
exports.LocalesDialog = LocalesDialog;
