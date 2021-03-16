import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArMainHeaderTheme } from './ar-main-header-theme';
export declare class ArMainHeader implements UxComponent {
    private element;
    styleEngine: StyleEngine;
    backgroundUrls: Array<string>;
    backgroundUrl: string;
    mp4Link: string;
    theme: ArMainHeaderTheme;
    fixedHeight: number;
    fullScreen: boolean;
    transition: string;
    duration: number;
    handleResize: EventListener;
    headerHeight: number;
    backgroundIndex: number;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    attached(): void;
    detached(): void;
    bind(): void;
    themeChanged(newValue: any): void;
    fullScreenChanged(): void;
    private severalUrlTimeout;
    backgroundUrlsChanged(): void;
}
