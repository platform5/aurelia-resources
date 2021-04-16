import { UxModalService } from '@aurelia-ux/modal';
interface UxInputElement extends HTMLElement {
    value: any;
}
export declare class FilterDatesControl {
    element: UxInputElement;
    modalService: UxModalService;
    disabled: any;
    readonly: any;
    from: Date | undefined;
    to: Date | undefined;
    format: string;
    autoSetSiblingIfEmpty: boolean;
    datepickerControlFrom: HTMLElement;
    datepickerControlTo: HTMLElement;
    constructor(element: UxInputElement, modalService: UxModalService);
    private isValid;
    valueChanged(newValue: any): void;
    selectFrom(): Promise<void>;
    selectTo(): Promise<void>;
}
export {};
