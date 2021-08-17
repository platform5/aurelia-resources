export declare class AnalyticEntry {
    private date;
    private type;
    private path;
    private title?;
    private action?;
    private category?;
    private value?;
    private _isSaved;
    constructor(type: 'navigation' | 'click' | 'event', path: string);
    static navigation(path: string, title: string): AnalyticEntry;
    static click(path: string, category: string, action: string, label?: string, value?: any): AnalyticEntry;
    static event(path: string, category: string, action: string, label?: string, value?: any): AnalyticEntry;
    get isSaved(): boolean;
    saved(): void;
    output(): {
        date: Date;
        type: "navigation" | "click" | "event";
        path: string;
        category: string;
        action: string;
        title: string;
        value: any;
    };
}
export declare class Analytics {
    private sessionId;
    private identity;
    private entries;
    enableNavigationTracking: boolean;
    enableClickTracking: boolean;
    enableEventTracking: boolean;
    saveOnNavigation: boolean;
    saveOnClick: boolean;
    saveOnEvent: boolean;
    listenRouter: boolean;
    currentPath: string;
    constructor(id?: string);
    setSessionId(id?: string): void;
    setIdentity(identity: string): void;
    setListeners(): void;
    navigation(path: string, title?: string): void;
    click(category: string, action?: string, label?: string, value?: any): void;
    event(category: string, action?: string, label?: string, value?: any): void;
    private saveTimeout;
    save(onlyUnsaved?: boolean): void;
}
