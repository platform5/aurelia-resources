System.register(["./../helpers/dom", "aurelia-framework", "aurelia-dialog"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var dom_1, aurelia_framework_1, aurelia_dialog_1, CountriesDialog;
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
            CountriesDialog = /** @class */ (function () {
                function CountriesDialog(controller) {
                    this.controller = controller;
                    this.prefix = '';
                    this.countries = [];
                    this.activated = false;
                    this.cancelButtonType = 'text';
                    this.okButtonType = 'text';
                    console.log('constructor');
                }
                CountriesDialog_1 = CountriesDialog;
                CountriesDialog.prototype.activate = function (options) {
                    console.log('activate');
                    if (options && options.countries)
                        this.countries = options.countries;
                    if (options && options.country)
                        this.selectCountry(options.country);
                    if (options && options.prefix)
                        this.prefix = options.prefix;
                    this.activated = true;
                    this.setButtons();
                };
                CountriesDialog.prototype.setButtons = function () {
                    this.cancelButtonType = CountriesDialog_1.CancelButtonType;
                    this.okButtonType = CountriesDialog_1.OkButtonType;
                };
                CountriesDialog.prototype.attached = function () {
                    console.log('attached');
                    this.centerSelectedLocale();
                };
                CountriesDialog.prototype.centerSelectedLocale = function () {
                    console.log('centerSelectedLocale');
                    if (this.dialogContentElement) {
                        // find the current locale line
                        var index = this.countries.indexOf(this.country);
                        if (index !== -1) {
                            var item = this.dialogContentElement.querySelectorAll('ux-list-item').item(index);
                            if (item && item instanceof HTMLElement) {
                                var top_1 = item.offsetTop - (this.dialogContentElement.offsetHeight / 2);
                                dom_1.DomHelpers.scrollToX(this.dialogContentElement, this.dialogContentElement.scrollTop, top_1, 0, 1 / 250, 20, dom_1.DomHelpers.easeOutCuaic);
                            }
                        }
                    }
                };
                CountriesDialog.prototype.selectCountry = function (country) {
                    console.log('selectContry');
                    if (this.countries.indexOf(country) !== -1) {
                        this.country = country;
                    }
                    if (this.activated) {
                        this.controller.close(true, this.country);
                    }
                };
                CountriesDialog.prototype.dismiss = function () {
                    this.controller.cancel();
                };
                var CountriesDialog_1;
                CountriesDialog.CancelButtonType = 'text';
                CountriesDialog.OkButtonType = 'raised';
                CountriesDialog = CountriesDialog_1 = __decorate([
                    aurelia_framework_1.inject(aurelia_dialog_1.DialogController)
                ], CountriesDialog);
                return CountriesDialog;
            }());
            exports_1("CountriesDialog", CountriesDialog);
        }
    };
});
