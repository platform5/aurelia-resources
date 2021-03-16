export interface NotifyOptions {
    append?: boolean;
    containerSelector?: string;
    timeout?: number;
    viewModel?: any;
    limit?: number;
    type?: 'info' | 'success' | 'warning' | 'danger' | 'primary' | 'accent' | 'action';
    sendToSentry?: boolean;
    context?: {
        [key: string]: any;
    };
}
export declare function addNotifyContainerAlias(alias: string, selector: string): void;
export declare function setNotifyDefaults(settings: NotifyOptions, setOnlyGiventKeys?: boolean): void;
export declare function notifaction(message: string, actionLabel: string, actionCallback: () => any, actionContext: any, options: NotifyOptions): any;
export declare function notify(message: string, options?: NotifyOptions): any;
export declare function errorify(error: Error, options?: NotifyOptions): any;
export declare function errorifyTo(containerSelector: string): (error: Error) => any;
