var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-event-aggregator", "whatwg-fetch"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_event_aggregator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Api = void 0;
    var Api = /** @class */ (function () {
        function Api(http, eventAggregator) {
            this.http = http;
            this.eventAggregator = eventAggregator;
            /**
             * Set this property in children class when using this class as inheritance
             */
            this.baseUrl = '';
            this.configure();
        }
        Api.prototype.configure = function () {
            var _this = this;
            this.http.configure(function (config) {
                config
                    //.useStandardConfiguration()
                    .withDefaults({
                    credentials: 'same-origin'
                })
                    .withBaseUrl(_this.baseUrl);
            });
        };
        Api.prototype.defaultOptions = function (options) {
            if (options === void 0) { options = {}; }
            var o = {
                method: 'get',
                headers: {}
            };
            o.headers['Content-Type'] = 'application/json';
            return Object.assign({}, o, options);
        };
        Api.prototype.get = function (entrypoint, options) {
            if (options === void 0) { options = {}; }
            return this.http.fetch(entrypoint, this.defaultOptions(options));
        };
        Api.prototype.post = function (entrypoint, body, options) {
            if (body === void 0) { body = {}; }
            if (options === void 0) { options = {}; }
            var o = this.defaultOptions(options);
            o.method = 'post';
            o.body = this.normalizeBody(body, options);
            return this.http.fetch(entrypoint, o);
        };
        Api.prototype.put = function (entrypoint, body, options) {
            if (body === void 0) { body = {}; }
            if (options === void 0) { options = {}; }
            var o = this.defaultOptions(options);
            o.method = 'put';
            o.body = this.normalizeBody(body, options);
            return this.http.fetch(entrypoint, o);
        };
        Api.prototype.delete = function (entrypoint, body, options) {
            if (body === void 0) { body = {}; }
            if (options === void 0) { options = {}; }
            var o = this.defaultOptions(options);
            o.method = 'delete';
            o.body = this.normalizeBody(body, options);
            return this.http.fetch(entrypoint, o);
        };
        Api.prototype.normalizeBody = function (body, options) {
            if (!options.bodyFormat || options.bodyFormat === 'json') {
                body = JSON.stringify(body);
            }
            return body;
        };
        Api = __decorate([
            aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_event_aggregator_1.EventAggregator)
        ], Api);
        return Api;
    }());
    exports.Api = Api;
});
