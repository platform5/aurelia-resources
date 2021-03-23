import { customElement, bindable, useView } from 'aurelia-templating';
import { DOM, PLATFORM } from 'aurelia-pal';
import { observable, computedFrom, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { UxModalService } from '@aurelia-ux/modal';

interface UxInputElement extends HTMLElement {
  value: any;
}

@inject(Element, UxModalService)
@customElement('filter-chips-control')
@useView(PLATFORM.moduleName('./filter-chips-control.html'))
export class FilterChipsControl {

  @bindable public disabled: any = false;
  @bindable public readonly: any = false;
  @bindable public multiple: any = false;
  @bindable public options: Array<any> = [];
  @bindable({defaultBindingMode: bindingMode.twoWay}) public value: any;
  @bindable public labelKey: string = '';
  @bindable public valueKey: string = '';

  @observable
  public focused: boolean = false;

  constructor(public element: UxInputElement, public modalService: UxModalService) {
    defineFilterChipsControlElementApis(element);
  }

  public getValue() {
    return this.value;
  }

  public setValue(value: any) {
    if (value === undefined) {
      this.value = undefined;
    } else {
      this.value = value;
    }
  }

  public valueChanged(newValue?: any, oldValue?: any) {
    this.fixValue();
    if (!newValue || !oldValue || JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
      this.element.dispatchEvent(DOM.createCustomEvent('input', { bubbles: true }));
    }
  }

  private fixValue() {
    if (this.multiple && !Array.isArray(this.value)) {
      this.value = [];
    } else if (!this.multiple && Array.isArray(this.value)) {
      this.value = undefined;
    }
  }

  @computedFrom('value')
  public get hasValue(): boolean {
    return this.multiple ? this.value.length > 0 : this.value !== undefined;
  }

  public toggle(value: any) {
    if (this.multiple) {
      if (!Array.isArray(value)) {
        this.fixValue();
      }
      const index = this.value.indexOf(value);
      if (index === -1) {
        this.value.push(value);
      } else {
        this.value.splice(index, 1);
      }
    } else {
      if (Array.isArray(value)) {
        this.fixValue();
      }
      if (this.value === value) {
        this.value = undefined;
      } else {
        this.value = value;
      }
    }
  }

  public isSelected(v: any): boolean {
    if (this.multiple) {
      if (!Array.isArray(this.value)) {
        this.fixValue();
      }
      const index = this.value.indexOf(v);
      return index !== -1;
    } else {
      if (Array.isArray(this.value)) {
        this.fixValue();
      }
      return this.value === v;
    }
  }
}


const getVm = <T>(_: any) => _.au.controller.viewModel as T;
const defineFilterChipsControlElementApis = (element: HTMLElement) => {
  Object.defineProperties(element, {
    value: {
      get() {
        return getVm<FilterChipsControl>(this).getValue();
      },
      set(value: any) {
        getVm<FilterChipsControl>(this).setValue(value);
      },
      configurable: true
    }
  });
};
