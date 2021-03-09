"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = require("./../helpers/dom");
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var core_1 = require("@aurelia-ux/core");
var aurelia_logging_1 = require("aurelia-logging");
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_pal_1 = require("aurelia-pal");
var removeAccents = require("remove-accents");
var ar_dialog_1 = require("./ar-dialog");
var ArSelect = /** @class */ (function () {
    function ArSelect(element, styleEngine, eventAggregator) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.eventAggregator = eventAggregator;
        this.multiple = false;
        this.allowAny = false;
        this.displaySearch = 'auto';
        this.searchTrigger = 10;
        this.placeholder = 'Click to select a value';
        this.addExtraValueButtonText = 'Add Custom Value';
        this.wrap = true;
        this.disabled = false;
        this.options = [];
        this.focused = false;
        this.mapHeight = 300;
        this.extraValues = [];
        this.filter = '';
        this.compareValues = function (a, b) {
            return a === b;
        };
        this.zIndex = 10;
        this.log = aurelia_logging_1.getLogger('ar-select');
    }
    ArSelect.prototype.bind = function () {
        var element = this.element;
        this.themeChanged(this.theme);
        this.optionsChanged();
        this.valueChanged();
    };
    ArSelect.prototype.attached = function () {
        var _this = this;
        setTimeout(function () {
            _this.detectExtraValues();
        }, 250);
    };
    ArSelect.prototype.detached = function () {
    };
    ArSelect.prototype.setZIndex = function () {
        this.zIndex = ar_dialog_1.ArDialog.zIndexRef + ar_dialog_1.ArDialog.dialogLayers;
    };
    ArSelect.prototype.moveToBodyTag = function () {
        document.getElementsByTagName('BODY')[0].appendChild(this.selectorContainer);
    };
    ArSelect.prototype.removeFromBodyTag = function () {
        if (this.selectorContainer)
            document.getElementsByTagName('BODY')[0].removeChild(this.selectorContainer);
    };
    ArSelect.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'ar-select';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    ArSelect.prototype.optionsChanged = function () {
        this.checkAppropriateOptions();
    };
    ArSelect.prototype.valueChanged = function () {
        if (this.multiple) {
            if (typeof this.value === 'string')
                this.value = this.value.split(',');
            if (!Array.isArray(this.value)) {
                this.value = [];
            }
        }
        this.checkAppropriateOptions();
    };
    ArSelect.prototype.checkAppropriateOptions = function () {
        if (!this.options || !Array.isArray(this.options) || this.options.length === 0)
            return;
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var option = _a[_i];
            if (this.multiple) {
                option.checked = false;
                for (var _b = 0, _c = this.value; _b < _c.length; _b++) {
                    var value = _c[_b];
                    if (this.compareValues(option.value, value)) {
                        option.checked = true;
                        break;
                    }
                }
            }
            else {
                option.checked = this.compareValues(option.value, this.value);
            }
        }
    };
    ArSelect.prototype.focus = function () {
        var _this = this;
        if (this.disabled) {
            this.focused = false;
            return;
        }
        this.focused = true;
        this.detectExtraValues();
        this.dialog.open();
        if (this.multiple) {
            this.originalValue = this.value.map(function (i) { return i; });
        }
        else {
            this.originalValue = this.value;
        }
        setTimeout(function () {
            if (_this.extraValues && _this.extraValues.length)
                _this.scrollToTop();
            else
                _this.autoScrollToFirstSelectedOption();
        }, 100);
    };
    ArSelect.prototype.detectExtraValues = function () {
        var extraValues = [];
        var valuesForDetection = (Array.isArray(this.value)) ? this.value : [this.value];
        for (var _i = 0, valuesForDetection_1 = valuesForDetection; _i < valuesForDetection_1.length; _i++) {
            var v = valuesForDetection_1[_i];
            var found = false;
            for (var _a = 0, _b = this.options || []; _a < _b.length; _a++) {
                var option = _b[_a];
                if (this.compareValues(option.value, v)) {
                    found = true;
                    break;
                }
            }
            if (found)
                continue;
            extraValues.push(v);
        }
        this.extraValues = extraValues;
        if (!this.allowAny) {
            this.extraValues = [];
        }
    };
    ArSelect.prototype.closeSelector = function () {
        this.focused = false;
        this.dialog.close();
        this.filter = '';
    };
    ArSelect.prototype.toggleOption = function (option, event) {
        var _this = this;
        event.stopPropagation();
        var value = option.value;
        if (this.multiple) {
            var index = this.value.indexOf(value);
            if (index === -1) {
                this.value.push(value);
            }
            else {
                this.value.splice(index, 1);
            }
        }
        else {
            this.extraValues = [];
            if (this.value === value)
                this.value = null;
            else
                this.value = value;
            setTimeout(function () {
                _this.closeSelector();
            }, 1);
        }
        this.valueChanged();
        var customEvent = aurelia_pal_1.DOM.createCustomEvent('change', { bubbles: true, detail: this.value });
        this.element.dispatchEvent(customEvent);
    };
    ArSelect.prototype.scrollToTop = function () {
        if (!this.focused)
            return;
        var container = this.dialogElement.querySelector('ux-card-content');
        if (container instanceof HTMLElement) {
            dom_1.DomHelpers.scrollToX(container, container.scrollTop, 0, 0, 1 / 250, 20, dom_1.DomHelpers.easeOutCuaic);
        }
    };
    ArSelect.prototype.autoScrollToNewExtraValue = function () {
        if (!this.focused)
            return;
        if (!this.extraValues || this.extraValues.length === 0)
            return;
        var index = this.extraValues.length - 1;
        var element = this.dialogElement.querySelectorAll('ux-list-item.extra-value')[index];
        var container = this.dialogElement.querySelector('ux-card-content');
        if (element instanceof HTMLElement && container instanceof HTMLElement) {
            dom_1.DomHelpers.scrollToX(container, container.scrollTop, element.offsetTop - 150, 0, 1 / 500, 20, dom_1.DomHelpers.easeOutCuaic);
        }
    };
    ArSelect.prototype.autoScrollToFirstSelectedOption = function () {
        if (!this.focused)
            return;
        var index = 0;
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var option = _a[_i];
            if (option.checked) {
                var element = this.dialogElement.querySelectorAll('ux-list-item.option')[index];
                var container = this.dialogElement.querySelector('ux-card-content');
                if (element instanceof HTMLElement && container instanceof HTMLElement) {
                    dom_1.DomHelpers.scrollToX(container, container.scrollTop, element.offsetTop - 150, 0, 1 / 250, 20, dom_1.DomHelpers.easeOutCuaic);
                }
                return;
            }
            index++;
        }
    };
    ArSelect.prototype.cancel = function () {
        this.value = this.originalValue;
        this.closeSelector();
    };
    ArSelect.prototype.save = function () {
        this.closeSelector();
    };
    Object.defineProperty(ArSelect.prototype, "selectedOption", {
        get: function () {
            if (!this.options || !Array.isArray(this.options) || this.options.length === 0)
                return null;
            for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
                var option = _a[_i];
                if (this.compareValues(option.value, this.value)) {
                    return option;
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArSelect.prototype, "selectedOptions", {
        get: function () {
            var options = [];
            if (!this.options || !Array.isArray(this.options) || this.options.length === 0)
                return options;
            if (!this.value || !Array.isArray(this.value))
                return options;
            for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
                var option = _a[_i];
                for (var _b = 0, _c = this.value; _b < _c.length; _b++) {
                    var value = _c[_b];
                    if (this.compareValues(option.value, value)) {
                        options.push(option);
                        break;
                    }
                }
            }
            return options;
        },
        enumerable: true,
        configurable: true
    });
    ArSelect.prototype.addExtraValue = function () {
        var _this = this;
        var vm = ar_dialog_1.arDialog({ type: 'prompt', 'title': this.addExtraValueButtonText });
        vm.whenClosed().then(function (result) {
            if (!result.dismissed && result.value) {
                if (_this.extraValues.indexOf(result.value) === -1)
                    _this.extraValues.push(result.value);
                if (_this.multiple) {
                    if (_this.value.indexOf(result.value) === -1)
                        _this.value.push(result.value);
                }
                else {
                    _this.value = result.value;
                }
                _this.valueChanged();
                setTimeout(function () {
                    _this.autoScrollToNewExtraValue();
                }, 100);
                var customEvent = aurelia_pal_1.DOM.createCustomEvent('change', { bubbles: true, detail: _this.value });
                _this.element.dispatchEvent(customEvent);
            }
        });
    };
    ArSelect.prototype.removeExtraValue = function (extraValue) {
        var index2 = this.extraValues.indexOf(extraValue);
        if (index2 !== -1)
            this.extraValues.splice(index2, 1);
        if (this.multiple) {
            var index1 = this.value.indexOf(extraValue);
            if (index1 !== -1)
                this.value.splice(index1, 1);
        }
        else {
            this.value = null;
        }
        this.valueChanged();
        var customEvent = aurelia_pal_1.DOM.createCustomEvent('change', { bubbles: true, detail: this.value });
        this.element.dispatchEvent(customEvent);
    };
    ArSelect.prototype.stopPropagation = function (event) {
        event.stopPropagation();
    };
    __decorate([
        aurelia_templating_1.bindable
    ], ArSelect.prototype, "theme", void 0);
    __decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay })
    ], ArSelect.prototype, "value", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArSelect.prototype, "multiple", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArSelect.prototype, "allowAny", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArSelect.prototype, "displaySearch", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArSelect.prototype, "searchTrigger", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArSelect.prototype, "placeholder", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArSelect.prototype, "addExtraValueButtonText", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArSelect.prototype, "wrap", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArSelect.prototype, "disabled", void 0);
    __decorate([
        aurelia_templating_1.children('ar-option')
    ], ArSelect.prototype, "options", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], ArSelect.prototype, "compareValues", void 0);
    __decorate([
        aurelia_framework_1.computedFrom('options', 'options.length', 'value')
    ], ArSelect.prototype, "selectedOption", null);
    __decorate([
        aurelia_framework_1.computedFrom('options', 'options.length', 'value', 'value.length')
    ], ArSelect.prototype, "selectedOptions", null);
    ArSelect = __decorate([
        aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine, aurelia_event_aggregator_1.EventAggregator),
        aurelia_templating_1.customElement('ar-select')
    ], ArSelect);
    return ArSelect;
}());
exports.ArSelect = ArSelect;
var FilterOptionsValueConverter = /** @class */ (function () {
    function FilterOptionsValueConverter() {
    }
    FilterOptionsValueConverter.prototype.toView = function (list, filter) {
        if (filter === void 0) { filter = ''; }
        if (!filter)
            return list;
        var newList = [];
        filter = removeAccents(filter.toLowerCase());
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            var labelString = typeof item.label === 'string' ? removeAccents(item.label.toLowerCase()) : '';
            var valueString = typeof item.label === 'string' ? removeAccents(item.value.toLowerCase()) : '';
            if (labelString.indexOf(filter) !== -1 || valueString.indexOf(filter) !== -1) {
                newList.push(item);
            }
        }
        return newList;
    };
    return FilterOptionsValueConverter;
}());
exports.FilterOptionsValueConverter = FilterOptionsValueConverter;
