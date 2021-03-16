import { UxModalService, UxModalServiceResult } from '@aurelia-ux/modal';
export declare class PromptSelectDialog {
    private modalService;
    mode: 'single' | 'multiple';
    options: Array<any>;
    value: any;
    labelKey: string;
    valueKey: string;
    title: string;
    required: boolean;
    autoClose: boolean;
    icon: string;
    showSearch: 'auto' | boolean;
    constructor(modalService: UxModalService);
    activate(params: any): void;
    canDeactivate(result: UxModalServiceResult): Promise<boolean>;
    getLabel(option: any): string;
    getValue(option: any): any;
    toggleOption(option: any, event: MouseEvent): void;
    isSelected(option: any, value: any): boolean;
    get shouldShowSearch(): boolean;
}
export declare class PromptSelectDialogFilterOptionsValueConverter {
    toView(list: Array<any>, filter: string, labelKey: string | undefined, valueKey: string | undefined): Array<any>;
}
