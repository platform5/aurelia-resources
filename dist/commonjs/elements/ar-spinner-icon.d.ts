import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArSpinnerIconTheme } from './ar-spinner-icon-theme';
export declare class ArSpinnerIcon implements UxComponent {
    element: HTMLElement;
    styleEngine: StyleEngine;
    private log;
    size: string;
    color: 'light';
    theme: ArSpinnerIconTheme;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    themeChanged(newValue: any): void;
}
