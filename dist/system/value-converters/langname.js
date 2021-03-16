System.register(["../helpers/languages", "../helpers/locales", "aurelia-binding"], function (exports_1, context_1) {
    "use strict";
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
    var languages_1, locales_1, aurelia_binding_1, LangnameValueConverter, LangNameValueConverter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (languages_1_1) {
                languages_1 = languages_1_1;
            },
            function (locales_1_1) {
                locales_1 = locales_1_1;
            },
            function (aurelia_binding_1_1) {
                aurelia_binding_1 = aurelia_binding_1_1;
            }
        ],
        execute: function () {
            LangnameValueConverter = /** @class */ (function () {
                function LangnameValueConverter() {
                }
                LangnameValueConverter.prototype.toView = function (languageCode, prefix) {
                    if (prefix === void 0) { prefix = ''; }
                    if (locales_1.default.languages[languageCode]) {
                        return "" + prefix + locales_1.default.languages[languageCode];
                    }
                    for (var _i = 0, languages_2 = languages_1.default; _i < languages_2.length; _i++) {
                        var lang = languages_2[_i];
                        if (lang.languageCode === languageCode)
                            return "" + prefix + lang.name;
                    }
                    return '';
                };
                LangnameValueConverter = __decorate([
                    aurelia_binding_1.valueConverter('langname')
                ], LangnameValueConverter);
                return LangnameValueConverter;
            }());
            exports_1("LangnameValueConverter", LangnameValueConverter);
            LangNameValueConverter = /** @class */ (function (_super) {
                __extends(LangNameValueConverter, _super);
                function LangNameValueConverter() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                LangNameValueConverter = __decorate([
                    aurelia_binding_1.valueConverter('langName')
                ], LangNameValueConverter);
                return LangNameValueConverter;
            }(LangnameValueConverter));
            exports_1("LangNameValueConverter", LangNameValueConverter);
        }
    };
});
