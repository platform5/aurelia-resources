import { UxModalService } from '@aurelia-ux/modal';
interface UxInputElement extends HTMLElement {
    value: any;
}
export declare class FilterDateControl {
    element: UxInputElement;
    modalService: UxModalService;
    disabled: any;
    readonly: any;
    value: Date | undefined;
    format: string;
    datepickerControl: HTMLElement;
    constructor(element: UxInputElement, modalService: UxModalService);
    getValue(): Date;
    setValue(value: any): void;
    valueChanged(): void;
    get hasValue(): boolean;
    focus(): Promise<void>;
}
export {};
