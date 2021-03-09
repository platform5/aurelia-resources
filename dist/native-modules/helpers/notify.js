import { Container } from 'aurelia-framework';
import { NotificationService } from 'aurelia-notify';
import { getLogger } from 'aurelia-logging';
import { ArNotification } from '../elements/ar-notification';
import { SentryHelper } from './sentry';
var serviceReady = false;
var notificationService;
var log;
function gettingServiceReady() {
    if (serviceReady)
        return;
    log = getLogger('notify');
    notificationService = Container.instance.get(NotificationService);
    serviceReady = true;
}
var defaultOptions = {
    timeout: 5000,
    viewModel: ArNotification,
    type: 'info',
};
var aliases = {};
export function addNotifyContainerAlias(alias, selector) {
    aliases[alias] = selector;
}
export function setNotifyDefaults(settings, setOnlyGiventKeys) {
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
export function notifaction(message, actionLabel, actionCallback, actionContext, options) {
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
export function notify(message, options) {
    if (options === void 0) { options = {}; }
    gettingServiceReady();
    var type = options.type || defaultOptions.type || 'info';
    var settings = Object.assign({}, defaultOptions, options);
    if (aliases[settings.containerSelector])
        settings.containerSelector = aliases[settings.containerSelector];
    // by default not sent to sentry
    if (options.sendToSentry === true) {
        var sentryContext = options.context ? { contexts: options.context } : undefined;
        Container.instance.get(SentryHelper).captureMessageIfConfigured(message, sentryContext);
    }
    return notificationService.notify(message, settings, type);
}
export function errorify(error, options) {
    if (options === void 0) { options = {}; }
    if (!options.type)
        options.type = 'warning';
    // by default send to sentry
    if (options.sendToSentry !== false) {
        var sentryContext = options.context ? { contexts: options.context } : undefined;
        Container.instance.get(SentryHelper).captureIfConfigured(error, sentryContext);
    }
    return notify(error.message, Object.assign({}, options, { sendToSentry: false }));
}
export function errorifyTo(containerSelector) {
    return function (error) {
        return errorify(error);
    };
}
