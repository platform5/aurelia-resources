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
define(["require", "exports", "aurelia-templating", "aurelia-pal", "aurelia-binding", "aurelia-dependency-injection", "@aurelia-ux/modal", "../dialogs/prompt-select-dialog"], function (require, exports, aurelia_templating_1, aurelia_pal_1, aurelia_binding_1, aurelia_dependency_injection_1, modal_1, prompt_select_dialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FilterControl = void 0;
    var FilterControl = /** @class */ (function () {
        function FilterControl(element, modalService) {
            this.element = element;
            this.modalService = modalService;
            this.disabled = false;
            this.readonly = false;
            this.multiple = false;
            this.options = [];
            this.labelKey = '';
            this.secondaryKey = '';
            this.valueKey = '';
            this.icon = '';
            this.showSearch = 'auto';
            this.focused = false;
            this.ready = true; // this property can be toggle by children classes in order to load data from DB (for displayed values) and tell the component when data is ready
            defineFilterControlElementApis(element);
        }
        FilterControl.prototype.bind = function () {
            this.serializedCurrentValue = this.value ? this.value.toString() : '';
        };
        FilterControl.prototype.blur = function () {
        };
        FilterControl.prototype.getValue = function () {
            return this.value;
        };
        FilterControl.prototype.setValue = function (value) {
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
        FilterControl.prototype.validateValueAgainsAvailableOptions = function (originalValue) {
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
        FilterControl.prototype.computeValueLabel = function (value) {
            var _this = this;
            var option = this.options.find(function (o) {
                var optionValue = _this.computeValue(o);
                return optionValue === value;
            });
            if (!option) {
                return '';
            }
            return this.computeLabel(option);
        };
        FilterControl.prototype.computeLabel = function (option) {
            if (typeof option === 'object' && this.labelKey) {
                return option[this.labelKey] || '';
            }
            return option || '';
        };
        FilterControl.prototype.computeSecondary = function (option) {
            if (typeof option === 'object' && this.secondaryKey) {
                return option[this.secondaryKey] || '';
            }
            return option || '';
        };
        FilterControl.prototype.computeValue = function (option) {
            if (typeof option === 'object' && this.valueKey) {
                return option[this.valueKey];
            }
            return option;
        };
        FilterControl.prototype.focusedChanged = function (focused) {
            this.element.classList.toggle('filter-control--focused', focused);
            this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent(focused ? 'focus' : 'blur', { bubbles: false }));
        };
        FilterControl.prototype.valueChanged = function () {
            try {
                if (this.value.toString() === this.serializedCurrentValue) {
                    return;
                }
            }
            catch (error) {
                // do nothing
            }
            this.serializedCurrentValue = this.value ? this.value.toString() : '';
            this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('change', { bubbles: true }));
            this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('input', { bubbles: true }));
        };
        FilterControl.prototype.focus = function () {
            return __awaiter(this, void 0, void 0, function () {
                var modal, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.modalService.open({
                                viewModel: prompt_select_dialog_1.PromptSelectDialog,
                                model: {
                                    options: this.options,
                                    labelKey: this.labelKey,
                                    secondaryKey: this.secondaryKey,
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
                            return [2 /*return*/];
                    }
                });
            });
        };
        Object.defineProperty(FilterControl.prototype, "hasValue", {
            get: function () {
                if (this.multiple && Array.isArray(this.value) && this.value.length) {
                    return true;
                }
                else if (!this.multiple && this.value) {
                    return true;
                }
                return false;
            },
            enumerable: false,
            configurable: true
        });
        __decorate([
            aurelia_templating_1.bindable
        ], FilterControl.prototype, "disabled", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], FilterControl.prototype, "readonly", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], FilterControl.prototype, "label", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], FilterControl.prototype, "multiple", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], FilterControl.prototype, "options", void 0);
        __decorate([
            aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
        ], FilterControl.prototype, "value", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], FilterControl.prototype, "labelKey", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], FilterControl.prototype, "secondaryKey", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], FilterControl.prototype, "valueKey", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], FilterControl.prototype, "icon", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], FilterControl.prototype, "showSearch", void 0);
        __decorate([
            aurelia_binding_1.observable
        ], FilterControl.prototype, "focused", void 0);
        __decorate([
            aurelia_binding_1.computedFrom('value', 'value.length', 'multiple', 'options.length', 'labelKey', 'valueKey')
        ], FilterControl.prototype, "hasValue", null);
        FilterControl = __decorate([
            aurelia_dependency_injection_1.inject(Element, modal_1.UxModalService),
            aurelia_templating_1.customElement('filter-control'),
            aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./filter-control.html'))
        ], FilterControl);
        return FilterControl;
    }());
    exports.FilterControl = FilterControl;
    var getVm = function (_) { return _.au.controller.viewModel; };
    var defineFilterControlElementApis = function (element) {
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
});
