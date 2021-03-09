export declare class AnalyticsGoogle {
    private initialized;
    enableNavigationTracking: boolean;
    enableClickTracking: boolean;
    enableEventTracking: boolean;
    listenRouter: boolean;
    anonymizeIp: boolean;
    private log;
    init(id: string): void;
    get ga(): any;
    start(): void;
    private setListeners;
    private attachClickTracker;
    private trackClick;
    private trackPage;
}
