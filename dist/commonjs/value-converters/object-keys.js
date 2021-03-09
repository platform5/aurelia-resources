"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectKeysValueConverter = /** @class */ (function () {
    function ObjectKeysValueConverter() {
    }
    ObjectKeysValueConverter.prototype.toView = function (value) {
        return Object.keys(value);
    };
    return ObjectKeysValueConverter;
}());
exports.ObjectKeysValueConverter = ObjectKeysValueConverter;
