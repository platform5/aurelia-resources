import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArRangeInputTheme } from './ar-range-input-theme';
export declare class ArRangeInput implements UxComponent {
    element: HTMLElement;
    styleEngine: StyleEngine;
    theme: ArRangeInputTheme;
    type: string;
    value: number;
    min: number;
    max: number;
    step: number;
    multiple: boolean;
    low: number | null;
    high: number | null;
    private rawValue;
    private handleResize;
    private rawValueUpdating;
    progress: number;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    attached(): void;
    multipleChanged(): void;
    setMultirange(): void;
    listenToInputChange(): void;
    detached(): void;
    themeChanged(newValue: any): void;
    valueChanged(): void;
    rawValueChanged(): void;
}
