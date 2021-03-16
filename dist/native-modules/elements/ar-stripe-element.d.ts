import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArStripeElementTheme } from './ar-stripe-element-theme';
import { EventAggregator } from 'aurelia-event-aggregator';
export declare class ArStripeElement implements UxComponent {
    private element;
    styleEngine: StyleEngine;
    private eventAggregator;
    id: string;
    type: string;
    hidePostalCode: boolean;
    apiKey: string;
    private log;
    private stripeReady;
    private stripe;
    private card;
    private errorMessage;
    theme: ArStripeElementTheme;
    constructor(element: HTMLElement, styleEngine: StyleEngine, eventAggregator: EventAggregator);
    bind(): void;
    private getApiKey;
    attached(): void;
    private createStripeElement;
    private createCardElement;
    detached(): void;
    private loadStripe;
    isStripReady(): Promise<boolean>;
    themeChanged(newValue: any): void;
    createToken(): Promise<any>;
}
