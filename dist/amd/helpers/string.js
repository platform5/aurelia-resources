define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StringHelpers = void 0;
    var StringHelpers = /** @class */ (function () {
        function StringHelpers() {
        }
        StringHelpers.random = function (options) {
            var charset = options.charset;
            if (charset === 'letters')
                charset = StringHelpers.letters;
            if (charset === 'numbers')
                charset = StringHelpers.numbers;
            if (charset === 'specials')
                charset = StringHelpers.specials;
            if (charset === 'alphanumeric')
                charset = StringHelpers.letters + StringHelpers.numbers;
            if (charset === 'all')
                charset = StringHelpers.letters + StringHelpers.numbers + StringHelpers.specials;
            if (options.exclude) {
                for (var i = 0; i <= options.exclude.length; i++) {
                    charset = charset.replace(options.exclude[i], '');
                }
            }
            var randomReturned = '';
            var rn;
            for (var i = 1; i <= options.length; i++) {
                randomReturned += charset.substring(rn = Math.floor(Math.random() * charset.length), rn + 1);
            }
            return randomReturned;
        };
        StringHelpers.randomString = function (nbChars) {
            if (nbChars === void 0) { nbChars = 12; }
            return StringHelpers.random({ charset: StringHelpers.letters, length: nbChars });
        };
        StringHelpers.randomNumbers = function (nbChars) {
            if (nbChars === void 0) { nbChars = 6; }
            return StringHelpers.random({ charset: StringHelpers.numbers, length: nbChars });
        };
        StringHelpers.randomToken = function (nbChars) {
            if (nbChars === void 0) { nbChars = 24; }
            return StringHelpers.random({ charset: 'all', length: nbChars });
        };
        StringHelpers.validatePhoneNumber = function (phoneNumber) {
            if (typeof phoneNumber !== 'string')
                return false;
            if (phoneNumber[0] !== '+')
                return false;
            phoneNumber = phoneNumber.substr(1); // remove the original +
            // remove all non-numeric chars
            phoneNumber = phoneNumber.replace(/([^0-9]*)/g, '');
            if (phoneNumber.substr(0, 2) === '41') {
                // swiss phone number
                var part1 = phoneNumber.substr(0, 2);
                var part2 = phoneNumber.substr(2);
                if (part2[0] === '0') {
                    part2 = part2.substr(1); // remove the first 0 if present
                }
                if (part2.length === 9) {
                    return "+" + part1 + part2;
                }
            }
            return false;
        };
        StringHelpers.validateEmail = function (email) {
            return email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null;
        };
        StringHelpers.numbers = '0123456789';
        StringHelpers.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        StringHelpers.specials = '!$%^&*()_+|~-=`{}[]:;<>?,./';
        StringHelpers.default = {
            charset: StringHelpers.letters,
            length: 12
        };
        return StringHelpers;
    }());
    exports.StringHelpers = StringHelpers;
});
