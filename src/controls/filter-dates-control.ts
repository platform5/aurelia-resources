import { customElement, bindable, useView } from 'aurelia-templating';
import { DOM, PLATFORM } from 'aurelia-pal';
import { observable, computedFrom, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { UxModalService } from '@aurelia-ux/modal';
import { UxDatepicker } from '@aurelia-ux/datepicker';
import moment from 'moment';

interface UxInputElement extends HTMLElement {
  value: any;
}

@inject(Element, UxModalService)
@customElement('filter-dates-control')
@useView(PLATFORM.moduleName('./filter-dates-control.html'))
export class FilterDatesControl {

  @bindable public disabled: any = false;
  @bindable public readonly: any = false;
  @bindable({defaultBindingMode: bindingMode.twoWay, changeHandler: 'valueChanged'}) public from: Date | undefined;
  @bindable({defaultBindingMode: bindingMode.twoWay, changeHandler: 'valueChanged'}) public to: Date | undefined;
  @bindable public format = 'DD-MM-YYYY';
  @bindable autoSetSiblingIfEmpty: boolean = true;

  public datepickerControlFrom: HTMLElement;
  public datepickerControlTo: HTMLElement;

  constructor(public element: UxInputElement, public modalService: UxModalService) {
    // defineFilterDatesControlElementApis(element);
  }

  // public getValue() {
  //   return this.value;
  // }

  // public setValue(value: any) {
  //   if (value === undefined || value === null || !moment(value).isValid()) {
  //     this.value = undefined;
  //   } else {
  //     this.value = value;
  //   }
  // }

  private isValid(value: Date | undefined) {
    return value === undefined || (value && moment(value).isValid());
  }

  public valueChanged(newValue: any) {
    if (this.from && !this.isValid(this.from)) {
      this.from = undefined;
      return; // will come back due to valueChanged
    }
    if (this.to && !this.isValid(this.to)) {
      this.to = undefined;
      return; // will come back due to valueChanged
    }
    if (this.from && !this.to && newValue && this.autoSetSiblingIfEmpty) {
      this.to = moment(this.from).toDate(); // clone
      return; // will come back due to valueChanged
    }
    if (this.to && !this.from && newValue && this.autoSetSiblingIfEmpty) {
      this.from = moment(this.to).toDate(); // clone
      return; // will come back due to valueChanged
    }
    this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
    this.element.dispatchEvent(DOM.createCustomEvent('input', { bubbles: true }));
  }

  public async selectFrom() {
    try {
      const vm: UxDatepicker = (this.datepickerControlFrom as any).au.controller.viewModel;
      vm.toggleDialog('month');
    } catch (error) {
      // do nothing
    }
  }

  public async selectTo() {
    console.log('selectTo', this.datepickerControlTo);
    try {
      const vm: UxDatepicker = (this.datepickerControlTo as any).au.controller.viewModel;
      vm.toggleDialog('month');
    } catch (error) {
      // do nothing
    }
  }
}

// const getVm = <T>(_: any) => _.au.controller.viewModel as T;
// const defineFilterDatesControlElementApis = (element: HTMLElement) => {
//   Object.defineProperties(element, {
//     value: {
//       get() {
//         return getVm<FilterDatesControl>(this).getValue();
//       },
//       set(value: any) {
//         getVm<FilterDatesControl>(this).setValue(value);
//       },
//       configurable: true
//     }
//   });
// };
