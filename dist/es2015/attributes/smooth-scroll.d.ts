export declare class SmoothScroll {
    duration: number;
    easing: string;
    container: string | HTMLElement;
    offsetContainer: string | HTMLElement;
    offset: number;
    private subs;
    private element;
    static defaultConfig: {
        duration: number;
        easing: string;
        container: string;
        offsetContainer: string;
        offset: number;
    };
    constructor(element: any, animator: any, router: any);
    attached(): void;
    detached(): void;
    onClick(event: any): boolean;
    scrollTo(elementOrHash: any): void;
    getOffset(): number;
}
