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
import languages from '../helpers/languages';
import locales from '../helpers/locales';
import { valueConverter } from 'aurelia-binding';
var LangnameValueConverter = /** @class */ (function () {
    function LangnameValueConverter() {
    }
    LangnameValueConverter.prototype.toView = function (languageCode, prefix) {
        if (prefix === void 0) { prefix = ''; }
        if (locales.languages[languageCode]) {
            return "" + prefix + locales.languages[languageCode];
        }
        for (var _i = 0, languages_1 = languages; _i < languages_1.length; _i++) {
            var lang = languages_1[_i];
            if (lang.languageCode === languageCode)
                return "" + prefix + lang.name;
        }
        return '';
    };
    LangnameValueConverter = __decorate([
        valueConverter('langname')
    ], LangnameValueConverter);
    return LangnameValueConverter;
}());
export { LangnameValueConverter };
var LangNameValueConverter = /** @class */ (function (_super) {
    __extends(LangNameValueConverter, _super);
    function LangNameValueConverter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LangNameValueConverter = __decorate([
        valueConverter('langName')
    ], LangNameValueConverter);
    return LangNameValueConverter;
}(LangnameValueConverter));
export { LangNameValueConverter };
