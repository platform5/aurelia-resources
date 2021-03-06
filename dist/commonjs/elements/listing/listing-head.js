"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingHead = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_logging_1 = require("aurelia-logging");
var ListingHead = /** @class */ (function () {
    function ListingHead(element) {
        this.element = element;
        this.log = aurelia_logging_1.getLogger('comp:listing-head');
    }
    ListingHead = __decorate([
        aurelia_framework_1.inject(Element)
    ], ListingHead);
    return ListingHead;
}());
exports.ListingHead = ListingHead;
