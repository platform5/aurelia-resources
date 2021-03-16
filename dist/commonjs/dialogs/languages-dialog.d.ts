import { DialogController } from 'aurelia-dialog';
export declare class LanguagesDialog {
    private controller;
    private prefix;
    language: string;
    languages: Array<string>;
    private activated;
    private dialogContentElement;
    cancelButtonType: string;
    okButtonType: string;
    static CancelButtonType: 'text' | 'raised' | 'flat' | 'outline' | 'none';
    static OkButtonType: 'text' | 'raised' | 'flat' | 'outline' | 'none';
    constructor(controller: DialogController);
    activate(options?: LanguagesDialogOptions): void;
    setButtons(): void;
    attached(): void;
    centerSelectedLocale(): void;
    selectLanguage(language: string): void;
    dismiss(): void;
}
export interface LanguagesDialogOptions {
    language?: string;
    languages?: Array<string>;
    prefix?: string;
}
