System.register([], function (exports_1, context_1) {
    "use strict";
    var initialNetwork, initialNotifications, initialContacts;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("initialNetwork", initialNetwork = {
                connected: false,
                type: 'unknown'
            });
            exports_1("initialNotifications", initialNotifications = {
                lastSoftRequestedDate: null,
                nbSoftRequests: 0,
                softPermitted: null,
                hardRequested: false,
                hardRequestDate: null,
                permitted: null,
            });
            exports_1("initialContacts", initialContacts = {
                lastSoftRequestedDate: null,
                nbSoftRequests: 0,
                softPermitted: null,
                hardRequested: false,
                hardRequestDate: null,
                permitted: null,
            });
        }
    };
});
