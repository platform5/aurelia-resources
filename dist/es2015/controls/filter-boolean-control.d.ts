import { UxModalService } from '@aurelia-ux/modal';
interface UxInputElement extends HTMLElement {
    value: any;
}
export declare class FilterBooleanControl {
    element: UxInputElement;
    modalService: UxModalService;
    disabled: any;
    readonly: any;
    value: boolean | undefined;
    labelType: 'true' | 'active' | 'yes' | 'on' | 'custom';
    labelYes: '';
    labelNo: '';
    focused: boolean;
    constructor(element: UxInputElement, modalService: UxModalService);
    getValue(): boolean;
    setValue(value: any): void;
    valueChanged(): void;
    get hasValue(): boolean;
    click(value: boolean): void;
}
export {};
