import { UxModalService, UxModalServiceResult } from '@aurelia-ux/modal';
export declare class PromptTextDialog {
    private modalService;
    title: string;
    text: string;
    label: string;
    placeholder: string;
    required: boolean;
    icon: string;
    value: string;
    constructor(modalService: UxModalService);
    activate(params: any): void;
    canDeactivate(result: UxModalServiceResult): Promise<boolean>;
}
