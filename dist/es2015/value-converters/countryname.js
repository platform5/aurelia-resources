var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
import countries from '../helpers/countries';
import locales from '../helpers/locales';
import { valueConverter } from 'aurelia-binding';
var CountrynameValueConverter = /** @class */ (function () {
    function CountrynameValueConverter() {
    }
    CountrynameValueConverter.prototype.toView = function (countryCode, prefix) {
        if (prefix === void 0) { prefix = ''; }
        if (locales.countries[countryCode]) {
            return "" + prefix + locales.countries[countryCode];
        }
        for (var _i = 0, countries_1 = countries; _i < countries_1.length; _i++) {
            var country = countries_1[_i];
            if (country.countryCode === countryCode)
                return "" + prefix + country.name;
            if (country.countryCode2 === countryCode)
                return "" + prefix + country.name;
        }
        return '';
    };
    CountrynameValueConverter = __decorate([
        valueConverter('countryname')
    ], CountrynameValueConverter);
    return CountrynameValueConverter;
}());
export { CountrynameValueConverter };
var CountryNameValueConverter = /** @class */ (function (_super) {
    __extends(CountryNameValueConverter, _super);
    function CountryNameValueConverter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CountryNameValueConverter = __decorate([
        valueConverter('countryName')
    ], CountryNameValueConverter);
    return CountryNameValueConverter;
}(CountrynameValueConverter));
export { CountryNameValueConverter };
