"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.arDialog = exports.ArDialog = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_logging_1 = require("aurelia-logging");
var aurelia_pal_1 = require("aurelia-pal");
var aurelia_templating_1 = require("aurelia-templating");
var core_1 = require("@aurelia-ux/core");
var notify_1 = require("../helpers/notify");
var ArDialog = /** @class */ (function () {
    function ArDialog(element, styleEngine, templatingEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.templatingEngine = templatingEngine;
        this.container = null;
        this.overlayDismiss = true;
        this.animation = 'zoom';
        this.animationDuration = 250; // TODO: use this setting to configure animation duration
        this.type = 'alert';
        this.transient = false; // if transient, the customElement is attached and removed of the DOM automatically when opening and closing
        this.promptCompName = 'ar-dialog-prompt';
        this.promptIncludedCompName = '';
        this.zIndex = 300;
        this.overlayVisible = false;
        this.dialogVisible = false;
        this.window = window;
        this.subscriptions = [];
        this.errorSubscriptions = [];
        this.log = aurelia_logging_1.getLogger('comp:ar-dialog');
    }
    ArDialog_1 = ArDialog;
    ArDialog.prototype.attached = function () {
        if (this.transient)
            this.open();
        else
            this.moveToContainer();
    };
    ArDialog.prototype.moveToContainer = function () {
        var container;
        if (this.container instanceof Element)
            container = this.container;
        else if (typeof this.container === 'string') {
            container = document.querySelector(this.container);
        }
        else {
            container = document.getElementsByTagName('BODY')[0];
        }
        container.appendChild(this.element);
    };
    ArDialog.prototype.removeFromContainer = function () {
        var container = this.element.parentElement;
        container.removeChild(this.element);
    };
    ArDialog.prototype.typeChanged = function () {
        var _this = this;
        if (this.type === 'prompt') {
            if (this.promptIncludedCompName !== this.promptCompName && this.promptVM) {
                if (this.promptVM.element)
                    this.promptVM.element.remove();
                this.promptVM.detached();
                this.promptVM = undefined;
            }
            this.promptIncludedCompName = this.promptCompName;
            if (this.createPromptTimeout)
                clearTimeout(this.createPromptTimeout);
            this.createPromptTimeout = setTimeout(function () {
                var element = aurelia_pal_1.DOM.createElement(_this.promptCompName);
                element.setAttribute('value.two-way', 'promptValue');
                if (_this.promptOptions) {
                    element.setAttribute('options.bind', 'promptOptions');
                }
                _this.promptContainer.appendChild(element);
                var bindingContext = _this;
                //let templatingEngine: TemplatingEngine = Container.instance.get(TemplatingEngine);
                _this.promptVM = _this.templatingEngine.enhance({ element: element, bindingContext: bindingContext });
                _this.promptVM.attached();
            }, 50);
        }
        else if (this.promptVM) {
            this.promptVM.element.remove();
            this.promptVM.detached();
            this.promptVM = undefined;
            this.promptIncludedCompName = '';
        }
    };
    ArDialog.prototype.detached = function () {
        this.removeFromContainer();
    };
    ArDialog.prototype.clickOnOverlay = function (event) {
        event.stopPropagation();
        if (this.overlayDismiss) {
            this.dismiss();
        }
        return true;
    };
    ArDialog.prototype.clickOnCard = function (event) {
        event.stopPropagation();
        return true;
    };
    ArDialog.prototype.stopPropagation = function (event) {
        event.stopPropagation();
        return true;
    };
    ArDialog.prototype.dismiss = function () {
        this.returnResponse({
            dismissed: true
        });
        this.close();
    };
    ArDialog.prototype.returnPromptValue = function () {
        this.returnResponse({
            dismissed: false,
            value: this.promptValue
        });
        this.close();
    };
    ArDialog.prototype.returnAgree = function (agree) {
        if (agree === void 0) { agree = true; }
        this.returnResponse({
            dismissed: false,
            agree: agree
        });
        this.close();
    };
    ArDialog.prototype.open = function () {
        var _this = this;
        setTimeout(function () {
            ArDialog_1.dialogLayers++;
            _this.setZIndex();
            _this.overlayVisible = true;
            _this.typeChanged();
        }, 1);
        setTimeout(function () {
            _this.dialogVisible = true;
        }, 10);
    };
    ArDialog.prototype.close = function () {
        var _this = this;
        ArDialog_1.dialogLayers--;
        this.dialogVisible = false;
        if (this.transient)
            this.remove();
        else {
            setTimeout(function () {
                _this.overlayVisible = false;
            }, this.animationDuration);
        }
    };
    ArDialog.prototype.remove = function () {
        var _this = this;
        setTimeout(function () {
            _this.detached();
        }, this.animationDuration);
    };
    ArDialog.prototype.processSaving = function () {
        var _this = this;
        if (this.editionCallback) {
            this.editionCallback().then(function (value) {
                _this.returnResponse({
                    value: value,
                    dismissed: false
                });
                _this.close();
            }).catch(notify_1.errorify);
        }
        else {
            this.returnResponse({
                value: null,
                dismissed: false
            });
            this.close();
        }
    };
    ArDialog.prototype.returnResponse = function (response) {
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var sub = _a[_i];
            sub(response);
        }
        this.subscriptions = [];
    };
    ArDialog.prototype.whenClosed = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.subscriptions.push(resolve);
            _this.errorSubscriptions.push(reject);
        });
    };
    ArDialog.prototype.setZIndex = function () {
        this.zIndex = ArDialog_1.zIndexRef + ArDialog_1.dialogLayers;
    };
    var ArDialog_1;
    ArDialog.zIndexRef = 300;
    ArDialog.dialogLayers = 0;
    __decorate([
        aurelia_framework_1.bindable
    ], ArDialog.prototype, "theme", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArDialog.prototype, "container", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArDialog.prototype, "overlayDismiss", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArDialog.prototype, "animation", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArDialog.prototype, "animationDuration", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArDialog.prototype, "type", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArDialog.prototype, "transient", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArDialog.prototype, "title", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArDialog.prototype, "content", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArDialog.prototype, "contentViewModelPath", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArDialog.prototype, "promptCompName", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArDialog.prototype, "promptOptions", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArDialog.prototype, "editionViewModelPath", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArDialog.prototype, "editionModel", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], ArDialog.prototype, "editionCallback", void 0);
    ArDialog = ArDialog_1 = __decorate([
        aurelia_templating_1.customElement('ar-dialog'),
        aurelia_framework_1.inject(Element, core_1.StyleEngine, aurelia_framework_1.TemplatingEngine)
    ], ArDialog);
    return ArDialog;
}());
exports.ArDialog = ArDialog;
var arDialog = function (options) {
    var element = aurelia_pal_1.DOM.createElement('ar-dialog');
    element.setAttribute('transient.bind', 'true');
    if (options && options.slotHTML)
        element.innerHTML = options.slotHTML;
    if (options && options.title)
        element.setAttribute('title', options.title);
    if (options && options.content)
        element.setAttribute('content', options.content);
    if (options && options.contentViewModelPath)
        element.setAttribute('content-view-model-path', options.contentViewModelPath);
    if (options && options.editionViewModelPath)
        element.setAttribute('edition-view-model-path', options.editionViewModelPath);
    if (options && options.promptCompName)
        element.setAttribute('prompt-comp-name', options.promptCompName);
    if (options && options.type)
        element.setAttribute('type', options.type);
    document.querySelector('body').appendChild(element);
    var bindingContext = (options && options.bindingContext) ? options.bindingContext : _this;
    if (!bindingContext)
        bindingContext = {};
    bindingContext.editionModel = options.editionModel;
    bindingContext.editionCallback = options.editionCallback;
    bindingContext.promptOptions = options.promptOptions;
    if (options && options.editionModel)
        element.setAttribute('edition-model.bind', 'editionModel');
    if (options && options.editionCallback)
        element.setAttribute('edition-callback.bind', 'editionCallback');
    if (options && options.promptOptions)
        element.setAttribute('prompt-options.bind', 'promptOptions');
    var templatingEngine = aurelia_framework_1.Container.instance.get(aurelia_framework_1.TemplatingEngine);
    var childView = templatingEngine.enhance({ element: element, bindingContext: bindingContext });
    childView.attached();
    var controllers = childView.controllers;
    return controllers[0].viewModel;
};
exports.arDialog = arDialog;
