"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PhoneValueConverter = /** @class */ (function () {
    function PhoneValueConverter() {
    }
    PhoneValueConverter.prototype.toView = function (phone) {
        if (typeof phone !== 'string')
            return phone;
        if (phone[0] !== '+')
            return phone;
        if (phone.substr(0, 3) === '+41' && phone.length === 12) {
            return phone.replace(/^\+([0-9]{2})([0-9]{2})([0-9]{3})([0-9]{2})([0-9]{2})$/, "+$1 $2 $3 $4 $5");
        }
        return phone;
    };
    return PhoneValueConverter;
}());
exports.PhoneValueConverter = PhoneValueConverter;
