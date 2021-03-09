import { inject, bindable } from 'aurelia-framework';

export interface ArDialogPromptOption {
  value: any;
  label: string;
}

@inject(Element)
export class ArDialogPrompt {  
  @bindable value: any;
  @bindable options: Array<ArDialogPromptOption> | undefined = undefined;
}
