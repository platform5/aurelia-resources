import { UxModalService, UxModalServiceResult } from '@aurelia-ux/modal';
import { inject, computedFrom } from 'aurelia-framework';
import { errorify } from '../helpers/notify';
import * as removeAccents from 'remove-accents';

@inject(UxModalService)
export class PromptTextDialog {

  public title: string = 'Enter a value';
  public text: string = '';
  public label: string = '';
  public placeholder: string = '';
  public required: boolean = false;
  public icon: string = '';
  public value: string;
  
  constructor(private modalService: UxModalService) {
    
  }

  public activate(params: any) {
    if (!params) {
      throw new Error('You must provide params when opening prompt-text-dialog');
    }
    this.icon = params.icon;
    this.required = params.required === true ? true : false;
    this.title = params.title ? params.title : 'Enter a value';
    this.text = params.text ? params.text : '';
    this.label = params.label ? params.label : '';
    this.placeholder = params.placeholder ? params.placeholder : '';
    this.value = params.value && typeof params.value === 'string' ? params.value : '';
  }

  public async canDeactivate(result: UxModalServiceResult) {
    if (result.wasCancelled) {
      return true;
    }
    if (this.required && !result.output) {
      errorify(new Error('You must enter a value'));
      return false;
    }
    return true;
  }

}
