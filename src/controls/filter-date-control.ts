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
@customElement('filter-date-control')
@useView(PLATFORM.moduleName('./filter-date-control.html'))
export class FilterDateControl {

  @bindable public disabled: any = false;
  @bindable public readonly: any = false;
  @bindable({defaultBindingMode: bindingMode.twoWay}) public value: Date | undefined;
  @bindable public format = 'DD-MM-YYYY';

  public datepickerControl: HTMLElement;

  constructor(public element: UxInputElement, public modalService: UxModalService) {
    defineFilterDateControlElementApis(element);
  }

  public getValue() {
    return this.value;
  }

  public setValue(value: any) {
    if (value === undefined || value === null || !moment(value).isValid()) {
      this.value = undefined;
    } else {
      this.value = value;
    }
  }

  public valueChanged() {
    if ((this.value && moment(this.value).isValid()) || this.value === undefined) {
      this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
      this.element.dispatchEvent(DOM.createCustomEvent('input', { bubbles: true }));
    }
  }

  @computedFrom('value')
  public get hasValue(): boolean {
    return this.value && moment(this.value).isValid();
  }

  public async focus() {
    console.log('focus', this.datepickerControl);
    try {
      const vm: UxDatepicker = (this.datepickerControl as any).au.controller.viewModel;
      vm.toggleDialog('month');
    } catch (error) {
      // do nothing
    }
  }
}

const getVm = <T>(_: any) => _.au.controller.viewModel as T;
const defineFilterDateControlElementApis = (element: HTMLElement) => {
  Object.defineProperties(element, {
    value: {
      get() {
        return getVm<FilterDateControl>(this).getValue();
      },
      set(value: any) {
        getVm<FilterDateControl>(this).setValue(value);
      },
      configurable: true
    }
  });
};
