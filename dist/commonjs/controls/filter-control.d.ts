import { UxModalService } from '@aurelia-ux/modal';
interface UxInputElement extends HTMLElement {
    value: any;
}
export declare class FilterControl {
    element: UxInputElement;
    modalService: UxModalService;
    disabled: any;
    readonly: any;
    label: string;
    multiple: any;
    options: Array<any>;
    value: any;
    labelKey: string;
    valueKey: string;
    icon: string;
    showSearch: 'auto' | boolean;
    focused: boolean;
    ready: boolean;
    constructor(element: UxInputElement, modalService: UxModalService);
    bind(): void;
    blur(): void;
    getValue(): any;
    setValue(value: any): void;
    validateValueAgainsAvailableOptions(originalValue: any): any;
    computeValueLabel(value: any): string;
    computeLabel(option: any): string;
    computeValue(option: any): any;
    focusedChanged(focused: boolean): void;
    private serializedCurrentValue;
    valueChanged(): void;
    focus(): Promise<void>;
    get hasValue(): boolean;
}
export {};
