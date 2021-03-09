import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArSearchInputTheme } from './ar-search-input-theme';
export declare class ArSearchInput implements UxComponent {
    private element;
    styleEngine: StyleEngine;
    autofocus: any;
    theme: ArSearchInputTheme;
    placeholder: string;
    value: string;
    rawValue: string;
    focused: boolean;
    inputbox: HTMLInputElement;
    private ignoreRawChanges;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    attached(): void;
    detached(): void;
    bind(): void;
    themeChanged(newValue: any): void;
    focusedChanged(focused: boolean): void;
    getValue(): string;
    setValue(value: any): void;
    private processRawValue;
    rawValueChanged(newValue: string): void;
    focus(): void;
}
