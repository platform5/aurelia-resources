import { DomHelpers } from './../helpers/dom';
import { locales } from './../helpers/locales';
import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
export class LocalesDialog {

  private locale: string;
  private locales: Array<string> = [];
  private activated: boolean = false;
  private dialogContentElement: HTMLElement;
  public cancelButtonType: string = 'text';
  public okButtonType: string = 'text';

  public static CancelButtonType: 'text' | 'raised' | 'flat' | 'outline' | 'none' = 'text';
  public static OkButtonType: 'text' | 'raised' | 'flat' | 'outline' | 'none' = 'raised';

  constructor(private controller: DialogController) {

  }

  public activate(options?: LocalesDialogOptions) {
    if (options && options.locales) this.locales = options.locales;
    if (options && options.locale) this.selectLocale(options.locale);
    this.activated = true;
    this.setButtons();
  }

  public setButtons() {
    this.cancelButtonType = LocalesDialog.CancelButtonType;
    this.okButtonType = LocalesDialog.OkButtonType;
  }
  
  public attached() {
    this.centerSelectedLocale();
  }

  public centerSelectedLocale() {
    if (this.dialogContentElement) {
      // find the current locale line
      let index = this.locales.indexOf(this.locale);
      if (index !== -1) {
        const item = this.dialogContentElement.querySelectorAll('ux-list-item').item(index);
        if (item && item instanceof HTMLElement) {
          let top = item.offsetTop - (this.dialogContentElement.offsetHeight / 2);
          DomHelpers.scrollToX(this.dialogContentElement, this.dialogContentElement.scrollTop, top, 0, 1 / 250, 20, DomHelpers.easeOutCuaic);
        }
      }
    }
  }

  public selectLocale(locale: string) {
    if (this.locales.indexOf(locale) !== -1) {
      this.locale = locale;
    }
    if (this.activated) {
      this.controller.close(true, this.locale);
    }
  }

  public dismiss() {
    this.controller.cancel();
  }
}

export interface LocalesDialogOptions {
  locale?: string;
  locales?: Array<string>;
}
