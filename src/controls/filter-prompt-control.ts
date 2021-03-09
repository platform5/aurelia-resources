import { customElement, bindable, useView } from 'aurelia-templating';
import { DOM, PLATFORM } from 'aurelia-pal';
import { observable, computedFrom, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { UxModalService } from '@aurelia-ux/modal';
import { PromptTextDialog } from '../dialogs/prompt-text-dialog';

interface UxInputElement extends HTMLElement {
  value: any;
}

@inject(Element, UxModalService)
@customElement('filter-prompt-control')
@useView(PLATFORM.moduleName('./filter-prompt-control.html'))
export class FilterPromptControl {

  @bindable public disabled: any = false;
  @bindable public readonly: any = false;
  @bindable({defaultBindingMode: bindingMode.twoWay}) public value: string[];
  @bindable public promptTitle: string = 'Add filter value';
  @bindable public promptText: string = '';
  @bindable public promptLabel: string = 'Filter value';
  @bindable public promptPlaceholder: string = '';

  @observable
  public focused: boolean = false;

  constructor(public element: UxInputElement, public modalService: UxModalService) {
    defineFilterPromptControlElementApis(element);
  }

  public getValue() {
    return this.value;
  }

  public setValue(value: any) {
    if (value === undefined || value === null || !Array.isArray(value)) {
      this.value = [];
    } else {
      this.value = value;
    }
  }

  public valueChanged() {
    if (!Array.isArray(this.value)) {
      this.value = [];
    }
    this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
    this.element.dispatchEvent(DOM.createCustomEvent('input', { bubbles: true }));
  }

  @computedFrom('value')
  public get hasValue(): boolean {
    return this.value && Array.isArray(this.value) && this.value.length > 0;
  }

  public async focus() {
    const dialog = await this.modalService.open({
      viewModel: PromptTextDialog,
      model: {required: true, title: this.promptTitle, text: this.promptText, label: this.promptLabel, placeholder: this.promptPlaceholder}
    });
    const result = await dialog.whenClosed();
    if (!result.wasCancelled && result.output) {
      this.addValue(result.output);
    }
  }

  public addValue(value: string) {
    if (!Array.isArray(this.value)) {
      this.value = [];
    }
    if (this.value.indexOf(value) !== -1) {
      return;
    }
    this.value.push(value);
    this.valueChanged();
  }

  public removeValue(value: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (!Array.isArray(this.value)) {
      this.value = [];
    }
    const index = this.value.indexOf(value);
    if (index !== -1) {
      this.value.splice(index, 1);
      this.valueChanged();
    }
  }
}

const getVm = <T>(_: any) => _.au.controller.viewModel as T;
const defineFilterPromptControlElementApis = (element: HTMLElement) => {
  Object.defineProperties(element, {
    value: {
      get() {
        return getVm<FilterPromptControl>(this).getValue();
      },
      set(value: any) {
        getVm<FilterPromptControl>(this).setValue(value);
      },
      configurable: true
    }
  });
};
