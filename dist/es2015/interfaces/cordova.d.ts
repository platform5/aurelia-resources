export interface Network {
    connected: boolean;
    type: string;
}
export interface Notifications {
    lastSoftRequestedDate: Date | null;
    nbSoftRequests: number;
    softPermitted: boolean | null;
    hardRequested: boolean;
    hardRequestDate: Date | null;
    permitted: boolean;
}
export interface Contacts {
    lastSoftRequestedDate: Date | null;
    nbSoftRequests: number;
    softPermitted: boolean | null;
    hardRequested: boolean;
    hardRequestDate: Date | null;
    permitted: boolean | null;
}
export declare const initialNetwork: Network;
export declare const initialNotifications: Notifications;
export declare const initialContacts: Contacts;
