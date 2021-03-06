System.register(["./../helpers/dom", "aurelia-framework", "aurelia-dialog"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var dom_1, aurelia_framework_1, aurelia_dialog_1, LocalesDialog;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (dom_1_1) {
                dom_1 = dom_1_1;
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_dialog_1_1) {
                aurelia_dialog_1 = aurelia_dialog_1_1;
            }
        ],
        execute: function () {
            LocalesDialog = /** @class */ (function () {
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
            exports_1("LocalesDialog", LocalesDialog);
        }
    };
});
