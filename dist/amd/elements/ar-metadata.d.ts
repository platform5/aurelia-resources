import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArMetadataTheme } from './ar-metadata-theme';
import { EventAggregator } from 'aurelia-event-aggregator';
export interface Metadata {
    key: string;
    value: any;
}
export declare class ArMetadata implements UxComponent {
    private element;
    styleEngine: StyleEngine;
    private eventAggregator;
    theme: ArMetadataTheme;
    value: Array<Metadata> | any;
    private fakeValue;
    private focused;
    private log;
    private editorContainer;
    private originalValue;
    private dialog;
    constructor(element: HTMLElement, styleEngine: StyleEngine, eventAggregator: EventAggregator);
    bind(): void;
    attached(): void;
    detached(): void;
    moveToBodyTag(): void;
    removeFromBodyTag(): void;
    themeChanged(newValue: any): void;
    valueChanged(): void;
    focus(): void;
    closeEditor(): void;
    stopPropagation(event: any): void;
    addItem(event: any): void;
    removeItem(index: any, event: any): void;
}
