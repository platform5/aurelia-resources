System.register(["aurelia-framework", "aurelia-notify", "aurelia-logging", "../elements/ar-notification", "./sentry"], function (exports_1, context_1) {
    "use strict";
    var aurelia_framework_1, aurelia_notify_1, aurelia_logging_1, ar_notification_1, sentry_1, serviceReady, notificationService, log, defaultOptions, aliases;
    var __moduleName = context_1 && context_1.id;
    function gettingServiceReady() {
        if (serviceReady)
            return;
        log = aurelia_logging_1.getLogger('notify');
        notificationService = aurelia_framework_1.Container.instance.get(aurelia_notify_1.NotificationService);
        serviceReady = true;
    }
    function addNotifyContainerAlias(alias, selector) {
        aliases[alias] = selector;
    }
    exports_1("addNotifyContainerAlias", addNotifyContainerAlias);
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
    exports_1("setNotifyDefaults", setNotifyDefaults);
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
    exports_1("notifaction", notifaction);
    function notify(message, options) {
        if (options === void 0) { options = {}; }
        gettingServiceReady();
        var type = options.type || defaultOptions.type || 'info';
        var settings = Object.assign({}, defaultOptions, options);
        if (aliases[settings.containerSelector])
            settings.containerSelector = aliases[settings.containerSelector];
        // by default not sent to sentry
        if (options.sendToSentry === true) {
            var sentryContext = options.context ? { contexts: { messageContext: options.context } } : undefined;
            aurelia_framework_1.Container.instance.get(sentry_1.SentryHelper).captureMessageIfConfigured(message, sentryContext);
        }
        return notificationService.notify(message, settings, type);
    }
    exports_1("notify", notify);
    function errorify(error, options) {
        if (options === void 0) { options = {}; }
        if (!options.type)
            options.type = 'warning';
        // by default send to sentry
        if (options.sendToSentry !== false) {
            var sentryContext = options.context ? { contexts: { errorContext: options.context } } : undefined;
            aurelia_framework_1.Container.instance.get(sentry_1.SentryHelper).captureIfConfigured(error, sentryContext);
        }
        return notify(error.message, Object.assign({}, options, { sendToSentry: false }));
    }
    exports_1("errorify", errorify);
    function errorifyTo(containerSelector) {
        return function (error) {
            return errorify(error);
        };
    }
    exports_1("errorifyTo", errorifyTo);
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_notify_1_1) {
                aurelia_notify_1 = aurelia_notify_1_1;
            },
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            },
            function (ar_notification_1_1) {
                ar_notification_1 = ar_notification_1_1;
            },
            function (sentry_1_1) {
                sentry_1 = sentry_1_1;
            }
        ],
        execute: function () {
            serviceReady = false;
            defaultOptions = {
                timeout: 5000,
                viewModel: ar_notification_1.ArNotification,
                type: 'info',
            };
            aliases = {};
        }
    };
});
