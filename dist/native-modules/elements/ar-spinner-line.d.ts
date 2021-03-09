import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArSpinnerLineTheme } from './ar-spinner-line-theme';
export declare class ArSpinnerLine implements UxComponent {
    private element;
    styleEngine: StyleEngine;
    private log;
    height: string;
    theme: ArSpinnerLineTheme;
    active: boolean;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    themeChanged(newValue: any): void;
}
