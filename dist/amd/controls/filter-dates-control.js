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
define(["require", "exports", "aurelia-templating", "aurelia-pal", "aurelia-binding", "aurelia-dependency-injection", "@aurelia-ux/modal", "moment"], function (require, exports, aurelia_templating_1, aurelia_pal_1, aurelia_binding_1, aurelia_dependency_injection_1, modal_1, moment) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FilterDatesControl = void 0;
    var FilterDatesControl = /** @class */ (function () {
        function FilterDatesControl(element, modalService) {
            this.element = element;
            this.modalService = modalService;
            this.disabled = false;
            this.readonly = false;
            this.format = 'DD-MM-YYYY';
            this.autoSetSiblingIfEmpty = true;
            // defineFilterDatesControlElementApis(element);
        }
        // public getValue() {
        //   return this.value;
        // }
        // public setValue(value: any) {
        //   if (value === undefined || value === null || !moment(value).isValid()) {
        //     this.value = undefined;
        //   } else {
        //     this.value = value;
        //   }
        // }
        FilterDatesControl.prototype.isValid = function (value) {
            return value === undefined || (value && moment(value).isValid());
        };
        FilterDatesControl.prototype.valueChanged = function () {
            if (this.from && !this.isValid(this.from)) {
                this.from = undefined;
                return; // will come back due to valueChanged
            }
            if (this.to && !this.isValid(this.to)) {
                this.to = undefined;
                return; // will come back due to valueChanged
            }
            if (this.from && !this.to && this.autoSetSiblingIfEmpty) {
                this.to = moment(this.from).toDate(); // clone
                return; // will come back due to valueChanged
            }
            if (this.to && !this.from && this.autoSetSiblingIfEmpty) {
                this.from = moment(this.to).toDate(); // clone
                return; // will come back due to valueChanged
            }
            this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('change', { bubbles: true }));
            this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('input', { bubbles: true }));
        };
        FilterDatesControl.prototype.selectFrom = function () {
            return __awaiter(this, void 0, void 0, function () {
                var vm;
                return __generator(this, function (_a) {
                    try {
                        vm = this.datepickerControlFrom.au.controller.viewModel;
                        vm.toggleDialog('month');
                    }
                    catch (error) {
                        // do nothing
                    }
                    return [2 /*return*/];
                });
            });
        };
        FilterDatesControl.prototype.selectTo = function () {
            return __awaiter(this, void 0, void 0, function () {
                var vm;
                return __generator(this, function (_a) {
                    console.log('selectTo', this.datepickerControlTo);
                    try {
                        vm = this.datepickerControlTo.au.controller.viewModel;
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
        ], FilterDatesControl.prototype, "disabled", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], FilterDatesControl.prototype, "readonly", void 0);
        __decorate([
            aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay, changeHandler: 'valueChanged' })
        ], FilterDatesControl.prototype, "from", void 0);
        __decorate([
            aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay, changeHandler: 'valueChanged' })
        ], FilterDatesControl.prototype, "to", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], FilterDatesControl.prototype, "format", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], FilterDatesControl.prototype, "autoSetSiblingIfEmpty", void 0);
        FilterDatesControl = __decorate([
            aurelia_dependency_injection_1.inject(Element, modal_1.UxModalService),
            aurelia_templating_1.customElement('filter-dates-control'),
            aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./filter-dates-control.html'))
        ], FilterDatesControl);
        return FilterDatesControl;
    }());
    exports.FilterDatesControl = FilterDatesControl;
});
// const getVm = <T>(_: any) => _.au.controller.viewModel as T;
// const defineFilterDatesControlElementApis = (element: HTMLElement) => {
//   Object.defineProperties(element, {
//     value: {
//       get() {
//         return getVm<FilterDatesControl>(this).getValue();
//       },
//       set(value: any) {
//         getVm<FilterDatesControl>(this).setValue(value);
//       },
//       configurable: true
//     }
//   });
// };
