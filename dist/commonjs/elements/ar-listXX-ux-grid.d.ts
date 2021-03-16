import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArListTheme } from './ar-list-theme';
export declare class ArList implements UxComponent {
    element: HTMLElement;
    private styleEngine;
    theme: ArListTheme;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    themeChanged(newValue: any): void;
}
