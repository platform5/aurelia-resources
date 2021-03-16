import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArDrawerTheme } from './ar-drawer-theme';
import { EventAggregator } from 'aurelia-event-aggregator';
export declare class ArDrawer implements UxComponent {
    private element;
    styleEngine: StyleEngine;
    private eventAggregator;
    id: string;
    position: string;
    animate: boolean;
    fullScreen: boolean;
    overlay: boolean;
    showBar: boolean;
    title: string;
    private log;
    theme: ArDrawerTheme;
    opened: boolean;
    private picker;
    private overlayElement;
    private overlayShowed;
    static zIndexRef: number;
    static drawerLayers: number;
    private zIndex;
    private handleResize;
    constructor(element: HTMLElement, styleEngine: StyleEngine, eventAggregator: EventAggregator);
    bind(): void;
    attached(): void;
    detached(): void;
    moveToBodyTag(): void;
    removeFromBodyTag(): void;
    showOverlay(): void;
    hideOverlay(): void;
    themeChanged(newValue: any): void;
    open(): void;
    close(): void;
    setZIndex(): void;
    toggle(): void;
    noticeApp(): void;
}
export declare class ArDrawerToggleAttribute {
    private element;
    private subs;
    private value;
    constructor(element: Element);
    attached(): void;
    detached(): void;
    onClick(event: any): void;
}
export declare class ArDrawerOpenAttribute {
    private element;
    private subs;
    private value;
    constructor(element: Element);
    attached(): void;
    detached(): void;
    onClick(event: any): void;
}
export declare class ArDrawerCloseAttribute {
    private element;
    private subs;
    private value;
    constructor(element: Element);
    attached(): void;
    detached(): void;
    onClick(event: any): void;
}
export declare function openDrawer(id: any): void;
export declare function closeDrawer(id: any): void;
export declare function toggleDrawer(id: any): void;
export declare function onDrawerStatusChanged(id: any, settings?: {
    setup: string;
    teardown: string;
    onChanged: string;
}): (target: any) => void;
