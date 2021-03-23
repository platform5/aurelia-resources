import { UxModalService } from '@aurelia-ux/modal';
interface UxInputElement extends HTMLElement {
    value: any;
}
export declare class FilterChipsControl {
    element: UxInputElement;
    modalService: UxModalService;
    disabled: any;
    readonly: any;
    multiple: any;
    options: Array<any>;
    value: any;
    labelKey: string;
    valueKey: string;
    focused: boolean;
    constructor(element: UxInputElement, modalService: UxModalService);
    getValue(): any;
    setValue(value: any): void;
    valueChanged(newValue?: any, oldValue?: any): void;
    private fixValue;
    get hasValue(): boolean;
    toggle(value: any): void;
    isSelected(v: any): boolean;
}
export {};
