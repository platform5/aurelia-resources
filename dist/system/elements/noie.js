System.register(["aurelia-framework", "aurelia-logging"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, aurelia_logging_1, Noie;
    var __moduleName = context_1 && context_1.id;
    /**
     * detect IE
     * returns version of IE or false, if browser is not Internet Explorer
     */
    function detectIE() {
        var ua = window.navigator.userAgent;
        // Test values; Uncomment to check result …
        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        // Edge 12 (Spartan)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
        // Edge 13
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }
        // other browser
        return false;
    }
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            }
        ],
        execute: function () {
            Noie = /** @class */ (function () {
                function Noie(element) {
                    this.element = element;
                    this.title = '';
                    this.text = '';
                    this.bottomText = '';
                    this.isIE = false;
                    this.log = aurelia_logging_1.getLogger('comp:noie');
                    // Get IE or Edge browser version
                    var version = detectIE();
                    if (version === false) {
                        // not IE, not Edge
                    }
                    else if (version >= 12) {
                        // Edge
                    }
                    else {
                        // IE
                        this.isIE = true;
                    }
                }
                Noie.prototype.attached = function () {
                    if (!this.isIE) {
                        this.element.remove();
                    }
                };
                Noie.prototype.openLink = function (href) {
                    location.href = href;
                };
                __decorate([
                    aurelia_framework_1.bindable
                ], Noie.prototype, "title", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], Noie.prototype, "text", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], Noie.prototype, "bottomText", void 0);
                Noie = __decorate([
                    aurelia_framework_1.inject(Element)
                ], Noie);
                return Noie;
            }());
            exports_1("Noie", Noie);
        }
    };
});
