define(["require", "exports", "moment"], function (require, exports, moment) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setNetwork = function (state, network) {
        var newState = Object.assign({}, state);
        newState.network = network;
        return newState;
    };
    exports.contactSoftRequest = function (state, accepted) {
        var newState = Object.assign({}, state);
        newState.contacts.nbSoftRequests++;
        newState.contacts.lastSoftRequestedDate = moment().toDate();
        newState.contacts.softPermitted = accepted;
        return newState;
    };
});
// TODO: more actions
