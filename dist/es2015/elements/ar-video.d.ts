import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArVideoTheme } from './ar-video-theme';
export declare class ArVideo implements UxComponent {
    element: HTMLElement;
    private styleEngine;
    theme: ArVideoTheme;
    url: string;
    ratio: number;
    autoPlay: boolean;
    private provider;
    private videoId;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    themeChanged(newValue: any): void;
    urlChanged(): void;
    detectProvider(): void;
    youtubeVideoId(youtubeUrl: any): any;
    vimeoVideoId(vimeoUrl: any): any;
}
