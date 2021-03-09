import { DialogController } from 'aurelia-dialog';
export declare class LocalesDialog {
    private controller;
    private locale;
    private locales;
    private activated;
    private dialogContentElement;
    cancelButtonType: string;
    okButtonType: string;
    static CancelButtonType: 'text' | 'raised' | 'flat' | 'outline' | 'none';
    static OkButtonType: 'text' | 'raised' | 'flat' | 'outline' | 'none';
    constructor(controller: DialogController);
    activate(options?: LocalesDialogOptions): void;
    setButtons(): void;
    attached(): void;
    centerSelectedLocale(): void;
    selectLocale(locale: string): void;
    dismiss(): void;
}
export interface LocalesDialogOptions {
    locale?: string;
    locales?: Array<string>;
}
