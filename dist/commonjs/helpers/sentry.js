"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentryHelper = void 0;
var Sentry = require("@sentry/browser");
var tracing_1 = require("@sentry/tracing");
var aurelia_framework_1 = require("aurelia-framework");
var SentryHelper = /** @class */ (function () {
    function SentryHelper(container) {
        this.container = container;
        this.isInited = false;
    }
    SentryHelper.prototype.initIfConfigured = function () {
        var _a;
        var config = this.container.get('aurelia-resources-config');
        var dsn = (_a = config === null || config === void 0 ? void 0 : config.sentry) === null || _a === void 0 ? void 0 : _a.dsn;
        if (dsn) {
            this.init();
        }
    };
    SentryHelper.prototype.init = function () {
        var _a;
        if (this.isInited) {
            console.warn('Sentry has already been initialized. You should not call init() twice.');
            return;
        }
        var config = this.container.get('aurelia-resources-config');
        var dsn = (_a = config === null || config === void 0 ? void 0 : config.sentry) === null || _a === void 0 ? void 0 : _a.dsn;
        if (dsn) {
            Sentry.init({
                dsn: dsn,
                release: config.sentry.release || undefined,
                environment: config.sentry.environment || undefined,
                integrations: [new tracing_1.Integrations.BrowserTracing()],
                tracesSampleRate: config.sentry.samplingRate || 1.0,
                debug: config.sentry.debug || undefined
            });
        }
        this.isInited = true;
    };
    SentryHelper.prototype.setUser = function (user) {
        if (!this.isInited) {
            console.warn('Sentry must be initialized first');
            return;
        }
        Sentry.setUser(user);
    };
    SentryHelper.prototype.unsetUser = function () {
        if (!this.isInited) {
            console.warn('Sentry must be initialized first');
            return;
        }
        Sentry.setUser(null);
    };
    SentryHelper.prototype.fakeError = function (fakeErrorMsg) {
        if (fakeErrorMsg === void 0) { fakeErrorMsg = 'This is my fake error message'; }
        this.capture(new Error(fakeErrorMsg));
    };
    SentryHelper.prototype.captureIfConfigured = function (error, context) {
        if (!this.isInited) {
            return;
        }
        this.capture(error, context);
    };
    SentryHelper.prototype.capture = function (error, context) {
        if (!this.isInited) {
            console.warn('Sentry must be initialized first');
            return;
        }
        Sentry.captureException(error, context);
    };
    SentryHelper.prototype.captureMessageIfConfigured = function (message, context) {
        if (!this.isInited) {
            return;
        }
        this.captureMessage(message, context);
    };
    SentryHelper.prototype.captureMessage = function (message, context) {
        if (!this.isInited) {
            console.warn('Sentry must be initialized first');
            return;
        }
        Sentry.captureMessage(message, context);
    };
    SentryHelper = __decorate([
        aurelia_framework_1.inject(aurelia_framework_1.Container)
    ], SentryHelper);
    return SentryHelper;
}());
exports.SentryHelper = SentryHelper;
