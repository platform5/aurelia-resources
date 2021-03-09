define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.initialNetwork = {
        connected: false,
        type: 'unknown'
    };
    exports.initialNotifications = {
        lastSoftRequestedDate: null,
        nbSoftRequests: 0,
        softPermitted: null,
        hardRequested: false,
        hardRequestDate: null,
        permitted: null,
    };
    exports.initialContacts = {
        lastSoftRequestedDate: null,
        nbSoftRequests: 0,
        softPermitted: null,
        hardRequested: false,
        hardRequestDate: null,
        permitted: null,
    };
});
