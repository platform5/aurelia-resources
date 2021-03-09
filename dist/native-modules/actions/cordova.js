import * as moment from 'moment';
export var setNetwork = function (state, network) {
    var newState = Object.assign({}, state);
    newState.network = network;
    return newState;
};
export var contactSoftRequest = function (state, accepted) {
    var newState = Object.assign({}, state);
    newState.contacts.nbSoftRequests++;
    newState.contacts.lastSoftRequestedDate = moment().toDate();
    newState.contacts.softPermitted = accepted;
    return newState;
};
// TODO: more actions
