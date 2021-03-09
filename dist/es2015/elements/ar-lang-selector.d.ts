import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArLangSelectorTheme } from './ar-lang-selector-theme';
import { EventAggregator } from 'aurelia-event-aggregator';
export declare class ArLangSelector implements UxComponent {
    private element;
    private styleEngine;
    private ea;
    theme: ArLangSelectorTheme;
    locale: string;
    locales: Array<string>;
    private dicoPrefix;
    private showSelector;
    private sub;
    private log;
    constructor(element: HTMLElement, styleEngine: StyleEngine, ea: EventAggregator);
    attached(): void;
    detached(): void;
    bind(): void;
    setLocales(): void;
    setLocale(locale: any): void;
    themeChanged(newValue: any): void;
}
