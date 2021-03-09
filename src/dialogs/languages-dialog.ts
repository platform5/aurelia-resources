import { DomHelpers } from './../helpers/dom';
import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
export class LanguagesDialog {

  private prefix: string = '';
  public language: string;
  public languages: Array<string> = [];

  private activated: boolean = false;
  private dialogContentElement: HTMLElement;
  public cancelButtonType: string = 'text';
  public okButtonType: string = 'text';

  public static CancelButtonType: 'text' | 'raised' | 'flat' | 'outline' | 'none' = 'text';
  public static OkButtonType: 'text' | 'raised' | 'flat' | 'outline' | 'none' = 'raised';

  constructor(private controller: DialogController) {

  }

  public activate(options?: LanguagesDialogOptions) {
    if (options && options.languages) this.languages = options.languages;
    if (options && options.language) this.selectLanguage(options.language);
    if (options && options.prefix) this.prefix = options.prefix;
    this.activated = true;
    this.setButtons();
  }

  public setButtons() {
    this.cancelButtonType = LanguagesDialog.CancelButtonType;
    this.okButtonType = LanguagesDialog.OkButtonType;
  }
  
  public attached() {
    this.centerSelectedLocale();
  }

  public centerSelectedLocale() {
    if (this.dialogContentElement) {
      // find the current locale line
      let index = this.languages.indexOf(this.language);
      if (index !== -1) {
        const item = this.dialogContentElement.querySelectorAll('ux-list-item').item(index);
        if (item && item instanceof HTMLElement) {
          let top = item.offsetTop - (this.dialogContentElement.offsetHeight / 2);
          DomHelpers.scrollToX(this.dialogContentElement, this.dialogContentElement.scrollTop, top, 0, 1 / 250, 20, DomHelpers.easeOutCuaic);
        }
      }
    }
  }

  public selectLanguage(language: string) {
    if (this.languages.indexOf(language) !== -1) {
      this.language = language;
    }
    if (this.activated) {
      this.controller.close(true, this.language);
    }
  }

  public dismiss() {
    this.controller.cancel();
  }
}

export interface LanguagesDialogOptions {
  language?: string;
  languages?: Array<string>;
  prefix?: string;
}
