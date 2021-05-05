import { customElement, bindable, useView } from 'aurelia-templating';
import { DOM, PLATFORM } from 'aurelia-pal';
import { observable, computedFrom, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { UxModalService } from '@aurelia-ux/modal';
import { PromptSelectDialog } from '../dialogs/prompt-select-dialog';

interface UxInputElement extends HTMLElement {
  value: any;
}

@inject(Element, UxModalService)
@customElement('filter-control')
@useView(PLATFORM.moduleName('./filter-control.html'))
export class FilterControl {

  @bindable public disabled: any = false;
  @bindable public readonly: any = false;
  @bindable public label: string;
  @bindable public multiple: any = false;
  @bindable public options: Array<any> = [];
  @bindable({defaultBindingMode: bindingMode.twoWay}) public value: any;
  @bindable public labelKey: string = '';
  @bindable public secondaryKey: string = '';
  @bindable public valueKey: string = '';
  @bindable public icon: string = '';
  @bindable public showSearch: 'auto' | boolean = 'auto';

  @observable
  public focused: boolean = false;
  public ready = true; // this property can be toggle by children classes in order to load data from DB (for displayed values) and tell the component when data is ready

  constructor(public element: UxInputElement, public modalService: UxModalService) {
    defineFilterControlElementApis(element);
  }

  public bind() {
    this.serializedCurrentValue = this.value ? this.value.toString() : '';
  }

  public blur() {
  }

  public getValue() {
    return this.value;
  }

  public setValue(value: any) {
    if (this.multiple) {
      if (typeof value === 'string') {
        value = value.split(',');
      } else if (!Array.isArray(value)) {
        value = [value];
      }
    }
    value = this.validateValueAgainsAvailableOptions(value);
    this.value = value;
  }

  public validateValueAgainsAvailableOptions(originalValue: any): any {
    let validatedValue: any;
    const options = this.options.map(o => this.computeValue(o));
    if (this.multiple) {
      if (Array.isArray(originalValue)) {
        const value: Array<any> = [];
        for (const val of originalValue) {
          const computedVal = this.computeValue(val);
          if (options.includes(val)) {
            value.push(val);
          } else if (options.includes(computedVal)) {
            value.push(computedVal);
          }
        }
        validatedValue = value;
      }
    } else {
      const computedVal = this.computeValue(originalValue);
      if (options.includes(originalValue)) {
        validatedValue = originalValue;
      } else if (options.includes(computedVal)) {
        validatedValue = computedVal;
      } else {
        validatedValue = undefined;
      }
    }
    return validatedValue;
  }

  public computeValueLabel(value: any) {
    const option = this.options.find(o => {
      const optionValue = this.computeValue(o);
      return optionValue === value;
    });
    if (!option) {
      return '';
    }
    return this.computeLabel(option);
  }

  public computeLabel(option: any): string {
    if (typeof option === 'object' && this.labelKey) {
      return option[this.labelKey] || '';
    }
    return option || '';
  }

  public computeSecondary(option: any): string {
    if (typeof option === 'object' && this.secondaryKey) {
      return option[this.secondaryKey] || '';
    }
    return option || '';
  }

  public computeValue(option: any): any {
    if (typeof option === 'object' && this.valueKey) {
      return option[this.valueKey];
    }
    return option;
  }

  public focusedChanged(focused: boolean) {
    this.element.classList.toggle('filter-control--focused', focused);

    this.element.dispatchEvent(DOM.createCustomEvent(focused ? 'focus' : 'blur', { bubbles: false }));
  }

  private serializedCurrentValue: any;
  public valueChanged() {
    try {
      if (this.value.toString() === this.serializedCurrentValue) {
        return;
      }
    } catch (error) {
      // do nothing
    }
    this.serializedCurrentValue = this.value ? this.value.toString() : '';
    this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
    this.element.dispatchEvent(DOM.createCustomEvent('input', { bubbles: true }));
  }

  public async focus(): Promise<void> {
    const modal = await this.modalService.open({
      viewModel: PromptSelectDialog,
      model: {
        options: this.options,
        labelKey: this.labelKey,
        secondaryKey: this.secondaryKey,
        valueKey: this.valueKey,
        mode: this.multiple ? 'multiple' : 'single',
        value: this.value,
        icon: this.icon,
        autoClose: true,
        showSearch: this.showSearch
      }
    });
    const result = await modal.whenClosed();
    if (!result.wasCancelled) {
      this.setValue(result.output);
    }
  }

  @computedFrom('value', 'value.length', 'multiple', 'options.length', 'labelKey', 'valueKey')
  public get hasValue(): boolean {
    if (this.multiple && Array.isArray(this.value) && this.value.length) {
      return true;
    } else if (!this.multiple && this.value) {
      return true;
    }
    return false;
  }
}

const getVm = <T>(_: any) => _.au.controller.viewModel as T;
const defineFilterControlElementApis = (element: HTMLElement) => {
  Object.defineProperties(element, {
    value: {
      get() {
        return getVm<FilterControl>(this).getValue();
      },
      set(value: any) {
        getVm<FilterControl>(this).setValue(value);
      },
      configurable: true
    },
    focus: {
      value() {
        getVm<FilterControl>(this).focus();
      },
      configurable: true
    },
    blur: {
      value() {
        getVm<FilterControl>(this).blur();
      },
      configurable: true
    }
  });
};
