import * as Cordova from '../interfaces/cordova';
import * as moment from 'moment';

export interface State {
  network: Cordova.Network;
  notifications: Cordova.Notifications;
  contacts: Cordova.Contacts;
}

export const setNetwork = (state: State, network: Cordova.Network) => {
  const newState = Object.assign({}, state);
  newState.network = network;
  return newState;
}

export const contactSoftRequest = (state: State, accepted: boolean) => {
  const newState = Object.assign({}, state);
  newState.contacts.nbSoftRequests++;
  newState.contacts.lastSoftRequestedDate = moment().toDate();
  newState.contacts.softPermitted = accepted;
  return newState;
}

// TODO: more actions
