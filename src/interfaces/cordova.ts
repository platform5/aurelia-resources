export interface Network {
  connected: boolean;
  type: string;
}

export interface Notifications {
  lastSoftRequestedDate: Date | null;
  nbSoftRequests: number;
  softPermitted: boolean | null;
  hardRequested: boolean;
  hardRequestDate: Date | null;
  permitted: boolean;
}

export interface Contacts {
  lastSoftRequestedDate: Date | null;
  nbSoftRequests: number;
  softPermitted: boolean | null;
  hardRequested: boolean;
  hardRequestDate: Date | null;
  permitted: boolean | null;
}

export const initialNetwork: Network = {
  connected: false,
  type: 'unknown'
}

export const initialNotifications: Notifications = {
  lastSoftRequestedDate: null,
  nbSoftRequests: 0,
  softPermitted: null,
  hardRequested: false,
  hardRequestDate: null,
  permitted: null,
}

export const initialContacts: Contacts = {
    lastSoftRequestedDate: null,
    nbSoftRequests: 0,
    softPermitted: null,
    hardRequested: false,
    hardRequestDate: null,
    permitted: null,
  }
