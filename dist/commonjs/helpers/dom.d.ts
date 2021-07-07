import { Container } from 'aurelia-framework';
export declare class DomHelpers {
    static getContainer(element: HTMLElement & {
        au?: {
            controller?: {
                container?: Container;
            };
        };
    }): Container | undefined;
    static disablePinch(): void;
    static disableDoubleTapToZoom(): void;
    static scrollToTop(element: HTMLElement, animate?: boolean, duration?: number, operation?: typeof DomHelpers.easeOutCuaic): void;
    static scrollToBottom(element: HTMLElement, animate?: boolean, duration?: number, operation?: typeof DomHelpers.easeOutCuaic): void;
    static scrollToX(element: HTMLElement, x1: number, x2: number, t: number, v: number, step: number, operation: Function): void;
    static horizontalScrollToX(element: HTMLElement, x1: number, x2: number, t: number, v: number, step: number, operation: Function): void;
    static linearTween(t: number): number;
    static easeInQuad(t: number): number;
    static easeOutQuad(t: number): number;
    static easeInOutQuad(t: number): number;
    static easeInCuaic(t: number): number;
    static easeOutCuaic(t: number): number;
    static easeInOutCuaic(t: number): number;
    static easeInQuart(t: number): number;
    static easeOutQuart(t: number): number;
    static easeInOutQuart(t: number): number;
    static easeInQuint(t: number): number;
    static easeOutQuint(t: number): number;
    static easeInOutQuint(t: number): number;
    static easeInSine(t: number): number;
    static easeOutSine(t: number): number;
    static easeInOutSine(t: number): number;
    static easeInExpo(t: number): number;
    static easeOutExpo(t: number): number;
    static easeInOutExpo(t: number): number;
    static easeInCirc(t: number): number;
    static easeOutCirc(t: number): number;
    static easeInOutCirc(t: number): number;
}
