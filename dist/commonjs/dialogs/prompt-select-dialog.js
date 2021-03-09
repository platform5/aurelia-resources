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
Object.defineProperty(exports, "__esModule", { value: true });
var modal_1 = require("@aurelia-ux/modal");
var aurelia_framework_1 = require("aurelia-framework");
var notify_1 = require("../helpers/notify");
var removeAccents = require("remove-accents");
var PromptSelectDialog = /** @class */ (function () {
    function PromptSelectDialog(modalService) {
        this.modalService = modalService;
        this.mode = 'single';
        this.options = [];
        this.labelKey = '';
        this.valueKey = '';
        this.title = 'Select an option';
        this.required = false;
        this.autoClose = false;
        this.icon = '';
        this.showSearch = 'auto';
    }
    PromptSelectDialog.prototype.activate = function (params) {
        var _this = this;
        if (!params) {
            throw new Error('You must provide params when opening prompt-select-dialog');
        }
        if (!params.options || !Array.isArray(params.options)) {
            throw new Error('You must provide an array of options in params when opening prompt-select-dialog');
        }
        if (params.mode) {
            this.mode = params.mode === 'multiple' ? 'multiple' : 'single';
        }
        if (params.showSearch) {
            this.showSearch = params.showSearch;
        }
        else {
            this.showSearch = 'auto';
        }
        this.icon = params.icon;
        this.required = params.required === true ? true : false;
        this.autoClose = params.autoClose === true ? true : false;
        this.title = params.title ? params.title : 'Select an option';
        this.options = Array.isArray(params.options) ? params.options : [];
        this.labelKey = params.labelKey || undefined;
        this.valueKey = params.valueKey || undefined;
        var options = this.options.map(function (o) { return _this.getValue(o); });
        if (this.mode === 'multiple') {
            if (Array.isArray(params.value)) {
                var value = [];
                for (var _i = 0, _a = params.value; _i < _a.length; _i++) {
                    var val = _a[_i];
                    var computedVal = this.getValue(val);
                    if (options.includes(val)) {
                        value.push(val);
                    }
                    else if (options.includes(computedVal)) {
                        value.push(computedVal);
                    }
                }
                this.value = value;
            }
        }
        else {
            if (options.includes(params.value)) {
                this.value = params.value;
            }
            else if (options.includes(this.getValue(params.value))) {
                this.value = this.getValue(params.value);
            }
            else {
                this.value = undefined;
            }
        }
        if (this.mode === 'multiple' && !Array.isArray(this.value)) {
            this.value = [];
        }
    };
    PromptSelectDialog.prototype.canDeactivate = function (result) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (result.wasCancelled) {
                    return [2 /*return*/, true];
                }
                if (this.required && !result.output) {
                    notify_1.errorify(new Error('You must select an option'));
                    return [2 /*return*/, false];
                }
                return [2 /*return*/, true];
            });
        });
    };
    PromptSelectDialog.prototype.getLabel = function (option) {
        if (typeof option === 'object' && this.labelKey) {
            return option[this.labelKey];
        }
        return option;
    };
    PromptSelectDialog.prototype.getValue = function (option) {
        if (typeof option === 'object' && this.valueKey) {
            return option[this.valueKey];
        }
        return option;
    };
    PromptSelectDialog.prototype.toggleOption = function (option, event) {
        event.stopPropagation();
        var value = this.getValue(option);
        if (this.mode === 'multiple') {
            var index = this.value.indexOf(value);
            if (index === -1) {
                this.value.push(value);
            }
            else {
                this.value.splice(index, 1);
            }
        }
        else {
            if (this.value === value)
                this.value = typeof value === 'string' ? '' : undefined;
            else
                this.value = value;
        }
        if (this.mode === 'single' && (this.value || !this.required) && this.autoClose) {
            this.modalService.ok(this.value);
        }
    };
    PromptSelectDialog.prototype.isSelected = function (option, value) {
        var optionValue = this.getValue(option);
        if (this.mode === 'multiple') {
            if (!Array.isArray(value)) {
                return false;
            }
            return value.includes(optionValue);
        }
        else {
            return value === optionValue;
        }
    };
    Object.defineProperty(PromptSelectDialog.prototype, "shouldShowSearch", {
        get: function () {
            return this.showSearch === 'auto'
                ? this.options.length > 10
                : this.showSearch;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        aurelia_framework_1.computedFrom('showSearch', 'options.length')
    ], PromptSelectDialog.prototype, "shouldShowSearch", null);
    PromptSelectDialog = __decorate([
        aurelia_framework_1.inject(modal_1.UxModalService)
    ], PromptSelectDialog);
    return PromptSelectDialog;
}());
exports.PromptSelectDialog = PromptSelectDialog;
var PromptSelectDialogFilterOptionsValueConverter = /** @class */ (function () {
    function PromptSelectDialogFilterOptionsValueConverter() {
    }
    PromptSelectDialogFilterOptionsValueConverter.prototype.toView = function (list, filter, labelKey, valueKey) {
        if (filter === void 0) { filter = ''; }
        if (!filter)
            return list;
        var newList = [];
        filter = removeAccents(filter.toLowerCase());
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            var label = typeof item === 'object' && labelKey ? item[labelKey] : item;
            var value = typeof item === 'object' && valueKey ? item[valueKey] : item;
            var l = typeof label === 'string' ? removeAccents(label.toLowerCase()) : '';
            var v = typeof value === 'string' ? removeAccents(value.toLowerCase()) : '';
            if (l.indexOf(filter) !== -1 || v.indexOf(filter) !== -1) {
                newList.push(item);
            }
        }
        return newList;
    };
    return PromptSelectDialogFilterOptionsValueConverter;
}());
exports.PromptSelectDialogFilterOptionsValueConverter = PromptSelectDialogFilterOptionsValueConverter;
