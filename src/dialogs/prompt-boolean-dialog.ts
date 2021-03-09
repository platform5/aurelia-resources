import { UxModalService, UxModalServiceResult } from '@aurelia-ux/modal';
import { inject } from 'aurelia-framework';
import { errorify } from '../helpers/notify';

@inject(UxModalService)
export class PromptBooleanDialog {

  public title: string = 'Enter a value';
  public text: string = '';
  public required: boolean = false;

  public yesType = 'raised';
  public noType = 'raised';
  
  constructor(private modalService: UxModalService) {
    
  }

  public activate(params: any) {
    if (!params) {
      throw new Error('You must provide params when opening prompt-text-dialog');
    }
    this.required = params.required === true ? true : false;
    this.title = params.title ? params.title : 'Enter a value';
    this.text = params.text ? params.text : '';
    this.yesType = ['outline', 'text'].includes(params.yesType) ? params.yesType : 'raised';
    this.noType = ['outline', 'text'].includes(params.noType) ? params.noType : 'raised';
  }

  public async canDeactivate(result: UxModalServiceResult) {
    if (result.wasCancelled) {
      return true;
    }
    if (this.required && result.output === undefined) {
      errorify(new Error('You must enter a value'));
      return false;
    }
    return true;
  }

}
