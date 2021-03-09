import { customElement, bindable, useView } from 'aurelia-templating';
import { DOM, PLATFORM } from 'aurelia-pal';
import { observable, computedFrom, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { UxModalService } from '@aurelia-ux/modal';

interface UxInputElement extends HTMLElement {
  value: any;
}

@inject(Element, UxModalService)
@customElement('filter-boolean-control')
@useView(PLATFORM.moduleName('./filter-boolean-control.html'))
export class FilterBooleanControl {

  @bindable public disabled: any = false;
  @bindable public readonly: any = false;
  @bindable({defaultBindingMode: bindingMode.twoWay}) public value: boolean | undefined;
  @bindable public labelType: 'true' | 'active' | 'yes' | 'on' | 'custom' = 'true';
  @bindable public labelYes: '';
  @bindable public labelNo: '';

  @observable
  public focused: boolean = false;

  constructor(public element: UxInputElement, public modalService: UxModalService) {
    defineFilterBooleanControlElementApis(element);
  }

  public getValue() {
    return this.value;
  }

  public setValue(value: any) {
    if (value === undefined) {
      this.value = undefined;
    } else {
      this.value = value === true || (typeof value === 'string' && value !== '');
    }
  }

  public valueChanged() {
    if (typeof this.value !== 'boolean' && this.value !== undefined) {
      this.setValue(this.value);
      return;
    }
    this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
    this.element.dispatchEvent(DOM.createCustomEvent('input', { bubbles: true }));
  }

  @computedFrom('value')
  public get hasValue(): boolean {
    return this.value !== undefined;
  }

  public click(value: boolean) {
    if (this.value === value) {
      this.value = undefined;
    } else {
      this.value = value;
    }
  }
}

const getVm = <T>(_: any) => _.au.controller.viewModel as T;
const defineFilterBooleanControlElementApis = (element: HTMLElement) => {
  Object.defineProperties(element, {
    value: {
      get() {
        return getVm<FilterBooleanControl>(this).getValue();
      },
      set(value: any) {
        getVm<FilterBooleanControl>(this).setValue(value);
      },
      configurable: true
    }
  });
};
