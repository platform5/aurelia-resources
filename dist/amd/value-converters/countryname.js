var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "../helpers/countries", "../helpers/locales", "aurelia-binding"], function (require, exports, countries_1, locales_1, aurelia_binding_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CountryNameValueConverter = exports.CountrynameValueConverter = void 0;
    var CountrynameValueConverter = /** @class */ (function () {
        function CountrynameValueConverter() {
        }
        CountrynameValueConverter.prototype.toView = function (countryCode, prefix) {
            if (prefix === void 0) { prefix = ''; }
            if (locales_1.default.countries[countryCode]) {
                return "" + prefix + locales_1.default.countries[countryCode];
            }
            for (var _i = 0, countries_2 = countries_1.default; _i < countries_2.length; _i++) {
                var country = countries_2[_i];
                if (country.countryCode === countryCode)
                    return "" + prefix + country.name;
                if (country.countryCode2 === countryCode)
                    return "" + prefix + country.name;
            }
            return '';
        };
        CountrynameValueConverter = __decorate([
            aurelia_binding_1.valueConverter('countryname')
        ], CountrynameValueConverter);
        return CountrynameValueConverter;
    }());
    exports.CountrynameValueConverter = CountrynameValueConverter;
    var CountryNameValueConverter = /** @class */ (function (_super) {
        __extends(CountryNameValueConverter, _super);
        function CountryNameValueConverter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CountryNameValueConverter = __decorate([
            aurelia_binding_1.valueConverter('countryName')
        ], CountryNameValueConverter);
        return CountryNameValueConverter;
    }(CountrynameValueConverter));
    exports.CountryNameValueConverter = CountryNameValueConverter;
});
