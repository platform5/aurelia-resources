export declare class ArParallax {
    private element;
    private p;
    intensity: number;
    direction: string;
    private handleResize;
    private handleScroll;
    private height;
    private compensation;
    private ready;
    private imageElement;
    private container;
    private minScroll;
    private maxScroll;
    private parallaxWay;
    private parallaxNow;
    constructor(element: HTMLElement);
    bind(): void;
    attached(): void;
    detached(): void;
    private findImage;
    private findScrollingContainer;
}
