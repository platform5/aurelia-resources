define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NumberHelper = /** @class */ (function () {
        function NumberHelper() {
        }
        NumberHelper.round = function (value, nbDecimal) {
            nbDecimal = nbDecimal !== undefined ? nbDecimal : NumberHelper.nbDecimal;
            if (nbDecimal < 0) {
                throw new Error('nbDecimal must be 0 or positive');
            }
            var zeros = new Array(nbDecimal).fill('0', 0, nbDecimal).join('');
            var factor = parseInt("1" + zeros, 10);
            return Math.round(value * factor) / factor;
        };
        NumberHelper.addZeroDecimals = function (value, nbDecimal) {
            nbDecimal = nbDecimal !== undefined ? nbDecimal : NumberHelper.nbDecimal;
            if (nbDecimal < 0) {
                throw new Error('nbDecimal must be 0 or positive');
            }
            if (value === undefined || value === null)
                return '';
            if (typeof value !== 'number')
                return value;
            var stringValue = value.toString();
            var dotIndex = stringValue.indexOf('.');
            var zeros = new Array(nbDecimal).fill('0', 0, nbDecimal).join('');
            if (dotIndex === -1) {
                return stringValue + "." + zeros;
            }
            var diff = stringValue.length - dotIndex;
            var zerosToAdd = nbDecimal - diff + 1;
            return "" + stringValue + zeros.substr(0, zerosToAdd);
        };
        NumberHelper.addThousandSeparators = function (value, separator) {
            separator = separator !== undefined ? separator : NumberHelper.thousandSeparator;
            var nStr = "" + value;
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + separator + '$2');
            }
            return x1 + x2;
        };
        NumberHelper.numString = function (value, nbDecimals, separator) {
            if (nbDecimals === void 0) { nbDecimals = 2; }
            if (separator === void 0) { separator = ' '; }
            return NumberHelper.addThousandSeparators(NumberHelper.addZeroDecimals(NumberHelper.round(value, nbDecimals), nbDecimals), separator);
        };
        NumberHelper.nbDecimal = 2;
        NumberHelper.thousandSeparator = ' ';
        return NumberHelper;
    }());
    exports.NumberHelper = NumberHelper;
});
