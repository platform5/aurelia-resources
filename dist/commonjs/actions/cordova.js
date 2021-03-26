"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactSoftRequest = exports.setNetwork = void 0;
var moment = require("moment");
var setNetwork = function (state, network) {
    var newState = Object.assign({}, state);
    newState.network = network;
    return newState;
};
exports.setNetwork = setNetwork;
var contactSoftRequest = function (state, accepted) {
    var newState = Object.assign({}, state);
    newState.contacts.nbSoftRequests++;
    newState.contacts.lastSoftRequestedDate = moment().toDate();
    newState.contacts.softPermitted = accepted;
    return newState;
};
exports.contactSoftRequest = contactSoftRequest;
// TODO: more actions
