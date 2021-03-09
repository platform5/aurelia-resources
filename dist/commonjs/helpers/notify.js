"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_notify_1 = require("aurelia-notify");
var aurelia_logging_1 = require("aurelia-logging");
var ar_notification_1 = require("../elements/ar-notification");
var sentry_1 = require("./sentry");
var serviceReady = false;
var notificationService;
var log;
function gettingServiceReady() {
    if (serviceReady)
        return;
    log = aurelia_logging_1.getLogger('notify');
    notificationService = aurelia_framework_1.Container.instance.get(aurelia_notify_1.NotificationService);
    serviceReady = true;
}
var defaultOptions = {
    timeout: 5000,
    viewModel: ar_notification_1.ArNotification,
    type: 'info',
};
var aliases = {};
function addNotifyContainerAlias(alias, selector) {
    aliases[alias] = selector;
}
exports.addNotifyContainerAlias = addNotifyContainerAlias;
function setNotifyDefaults(settings, setOnlyGiventKeys) {
    if (setOnlyGiventKeys === void 0) { setOnlyGiventKeys = true; }
    if (setOnlyGiventKeys) {
        for (var key in settings) {
            defaultOptions[key] = settings[key];
        }
    }
    else {
        defaultOptions = settings;
    }
}
exports.setNotifyDefaults = setNotifyDefaults;
function notifaction(message, actionLabel, actionCallback, actionContext, options) {
    gettingServiceReady();
    var type = options.type || 'action';
    var settings = Object.assign({}, defaultOptions, options);
    if (aliases[settings.containerSelector])
        settings.containerSelector = aliases[settings.containerSelector];
    return notificationService.notify({
        notification: message,
        actionLabel: actionLabel,
        actionCallback: actionCallback,
        actionContext: actionContext
    }, settings, type);
}
exports.notifaction = notifaction;
function notify(message, options) {
    if (options === void 0) { options = {}; }
    gettingServiceReady();
    var type = options.type || defaultOptions.type || 'info';
    var settings = Object.assign({}, defaultOptions, options);
    if (aliases[settings.containerSelector])
        settings.containerSelector = aliases[settings.containerSelector];
    // by default not sent to sentry
    if (options.sendToSentry === true) {
        var sentryContext = options.context ? { contexts: options.context } : undefined;
        aurelia_framework_1.Container.instance.get(sentry_1.SentryHelper).captureMessageIfConfigured(message, sentryContext);
    }
    return notificationService.notify(message, settings, type);
}
exports.notify = notify;
function errorify(error, options) {
    if (options === void 0) { options = {}; }
    if (!options.type)
        options.type = 'warning';
    // by default send to sentry
    if (options.sendToSentry !== false) {
        var sentryContext = options.context ? { contexts: options.context } : undefined;
        aurelia_framework_1.Container.instance.get(sentry_1.SentryHelper).captureIfConfigured(error, sentryContext);
    }
    return notify(error.message, Object.assign({}, options, { sendToSentry: false }));
}
exports.errorify = errorify;
function errorifyTo(containerSelector) {
    return function (error) {
        return errorify(error);
    };
}
exports.errorifyTo = errorifyTo;
