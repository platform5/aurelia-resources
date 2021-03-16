define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FirstLetterUpperValueConverter = void 0;
    var FirstLetterUpperValueConverter = /** @class */ (function () {
        function FirstLetterUpperValueConverter() {
        }
        FirstLetterUpperValueConverter.prototype.toView = function (value) {
            if (typeof value !== 'string') {
                return value;
            }
            if (value.length < 1) {
                return value;
            }
            return value.substr(0, 1).toUpperCase() + value.substr(1);
        };
        return FirstLetterUpperValueConverter;
    }());
    exports.FirstLetterUpperValueConverter = FirstLetterUpperValueConverter;
});
