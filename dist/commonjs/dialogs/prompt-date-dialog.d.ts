import { UxModalService, UxModalServiceResult } from '@aurelia-ux/modal';
export declare class PromptDateDialog {
    private modalService;
    title: string;
    text: string;
    required: boolean;
    value: Date;
    type: 'date' | 'datetime';
    constructor(modalService: UxModalService);
    activate(params: any): void;
    canDeactivate(result: UxModalServiceResult): Promise<boolean>;
}
