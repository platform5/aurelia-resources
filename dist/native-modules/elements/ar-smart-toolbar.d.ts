import { ArSmartToolbarTheme } from './ar-smart-toolbar-theme';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { EventAggregator } from 'aurelia-event-aggregator';
export declare class ArSmartToolbar implements UxComponent {
    private element;
    styleEngine: StyleEngine;
    private eventAggregator;
    id: string;
    position: 'bottom' | 'top';
    shrinkOnScroll: boolean;
    private log;
    theme: ArSmartToolbarTheme;
    private handleResize;
    constructor(element: HTMLElement, styleEngine: StyleEngine, eventAggregator: EventAggregator);
    bind(): void;
    attached(): void;
    detached(): void;
    themeChanged(newValue: any): void;
}
