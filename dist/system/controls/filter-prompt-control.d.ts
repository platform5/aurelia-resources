import { UxModalService } from '@aurelia-ux/modal';
interface UxInputElement extends HTMLElement {
    value: any;
}
export declare class FilterPromptControl {
    element: UxInputElement;
    modalService: UxModalService;
    disabled: any;
    readonly: any;
    value: string[];
    promptTitle: string;
    promptText: string;
    promptLabel: string;
    promptPlaceholder: string;
    focused: boolean;
    constructor(element: UxInputElement, modalService: UxModalService);
    getValue(): string[];
    setValue(value: any): void;
    valueChanged(): void;
    get hasValue(): boolean;
    focus(): Promise<void>;
    addValue(value: string): void;
    removeValue(value: string, event?: Event): void;
}
export {};
