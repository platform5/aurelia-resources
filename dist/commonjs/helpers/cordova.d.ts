export declare class CordovaHelpers {
    static ready: boolean;
    static device: any;
    static online: boolean;
    static networkType: string;
    static deviceReady(): Promise<unknown>;
    static detectDevice(): void;
    static overwriteWindowOpenWithInAppBrowser(): void;
    static startOnlineObserver(): void;
    static updateNetworkType(): void;
    static setStatusBar(color: string): void;
    static hideKeyobard(): void;
    static showKeyobard(): void;
    static hideKeyobardToolbar(): void;
    static showKeyobardToolbar(): void;
    static keyboardHeight: number;
    static observeKeyboardHeight(): void;
    static isKeyboardVisible(): boolean | null;
    static canUseContacts(): Promise<boolean | null>;
    static getContacts(search?: string, fields?: Array<any>): Promise<Array<any>>;
    static enableOneSignalNotifications(appId: string): void;
    static oneSignalHasPrompt(): Promise<boolean>;
    static oneSignalHasAccepted(): Promise<boolean>;
}
