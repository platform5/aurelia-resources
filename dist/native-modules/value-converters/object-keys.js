var ObjectKeysValueConverter = /** @class */ (function () {
    function ObjectKeysValueConverter() {
    }
    ObjectKeysValueConverter.prototype.toView = function (value) {
        return Object.keys(value);
    };
    return ObjectKeysValueConverter;
}());
export { ObjectKeysValueConverter };
