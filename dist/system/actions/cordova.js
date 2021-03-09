System.register(["moment"], function (exports_1, context_1) {
    "use strict";
    var moment, setNetwork, contactSoftRequest;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (moment_1) {
                moment = moment_1;
            }
        ],
        execute: function () {
            exports_1("setNetwork", setNetwork = function (state, network) {
                var newState = Object.assign({}, state);
                newState.network = network;
                return newState;
            });
            exports_1("contactSoftRequest", contactSoftRequest = function (state, accepted) {
                var newState = Object.assign({}, state);
                newState.contacts.nbSoftRequests++;
                newState.contacts.lastSoftRequestedDate = moment().toDate();
                newState.contacts.softPermitted = accepted;
                return newState;
            });
            // TODO: more actions
        }
    };
});
