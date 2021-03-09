import { DomHelpers } from './../helpers/dom';
import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
export class CountriesDialog {

  private prefix: string = '';
  private country: string;
  private countries: Array<string> = [];
  private activated: boolean = false;
  private dialogContentElement: HTMLElement;
  public cancelButtonType: string = 'text';
  public okButtonType: string = 'text';

  public static CancelButtonType: 'text' | 'raised' | 'flat' | 'outline' | 'none' = 'text';
  public static OkButtonType: 'text' | 'raised' | 'flat' | 'outline' | 'none' = 'raised';

  constructor(private controller: DialogController) {
    console.log('constructor');
  }

  public activate(options?: CountriesDialogOptions) {
    console.log('activate');
    if (options && options.countries) this.countries = options.countries;
    if (options && options.country) this.selectCountry(options.country);
    if (options && options.prefix) this.prefix = options.prefix;
    this.activated = true;
    this.setButtons();
  }

  public setButtons() {
    this.cancelButtonType = CountriesDialog.CancelButtonType;
    this.okButtonType = CountriesDialog.OkButtonType;
  }
  
  public attached() {
    console.log('attached');
    this.centerSelectedLocale();
  }

  public centerSelectedLocale() {
    console.log('centerSelectedLocale');
    if (this.dialogContentElement) {
      // find the current locale line
      let index = this.countries.indexOf(this.country);
      if (index !== -1) {
        const item = this.dialogContentElement.querySelectorAll('ux-list-item').item(index);
        if (item && item instanceof HTMLElement) {
          let top = item.offsetTop - (this.dialogContentElement.offsetHeight / 2);
          DomHelpers.scrollToX(this.dialogContentElement, this.dialogContentElement.scrollTop, top, 0, 1 / 250, 20, DomHelpers.easeOutCuaic);
        }
      }
    }
  }

  public selectCountry(country: string) {
    console.log('selectContry');
    if (this.countries.indexOf(country) !== -1) {
      this.country = country;
    }
    if (this.activated) {
      this.controller.close(true, this.country);
    }
  }

  public dismiss() {
    this.controller.cancel();
  }
}

export interface CountriesDialogOptions {
  country?: string;
  countries?: Array<string>;
  prefix?: string;
}
