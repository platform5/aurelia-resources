import { EventAggregator } from 'aurelia-event-aggregator';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArNextTheme } from './ar-next-theme';
export declare class ArNext implements UxComponent {
    element: HTMLElement;
    private styleEngine;
    private eventAggregator;
    theme: ArNextTheme;
    defaultItemId: string;
    transitionDuration: string;
    constructor(element: HTMLElement, styleEngine: StyleEngine, eventAggregator: EventAggregator);
    bind(): void;
    themeChanged(newValue: any): void;
    private setTransitionDuration;
    attached(): void;
    autoNext(): void;
    autoPrev(): void;
    autoFirst(): void;
    autoLast(): void;
    to(elementId: string): void;
    nextTo(elementId: string): void;
    prevTo(elementId: string): void;
    reset(id?: string): void;
}
export declare class ArNextCustomAttribute {
    private element;
    value: string;
    constructor(element: Element);
    attached(): void;
}
export declare class ArPrevCustomAttribute {
    private element;
    value: string;
    constructor(element: Element);
    attached(): void;
}
export declare class ArBackCustomAttribute {
    private element;
    value: string;
    constructor(element: Element);
}
export declare class ArAutoNextCustomAttribute {
    private element;
    constructor(element: Element);
}
export declare class ArAutoPrevCustomAttribute {
    private element;
    constructor(element: Element);
}
export declare class ArAutoFirstCustomAttribute {
    private element;
    constructor(element: Element);
}
export declare class ArAutoLastCustomAttribute {
    private element;
    constructor(element: Element);
}
