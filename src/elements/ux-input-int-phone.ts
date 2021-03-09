import { inject, observable, bindable, bindingMode, computedFrom} from 'aurelia-framework';
import { getLogger, Logger } from 'aurelia-logging';
import countries from '../helpers/countries';
import PhoneNumber from 'awesome-phonenumber';
//import { DOM } from 'aurelia-pal';

@inject(Element)
export class UxInputIntPhone {

  @bindable({defaultBindingMode: bindingMode.twoWay}) public value: string;
  @bindable({defaultBindingMode: bindingMode.twoWay}) public national: string;
  @bindable({defaultBindingMode: bindingMode.twoWay}) public international: string;
  @bindable({defaultBindingMode: bindingMode.fromView}) public isValid: boolean;
  @bindable({defaultBindingMode: bindingMode.fromView}) public isMobile: boolean;
  @bindable({defaultBindingMode: bindingMode.fromView}) public isPossible: boolean;
  @bindable public disabled: boolean = false;
  @bindable public label: any;
  @bindable private countriesFilter: Array<string> | null = null;
  @bindable public autocomplete: string;

  private log: Logger;
  //private countries = countries;
  @bindable public uxInputTheme: any = {};
  @bindable public uxSelectTheme: any = {};

  private countrySelect: HTMLSelectElement;

  @bindable({defaultBindingMode: bindingMode.fromView}) public inputValue = '';
  
  constructor(private element: Element) {
    this.log = getLogger('comp:ux-input-int-phone');
  }

  @computedFrom('countriesFilter') 
  get countries() { 
    if (!this.countriesFilter) return countries;
    return countries.filter(i => this.countriesFilter.indexOf(i.countryCode2) !== -1);
  }

  attached() {
    setTimeout(() => {
      let inputEl = this.element.querySelector('input');
      if (inputEl instanceof HTMLInputElement) {
        // type="tel" pattern="[0-9]*" novalidate
        inputEl.setAttribute('type', 'tel');
        inputEl.setAttribute('pattern', '[0-9 ]*');
        inputEl.setAttribute('novalidate', 'novalidate');
        this.countryCode = 'CH';
      }
    }, 50);
  }

  //clickExemple(event) {
  //  event.stopPropagation();
  //  let event = DOM.createCustomEvent('click-item', {detail: this.element});
  //  this.element.dispatchEvent(event);
  //}

  @observable private countryCode: string = 'ch';
  private countryPrefix: string = '+41';
  private phonePlaceholder: string = '079 000 00 00';
  getCountryPrefix(countryCode: string) {
    return '+' + PhoneNumber.getCountryCodeForRegionCode(countryCode).toString();
  }

  countryCodeChanged() {
    this.countryPrefix = this.getCountryPrefix(this.countryCode);
    this.phonePlaceholder = PhoneNumber.getExample( this.countryCode, 'mobile' ).getNumber( 'national' );
    let number = new PhoneNumber( this.inputValue || '', this.countryCode );
    if (!number.isValid()) {
      this.inputValue = '';
    }
  }

  openCountrySelector(event) {
    event.stopPropagation();
    //if (document.activeElement instanceof HTMLInputElement) document.activeElement.blur();
    //this.countrySelector.focus();
    this.countrySelect.focus();
  }

  preventInternalValueUpdate = false;
  inputValueChanged() {
    if (this.inputValue === undefined || this.inputValue === null) {
      this.isValid = this.isPossible = this.isMobile = false;
      this.national = this.international = this.value = '';
      return;
    }
    let iv = this.inputValue.toString();
    let number = new PhoneNumber( iv, this.countryCode );
    this.isValid = number.isValid();
    this.isPossible = number.isPossible();
    this.isMobile = number.isMobile();
    this.preventInternalValueUpdate = true;
    this.national = number.getNumber('national');
    this.value = this.international = number.getNumber();
    this.preventInternalValueUpdate = false;

    let ayt = PhoneNumber.getAsYouType( this.countryCode );
    ayt.reset(this.inputValue.replace(/[^+0-9]/g, ''));
    let newNumber = ayt.number();
    if (newNumber !== this.inputValue) this.inputValue = newNumber;
  }


  nationalChanged() {
    if (this.preventInternalValueUpdate) return;
    let number = new PhoneNumber( this.national, this.countryCode );
    this.inputValue = number.getNumber('national');
  }

  internationalChanged() {
    if (this.preventInternalValueUpdate) return;
    let number = new PhoneNumber( this.international, this.countryCode );
    this.inputValue = number.getNumber('national');
  }

  valueChanged() {
    if (this.preventInternalValueUpdate) return;
    let number = new PhoneNumber( this.value || '', this.countryCode );
    this.inputValue = number.getNumber('national');
  }
}
