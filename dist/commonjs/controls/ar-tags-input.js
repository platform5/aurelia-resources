"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArTagsInput = void 0;
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_pal_1 = require("aurelia-pal");
var aurelia_binding_1 = require("aurelia-binding");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var core_1 = require("@aurelia-ux/core");
var aurelia_logging_1 = require("aurelia-logging");
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var removeAccents = require("remove-accents");
var ArTagsInput = /** @class */ (function () {
    function ArTagsInput(element, styleEngine, eventAggregator) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.eventAggregator = eventAggregator;
        this.allowEmptyTag = false;
        this.allowNewTag = true;
        this.visibles = {};
        this.newTag = '';
        this.newTagActive = false;
        this.log = aurelia_logging_1.getLogger('ar-tags-input');
    }
    ArTagsInput.prototype.bind = function () {
        var element = this.element;
        this.themeChanged(this.theme);
        this.valueChanged();
        this.availableTagsListChanged();
    };
    ArTagsInput.prototype.valueChanged = function () {
        if (typeof this.value === 'string')
            this.value = this.value.split(',');
        if (!Array.isArray(this.value))
            this.value = [];
        this.sort(this.value);
        var visibles = {};
        for (var _i = 0, _a = this.value; _i < _a.length; _i++) {
            var tag = _a[_i];
            visibles[tag] = true;
        }
        this.visibles = visibles;
    };
    ArTagsInput.prototype.availableTagsListChanged = function () {
        if (typeof this.availableTagsList === 'string')
            this.availableTagsList = this.availableTagsList.split(',');
        if (!Array.isArray(this.availableTagsList))
            this.availableTagsList = [];
        if (!this.allowEmptyTag && this.availableTagsList.includes('')) {
            this.availableTagsList = this.availableTagsList.filter(function (t) { return t !== ''; });
        }
        this.sort(this.availableTagsList);
        this.dispatchListChangeEvent();
    };
    Object.defineProperty(ArTagsInput.prototype, "remainingTags", {
        get: function () {
            var tags = [];
            for (var _i = 0, _a = this.availableTagsList; _i < _a.length; _i++) {
                var tag = _a[_i];
                if (this.value.indexOf(tag) === -1)
                    tags.push(tag);
            }
            return tags;
        },
        enumerable: false,
        configurable: true
    });
    ArTagsInput.prototype.attached = function () {
    };
    ArTagsInput.prototype.detached = function () {
    };
    ArTagsInput.prototype.sort = function (array) {
        array.sort(function (a, b) {
            var va = removeAccents(a.toLowerCase());
            var vb = removeAccents(b.toLowerCase());
            if (va < vb)
                return -1;
            if (va > vb)
                return 1;
            return 0;
        });
    };
    ArTagsInput.prototype.selectTag = function (tag) {
        if (this.availableTagsList.indexOf(tag) === -1) {
            this.availableTagsList.push(tag);
            this.availableTagsListChanged();
        }
        if (this.value.indexOf(tag) === -1)
            this.value.push(tag);
        this.sort(this.value);
        this.valueChanged();
        this.dispatchChangeEvent();
    };
    ArTagsInput.prototype.removeTag = function (tag) {
        var index = this.value.indexOf(tag);
        if (index !== -1)
            this.value.splice(index, 1);
        this.valueChanged();
        this.dispatchChangeEvent();
    };
    ArTagsInput.prototype.activeNewTag = function () {
        if (!this.allowNewTag)
            return;
        this.newTagActive = true;
        this.inputBox.focus();
    };
    ArTagsInput.prototype.newTagChanged = function () {
        if (!this.allowNewTag)
            return;
        if (!this.inputBox)
            return;
        var size = Math.max(4, this.newTag.length + 2);
        this.inputBox.setAttribute('size', size.toString());
    };
    ArTagsInput.prototype.blur = function () {
        if (!this.allowNewTag)
            return;
        if (this.newTag)
            this.selectTag(this.newTag);
        this.newTag = '';
        this.newTagActive = false;
    };
    ArTagsInput.prototype.keyDown = function (event) {
        if (event.keyCode === 13) {
            /*if (this.newTag) this.selectTag(this.newTag);
            this.newTag = '';
            this.newTagActive = false;*/
            this.blur();
        }
        return true;
    };
    ArTagsInput.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'ar-tags-input';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    ArTagsInput.prototype.dispatchChangeEvent = function () {
        var customEvent = aurelia_pal_1.DOM.createCustomEvent('change', { bubbles: true, detail: this.value });
        this.element.dispatchEvent(customEvent);
    };
    ArTagsInput.prototype.dispatchListChangeEvent = function () {
        var customEvent = aurelia_pal_1.DOM.createCustomEvent('list-change', { bubbles: true, detail: this.availableTagsList });
        this.element.dispatchEvent(customEvent);
    };
    __decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
    ], ArTagsInput.prototype, "value", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArTagsInput.prototype, "availableTagsList", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArTagsInput.prototype, "allowEmptyTag", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArTagsInput.prototype, "allowNewTag", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArTagsInput.prototype, "theme", void 0);
    __decorate([
        aurelia_binding_1.computedFrom('value', 'value.length', 'availableTagsList', 'availableTagsList.length')
    ], ArTagsInput.prototype, "remainingTags", null);
    __decorate([
        aurelia_binding_1.observable
    ], ArTagsInput.prototype, "newTag", void 0);
    ArTagsInput = __decorate([
        aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine, aurelia_event_aggregator_1.EventAggregator),
        aurelia_templating_1.customElement('ar-tags-input')
    ], ArTagsInput);
    return ArTagsInput;
}());
exports.ArTagsInput = ArTagsInput;
