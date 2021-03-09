import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArTimelineTheme } from './ar-timeline-theme';
export declare class ArTimeline implements UxComponent {
    private element;
    styleEngine: StyleEngine;
    private log;
    theme: ArTimelineTheme;
    colors: string;
    autoOrder: boolean;
    order: 'asc' | 'desc';
    placeUndatedItemAtThe: string;
    positionning: 'alt' | 'all-left' | 'all-right' | 'manual' | 'auto';
    limit: number;
    private items;
    private handleResize;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    attached(): void;
    detached(): void;
    themeChanged(newValue: any): void;
    colorsChanged(): void;
    itemsChanged(): void;
    orderChanged(): void;
    placeUndatedItemAtTheChanged(): void;
    autoOrderChanged(): void;
    positionningChanged(): void;
}
