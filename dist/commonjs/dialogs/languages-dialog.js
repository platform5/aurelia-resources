"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguagesDialog = void 0;
var dom_1 = require("./../helpers/dom");
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_dialog_1 = require("aurelia-dialog");
var LanguagesDialog = /** @class */ (function () {
    function LanguagesDialog(controller) {
        this.controller = controller;
        this.prefix = '';
        this.languages = [];
        this.activated = false;
        this.cancelButtonType = 'text';
        this.okButtonType = 'text';
    }
    LanguagesDialog_1 = LanguagesDialog;
    LanguagesDialog.prototype.activate = function (options) {
        if (options && options.languages)
            this.languages = options.languages;
        if (options && options.language)
            this.selectLanguage(options.language);
        if (options && options.prefix)
            this.prefix = options.prefix;
        this.activated = true;
        this.setButtons();
    };
    LanguagesDialog.prototype.setButtons = function () {
        this.cancelButtonType = LanguagesDialog_1.CancelButtonType;
        this.okButtonType = LanguagesDialog_1.OkButtonType;
    };
    LanguagesDialog.prototype.attached = function () {
        this.centerSelectedLocale();
    };
    LanguagesDialog.prototype.centerSelectedLocale = function () {
        if (this.dialogContentElement) {
            // find the current locale line
            var index = this.languages.indexOf(this.language);
            if (index !== -1) {
                var item = this.dialogContentElement.querySelectorAll('ux-list-item').item(index);
                if (item && item instanceof HTMLElement) {
                    var top_1 = item.offsetTop - (this.dialogContentElement.offsetHeight / 2);
                    dom_1.DomHelpers.scrollToX(this.dialogContentElement, this.dialogContentElement.scrollTop, top_1, 0, 1 / 250, 20, dom_1.DomHelpers.easeOutCuaic);
                }
            }
        }
    };
    LanguagesDialog.prototype.selectLanguage = function (language) {
        if (this.languages.indexOf(language) !== -1) {
            this.language = language;
        }
        if (this.activated) {
            this.controller.close(true, this.language);
        }
    };
    LanguagesDialog.prototype.dismiss = function () {
        this.controller.cancel();
    };
    var LanguagesDialog_1;
    LanguagesDialog.CancelButtonType = 'text';
    LanguagesDialog.OkButtonType = 'raised';
    LanguagesDialog = LanguagesDialog_1 = __decorate([
        aurelia_framework_1.inject(aurelia_dialog_1.DialogController)
    ], LanguagesDialog);
    return LanguagesDialog;
}());
exports.LanguagesDialog = LanguagesDialog;
