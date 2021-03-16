System.register(["aurelia-templating", "aurelia-pal", "aurelia-binding", "aurelia-dependency-injection", "@aurelia-ux/modal", "moment"], function (exports_1, context_1) {
    "use strict";
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
    var aurelia_templating_1, aurelia_pal_1, aurelia_binding_1, aurelia_dependency_injection_1, modal_1, moment, FilterDateControl, getVm, defineFilterDateControlElementApis;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            },
            function (aurelia_binding_1_1) {
                aurelia_binding_1 = aurelia_binding_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (modal_1_1) {
                modal_1 = modal_1_1;
            },
            function (moment_1) {
                moment = moment_1;
            }
        ],
        execute: function () {
            FilterDateControl = /** @class */ (function () {
                function FilterDateControl(element, modalService) {
                    this.element = element;
                    this.modalService = modalService;
                    this.disabled = false;
                    this.readonly = false;
                    this.format = 'DD-MM-YYYY';
                    defineFilterDateControlElementApis(element);
                }
                FilterDateControl.prototype.getValue = function () {
                    return this.value;
                };
                FilterDateControl.prototype.setValue = function (value) {
                    if (value === undefined || value === null || !moment(value).isValid()) {
                        this.value = undefined;
                    }
                    else {
                        this.value = value;
                    }
                };
                FilterDateControl.prototype.valueChanged = function () {
                    if ((this.value && moment(this.value).isValid()) || this.value === undefined) {
                        this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('change', { bubbles: true }));
                        this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('input', { bubbles: true }));
                    }
                };
                Object.defineProperty(FilterDateControl.prototype, "hasValue", {
                    get: function () {
                        return this.value && moment(this.value).isValid();
                    },
                    enumerable: false,
                    configurable: true
                });
                FilterDateControl.prototype.focus = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var vm;
                        return __generator(this, function (_a) {
                            console.log('focus', this.datepickerControl);
                            try {
                                vm = this.datepickerControl.au.controller.viewModel;
                                vm.toggleDialog('month');
                            }
                            catch (error) {
                                // do nothing
                            }
                            return [2 /*return*/];
                        });
                    });
                };
                __decorate([
                    aurelia_templating_1.bindable
                ], FilterDateControl.prototype, "disabled", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], FilterDateControl.prototype, "readonly", void 0);
                __decorate([
                    aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
                ], FilterDateControl.prototype, "value", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], FilterDateControl.prototype, "format", void 0);
                __decorate([
                    aurelia_binding_1.computedFrom('value')
                ], FilterDateControl.prototype, "hasValue", null);
                FilterDateControl = __decorate([
                    aurelia_dependency_injection_1.inject(Element, modal_1.UxModalService),
                    aurelia_templating_1.customElement('filter-date-control'),
                    aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./filter-date-control.html'))
                ], FilterDateControl);
                return FilterDateControl;
            }());
            exports_1("FilterDateControl", FilterDateControl);
            getVm = function (_) { return _.au.controller.viewModel; };
            defineFilterDateControlElementApis = function (element) {
                Object.defineProperties(element, {
                    value: {
                        get: function () {
                            return getVm(this).getValue();
                        },
                        set: function (value) {
                            getVm(this).setValue(value);
                        },
                        configurable: true
                    }
                });
            };
        }
    };
});
