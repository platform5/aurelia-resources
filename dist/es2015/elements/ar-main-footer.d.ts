import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArMainFooterTheme } from './ar-main-footer-theme';
export declare class ArMainFooter implements UxComponent {
    private element;
    styleEngine: StyleEngine;
    theme: ArMainFooterTheme;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    themeChanged(newValue: any): void;
}
