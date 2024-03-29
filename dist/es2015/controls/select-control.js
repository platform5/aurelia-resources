var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { customElement, bindable, useView } from 'aurelia-templating';
import { DOM, PLATFORM } from 'aurelia-pal';
import { observable, computedFrom, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, normalizeBooleanAttribute, getBackgroundColorThroughParents } from '@aurelia-ux/core';
import { SelectControlDefaultConfiguration } from './select-control-default-configuration';
import { UxModalService } from '@aurelia-ux/modal';
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component.css';
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component--outline.css';
import { PromptSelectDialog } from '../dialogs/prompt-select-dialog';
var SelectControl = /** @class */ (function () {
    function SelectControl(element, styleEngine, modalService, defaultConfiguration) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.modalService = modalService;
        this.disabled = false;
        this.readonly = false;
        this.type = 'modal';
        this.variant = 'filled';
        this.dense = false;
        this.multiple = false;
        this.options = [];
        this.labelKey = '';
        this.valueKey = '';
        this.icon = '';
        this.showSearch = 'auto';
        this.focused = false;
        defineSelectControlElementApis(element);
        if (defaultConfiguration.theme !== undefined) {
            this.theme = defaultConfiguration.theme;
        }
        if (defaultConfiguration.dense !== undefined) {
            this.dense = defaultConfiguration.dense;
        }
        if (defaultConfiguration.variant !== undefined) {
            this.variant = defaultConfiguration.variant;
        }
    }
    SelectControl.prototype.bind = function () {
        this.denseChanged();
        this.multipleChanged();
        this.themeChanged(this.theme);
        this.serializedCurrentValue = this.value ? this.value.toString() : '';
    };
    SelectControl.prototype.denseChanged = function () {
        this.dense = normalizeBooleanAttribute('dense', this.dense);
    };
    SelectControl.prototype.multipleChanged = function () {
        this.multiple = normalizeBooleanAttribute('multiple', this.multiple);
    };
    SelectControl.prototype.attached = function () {
        this.variantChanged(this.variant);
    };
    SelectControl.prototype.detached = function () {
    };
    SelectControl.prototype.getValue = function () {
        return this.value;
    };
    SelectControl.prototype.setValue = function (value) {
        if (this.multiple) {
            if (typeof value === 'string') {
                value = value.split(',');
            }
            else if (!Array.isArray(value)) {
                value = [value];
            }
        }
        value = this.validateValueAgainsAvailableOptions(value);
        this.value = value;
    };
    SelectControl.prototype.validateValueAgainsAvailableOptions = function (originalValue) {
        var _this = this;
        var validatedValue;
        var options = this.options.map(function (o) { return _this.computeValue(o); });
        if (this.multiple) {
            if (Array.isArray(originalValue)) {
                var value = [];
                for (var _i = 0, originalValue_1 = originalValue; _i < originalValue_1.length; _i++) {
                    var val = originalValue_1[_i];
                    var computedVal = this.computeValue(val);
                    if (options.includes(val)) {
                        value.push(val);
                    }
                    else if (options.includes(computedVal)) {
                        value.push(computedVal);
                    }
                }
                validatedValue = value;
            }
        }
        else {
            var computedVal = this.computeValue(originalValue);
            if (options.includes(originalValue)) {
                validatedValue = originalValue;
            }
            else if (options.includes(computedVal)) {
                validatedValue = computedVal;
            }
            else {
                validatedValue = undefined;
            }
        }
        return validatedValue;
    };
    SelectControl.prototype.computeLabel = function (option) {
        if (option !== null && typeof option === 'object' && this.labelKey) {
            return option[this.labelKey] || '';
        }
        return option || '';
    };
    SelectControl.prototype.computeValue = function (option) {
        if (option !== null && typeof option === 'object' && this.valueKey) {
            return option[this.valueKey];
        }
        return option;
    };
    SelectControl.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'input';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    SelectControl.prototype.focusedChanged = function (focused) {
        this.element.classList.toggle('ux-input-component--focused', focused);
        this.element.dispatchEvent(DOM.createCustomEvent(focused ? 'focus' : 'blur', { bubbles: false }));
    };
    SelectControl.prototype.valueChanged = function () {
        try {
            if (this.value.toString() === this.serializedCurrentValue) {
                return;
            }
        }
        catch (error) {
            // do nothing
        }
        this.serializedCurrentValue = this.value ? this.value.toString() : '';
        this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
        this.element.dispatchEvent(DOM.createCustomEvent('input', { bubbles: true }));
    };
    SelectControl.prototype.focus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.type === 'modal')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.modalService.open({
                                viewModel: PromptSelectDialog,
                                model: {
                                    options: this.options,
                                    labelKey: this.labelKey,
                                    valueKey: this.valueKey,
                                    mode: this.multiple ? 'multiple' : 'single',
                                    value: this.value,
                                    icon: this.icon,
                                    autoClose: true,
                                    showSearch: this.showSearch
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.whenClosed()];
                    case 2:
                        result = _a.sent();
                        if (!result.wasCancelled) {
                            this.setValue(result.output);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SelectControl.prototype.blur = function () {
    };
    SelectControl.prototype.variantChanged = function (newValue) {
        this.element.style.backgroundColor = newValue === 'outline' ?
            this.element.style.backgroundColor = getBackgroundColorThroughParents(this.element) :
            '';
    };
    Object.defineProperty(SelectControl.prototype, "placeholderMode", {
        get: function () {
            return typeof this.label !== 'string' || this.label.length === 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectControl.prototype, "displayedValue", {
        get: function () {
            var _this = this;
            var ifEmpty = this.placeholder || '';
            var result = ifEmpty;
            if (this.multiple && Array.isArray(this.value)) {
                var keyValues_1 = this.options.reduce(function (previousValue, currentValue) {
                    previousValue[_this.computeValue(currentValue)] = _this.computeLabel(currentValue);
                    return previousValue;
                }, {});
                var computedLabels = this.value.map(function (v) { return keyValues_1[v]; });
                result = computedLabels.length > 0 ? computedLabels.join(', ') : ifEmpty;
            }
            else if (!this.multiple) {
                var keyValues = this.options.reduce(function (previousValue, currentValue) {
                    previousValue[_this.computeValue(currentValue)] = _this.computeLabel(currentValue);
                    return previousValue;
                }, {});
                var value = keyValues[this.value];
                result = value || ifEmpty;
            }
            // we consider that the field hasValue if there is an actual value or if the field is displayed with chips
            // and even if no chips are selected, because they are displayed the label must be positionned as if there is a value
            // in the field
            var hasValue = (result && result.length > 0) || (this.type === 'chips' && this.options.length > 0);
            this.element.classList.toggle('ux-input-component--has-value', hasValue);
            return result;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        bindable
    ], SelectControl.prototype, "disabled", void 0);
    __decorate([
        bindable
    ], SelectControl.prototype, "readonly", void 0);
    __decorate([
        bindable
    ], SelectControl.prototype, "theme", void 0);
    __decorate([
        bindable
    ], SelectControl.prototype, "label", void 0);
    __decorate([
        bindable
    ], SelectControl.prototype, "placeholder", void 0);
    __decorate([
        bindable
    ], SelectControl.prototype, "type", void 0);
    __decorate([
        bindable
    ], SelectControl.prototype, "variant", void 0);
    __decorate([
        bindable
    ], SelectControl.prototype, "dense", void 0);
    __decorate([
        bindable
    ], SelectControl.prototype, "multiple", void 0);
    __decorate([
        bindable
    ], SelectControl.prototype, "options", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay })
    ], SelectControl.prototype, "value", void 0);
    __decorate([
        bindable
    ], SelectControl.prototype, "labelKey", void 0);
    __decorate([
        bindable
    ], SelectControl.prototype, "valueKey", void 0);
    __decorate([
        bindable
    ], SelectControl.prototype, "icon", void 0);
    __decorate([
        bindable
    ], SelectControl.prototype, "showSearch", void 0);
    __decorate([
        observable
    ], SelectControl.prototype, "focused", void 0);
    __decorate([
        computedFrom('label')
    ], SelectControl.prototype, "placeholderMode", null);
    __decorate([
        computedFrom('value.length', 'multiple', 'options.length', 'labelKey', 'valueKey')
    ], SelectControl.prototype, "displayedValue", null);
    SelectControl = __decorate([
        inject(Element, StyleEngine, UxModalService, SelectControlDefaultConfiguration),
        customElement('select-control'),
        useView(PLATFORM.moduleName('./select-control.html'))
    ], SelectControl);
    return SelectControl;
}());
export { SelectControl };
var getVm = function (_) { return _.au.controller.viewModel; };
var defineSelectControlElementApis = function (element) {
    Object.defineProperties(element, {
        value: {
            get: function () {
                return getVm(this).getValue();
            },
            set: function (value) {
                getVm(this).setValue(value);
            },
            configurable: true
        },
        focus: {
            value: function () {
                getVm(this).focus();
            },
            configurable: true
        },
        blur: {
            value: function () {
                getVm(this).blur();
            },
            configurable: true
        }
    });
};
