import { ArDialogPromptOption } from './ar-dialog-prompt';
import { TemplatingEngine } from 'aurelia-framework';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArDialogTheme } from './ar-dialog-theme';
export declare type DialogTypes = 'alert' | 'confirmation' | 'prompt' | 'edition';
export interface DialogResponse {
    dismissed: boolean;
    value?: any;
    agree?: boolean;
    error?: Error;
}
export declare class ArDialog implements UxComponent {
    private element;
    styleEngine: StyleEngine;
    private templatingEngine;
    theme: ArDialogTheme;
    container: null | string | Element;
    overlayDismiss: boolean;
    animation: string;
    animationDuration: number;
    type: DialogTypes;
    transient: boolean;
    title: string;
    content: string;
    contentViewModelPath: string;
    promptCompName: string;
    promptOptions?: Array<ArDialogPromptOption>;
    editionViewModelPath: string;
    private editionModel;
    private editionCallback;
    private promptContainer;
    private promptIncludedCompName;
    private promptVM;
    private promptValue;
    static zIndexRef: number;
    static dialogLayers: number;
    private zIndex;
    private log;
    private overlayVisible;
    private dialogVisible;
    private window;
    constructor(element: Element, styleEngine: StyleEngine, templatingEngine: TemplatingEngine);
    attached(): void;
    private moveToContainer;
    private removeFromContainer;
    private createPromptTimeout;
    typeChanged(): void;
    detached(): void;
    private clickOnOverlay;
    private clickOnCard;
    private stopPropagation;
    dismiss(): void;
    private returnPromptValue;
    private returnAgree;
    open(): void;
    close(): void;
    private remove;
    private processSaving;
    private returnResponse;
    subscriptions: Array<Function>;
    errorSubscriptions: Array<Function>;
    whenClosed(): Promise<DialogResponse>;
    setZIndex(): void;
}
export interface ArDialogOptions {
    title?: string;
    bindingContext?: any;
    slotHTML?: string;
    content?: string;
    contentViewModelPath?: string;
    editionViewModelPath?: string;
    editionModel?: any;
    promptCompName?: string;
    type?: DialogTypes;
    promptOptions?: Array<ArDialogPromptOption>;
    editionCallback?: Function;
}
declare let arDialog: (options: ArDialogOptions) => ArDialog;
export { arDialog };
