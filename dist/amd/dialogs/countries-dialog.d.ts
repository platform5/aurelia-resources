import { DialogController } from 'aurelia-dialog';
export declare class CountriesDialog {
    private controller;
    private prefix;
    private country;
    private countries;
    private activated;
    private dialogContentElement;
    cancelButtonType: string;
    okButtonType: string;
    static CancelButtonType: 'text' | 'raised' | 'flat' | 'outline' | 'none';
    static OkButtonType: 'text' | 'raised' | 'flat' | 'outline' | 'none';
    constructor(controller: DialogController);
    activate(options?: CountriesDialogOptions): void;
    setButtons(): void;
    attached(): void;
    centerSelectedLocale(): void;
    selectCountry(country: string): void;
    dismiss(): void;
}
export interface CountriesDialogOptions {
    country?: string;
    countries?: Array<string>;
    prefix?: string;
}
