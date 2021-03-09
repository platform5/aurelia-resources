import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArBreadcrumbTheme } from './ar-breadcrumb-theme';
export declare class ArBreadcrumb implements UxComponent {
    private element;
    styleEngine: StyleEngine;
    theme: ArBreadcrumbTheme;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    themeChanged(newValue: any): void;
}
