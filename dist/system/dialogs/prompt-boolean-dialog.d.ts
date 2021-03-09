import { UxModalService, UxModalServiceResult } from '@aurelia-ux/modal';
export declare class PromptBooleanDialog {
    private modalService;
    title: string;
    text: string;
    required: boolean;
    yesType: string;
    noType: string;
    constructor(modalService: UxModalService);
    activate(params: any): void;
    canDeactivate(result: UxModalServiceResult): Promise<boolean>;
}
