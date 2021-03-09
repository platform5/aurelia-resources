import { NotificationController } from 'aurelia-notify';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArNotificationTheme } from './ar-notification-theme';
export declare class ArNotification implements UxComponent {
    private controller;
    private element;
    private styleEngine;
    level: any;
    notification: string;
    data: any;
    theme: ArNotificationTheme;
    constructor(controller: NotificationController, element: HTMLElement, styleEngine: StyleEngine);
    activate(model: any): void;
    bind(): void;
    themeChanged(newValue: any): void;
    private doAction;
}
