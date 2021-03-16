var Nl2brValueConverter = /** @class */ (function () {
    function Nl2brValueConverter() {
    }
    Nl2brValueConverter.prototype.toView = function (value, breakTag) {
        if (breakTag === void 0) { breakTag = '<br>'; }
        if (!value || typeof value !== 'string')
            return value;
        ;
        return (value).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    };
    return Nl2brValueConverter;
}());
export { Nl2brValueConverter };
