System.register(["aurelia-event-aggregator", "aurelia-framework"], function (exports_1, context_1) {
    "use strict";
    var aurelia_event_aggregator_1, aurelia_framework_1, eventAggregator, CordovaHelpers;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
            eventAggregator = aurelia_framework_1.Container.instance.get(aurelia_event_aggregator_1.EventAggregator);
            CordovaHelpers = /** @class */ (function () {
                function CordovaHelpers() {
                }
                CordovaHelpers.deviceReady = function () {
                    return new Promise(function (resolve) {
                        document.addEventListener('deviceready', function () {
                            CordovaHelpers.ready = true;
                            var _loop_1 = function (lifeCycleEvent) {
                                document.addEventListener(lifeCycleEvent, function (event) {
                                    eventAggregator.publish("cordova:" + lifeCycleEvent, event);
                                }, false);
                            };
                            for (var _i = 0, _a = ['pause', 'resume', 'backbutton', 'menubutton', 'searchbutton', 'startcallbutton', 'endcallbutton', 'volumedownbutton', 'volumeupbutton']; _i < _a.length; _i++) {
                                var lifeCycleEvent = _a[_i];
                                _loop_1(lifeCycleEvent);
                            }
                            resolve(null);
                        });
                    });
                };
                CordovaHelpers.detectDevice = function () {
                    if (!CordovaHelpers.ready)
                        throw new Error('Cannot call detectDevice before deviceReady resolves');
                    CordovaHelpers.device = window.device;
                    var htmltag = document.documentElement;
                    htmltag.classList.add("platform-" + CordovaHelpers.device.platform);
                };
                CordovaHelpers.overwriteWindowOpenWithInAppBrowser = function () {
                    if (!CordovaHelpers.ready)
                        throw new Error('Cannot call overwriteWindowOpenWithInAppBrowser before deviceReady resolves');
                    if (!CordovaHelpers.device)
                        CordovaHelpers.detectDevice();
                    if (CordovaHelpers.device && CordovaHelpers.device.platform !== 'browser') {
                        window.open = window.cordova.InAppBrowser.open;
                    }
                };
                CordovaHelpers.startOnlineObserver = function () {
                    if (!CordovaHelpers.ready)
                        throw new Error('Cannot call startOnlineObserver before deviceReady resolves');
                    var connection = navigator.connection;
                    CordovaHelpers.online = connection.type !== 'none';
                    document.addEventListener('online', function () {
                        CordovaHelpers.online = true;
                        eventAggregator.publish('is-online');
                        setTimeout(function () {
                            CordovaHelpers.updateNetworkType();
                        }, 10);
                    }, false);
                    document.addEventListener('offline', function () {
                        CordovaHelpers.online = false;
                        eventAggregator.publish('is-offline');
                        setTimeout(function () {
                            CordovaHelpers.updateNetworkType();
                        }, 10);
                    }, false);
                };
                ;
                CordovaHelpers.updateNetworkType = function () {
                    if (!CordovaHelpers.ready)
                        throw new Error('Cannot call updateNetworkStatus before deviceReady resolves');
                    var connection = navigator.connection;
                    CordovaHelpers.networkType = connection.type;
                };
                ;
                CordovaHelpers.setStatusBar = function (color) {
                    if (!CordovaHelpers.ready)
                        throw new Error('Cannot call setStatusBar before deviceReady resolves');
                    var w = window;
                    if (!w.device)
                        throw new Error('setStatusBar requires the device plugin');
                    if (w.device.platform === 'browser')
                        return;
                    var sbStyle = 'default';
                    var sbColor = '#fff';
                    if (color === 'blue') {
                        sbStyle = 'blackopaque';
                        sbColor = '#007CBB';
                    }
                    if (window.StatusBar) {
                        var sb = window.StatusBar;
                        if (sbStyle === 'default')
                            sb.styleDefault();
                        if (sbStyle === 'blackopaque')
                            sb.styleBlackOpaque();
                        sb.backgroundColorByHexString(sbColor);
                    }
                };
                CordovaHelpers.hideKeyobard = function () {
                    if (!CordovaHelpers.ready)
                        throw new Error('Cannot call hideKeyobard before deviceReady resolves');
                    var w = window;
                    if (w.Keyboard) {
                        w.Keyboard.hide();
                        eventAggregator.publish('keyboard-changed');
                    }
                };
                CordovaHelpers.showKeyobard = function () {
                    if (!CordovaHelpers.ready)
                        throw new Error('Cannot call showKeyobard before deviceReady resolves');
                    var w = window;
                    if (w.Keyboard) {
                        w.Keyboard.show();
                        eventAggregator.publish('keyboard-changed');
                    }
                };
                CordovaHelpers.hideKeyobardToolbar = function () {
                    if (!CordovaHelpers.ready)
                        throw new Error('Cannot call hideKeyobardToolbar before deviceReady resolves');
                    var w = window;
                    if (w.Keyboard) {
                        w.Keyboard.hideFormAccessoryBar(true, function () {
                            eventAggregator.publish('keyboard-changed');
                        });
                    }
                };
                CordovaHelpers.showKeyobardToolbar = function () {
                    if (!CordovaHelpers.ready)
                        throw new Error('Cannot call showKeyobardToolbar before deviceReady resolves');
                    var w = window;
                    if (w.Keyboard) {
                        w.Keyboard.hideFormAccessoryBar(false, function () {
                            eventAggregator.publish('keyboard-changed');
                        });
                    }
                };
                CordovaHelpers.observeKeyboardHeight = function () {
                    window.addEventListener('keyboardDidHide', function (data) {
                        // Describe your logic which will be run each time keyboard is closed.
                        console.log('keyboardDidHide', data);
                        CordovaHelpers.keyboardHeight = 0;
                        eventAggregator.publish('keyboard-changed');
                    });
                    window.addEventListener('keyboardDidShow', function (event) {
                        // Describe your logic which will be run each time keyboard is closed.
                        console.log('keyboardDidShow ', event);
                        CordovaHelpers.keyboardHeight = event.keyboardHeight;
                        eventAggregator.publish('keyboard-changed');
                    });
                };
                CordovaHelpers.isKeyboardVisible = function () {
                    if (!CordovaHelpers.ready)
                        throw new Error('Cannot call isKeyboardVisible before deviceReady resolves');
                    var w = window;
                    if (w.Keyboard) {
                        return w.Keyboard.isVisible;
                    }
                    return null;
                };
                CordovaHelpers.canUseContacts = function () {
                    if (!CordovaHelpers.ready)
                        throw new Error('Cannot call canUseContacts before deviceReady resolves');
                    var cordova = window.cordova;
                    if (!cordova || !cordova.plugins || !cordova.plugins.diagnostic)
                        return Promise.resolve(false);
                    return new Promise(function (resolve) {
                        cordova.plugins.diagnostic.isContactsAuthorized(function (authorized) {
                            // success
                            resolve(authorized);
                        }, function () {
                            // error
                            resolve(null);
                        });
                    });
                };
                CordovaHelpers.getContacts = function (search, fields) {
                    if (search === void 0) { search = ''; }
                    if (fields === void 0) { fields = ['*']; }
                    if (!CordovaHelpers.ready)
                        throw new Error('Cannot call getContacts before deviceReady resolves');
                    console.log('in getContacts');
                    if (navigator.contacts === undefined) {
                        return Promise.resolve([]);
                    }
                    console.log('fields', fields);
                    return new Promise(function (resolve) {
                        console.log('in promise');
                        navigator.contacts.find(fields, function (contacts) {
                            // success
                            console.log('contacts', contacts);
                            resolve(contacts);
                        }, function (error) {
                            // error
                            console.error(error);
                            resolve([]);
                        }, {
                            multiple: true
                        });
                    });
                };
                /* ONE SIGNAL AREA */
                CordovaHelpers.enableOneSignalNotifications = function (appId) {
                    if (!CordovaHelpers.ready)
                        throw new Error('Cannot call enable before deviceReady resolves');
                    // Enable to debug issues.
                    window.plugins.OneSignal.setLogLevel({ logLevel: 4, visualLevel: 4 });
                    // Set your iOS Settings
                    var iosSettings = {};
                    iosSettings['kOSSettingsKeyAutoPrompt'] = false;
                    iosSettings['kOSSettingsKeyInAppLaunchURL'] = false;
                    var notificationOpenedCallback = function (jsonData) {
                        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
                    };
                    window.plugins.OneSignal
                        .startInit(appId)
                        .iOSSettings(iosSettings)
                        .handleNotificationOpened(notificationOpenedCallback)
                        .endInit();
                };
                CordovaHelpers.oneSignalHasPrompt = function () {
                    if (!CordovaHelpers.ready)
                        throw new Error('Cannot call hasPrompt before deviceReady resolves');
                    console.log('in hasPrompt');
                    console.log('plugin', window.plugins.OneSignal);
                    return new Promise(function (resolve) {
                        console.log('in promise');
                        window.plugins.OneSignal.getPermissionSubscriptionState(function (status) {
                            console.log('back from getPermissionSubscriptionState', status);
                            resolve(status.permissionStatus.hasPrompted); // Bool*/
                        });
                    });
                };
                CordovaHelpers.oneSignalHasAccepted = function () {
                    if (!CordovaHelpers.ready)
                        throw new Error('Cannot call hasAccepted before deviceReady resolves');
                    return new Promise(function (resolve) {
                        window.plugins.OneSignal.getPermissionSubscriptionState(function (status) {
                            resolve(status.permissionStatus.status === 2); // Bool
                        });
                    });
                };
                CordovaHelpers.ready = false;
                CordovaHelpers.online = false;
                CordovaHelpers.networkType = 'unknown';
                CordovaHelpers.keyboardHeight = 0;
                return CordovaHelpers;
            }());
            exports_1("CordovaHelpers", CordovaHelpers);
        }
    };
});
