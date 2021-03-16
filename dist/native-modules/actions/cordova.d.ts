import * as Cordova from '../interfaces/cordova';
export interface State {
    network: Cordova.Network;
    notifications: Cordova.Notifications;
    contacts: Cordova.Contacts;
}
export declare const setNetwork: (state: State, network: Cordova.Network) => State;
export declare const contactSoftRequest: (state: State, accepted: boolean) => State;
