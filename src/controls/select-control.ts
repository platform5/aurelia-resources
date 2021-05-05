import { customElement, bindable, useView } from 'aurelia-templating';
import { DOM, PLATFORM } from 'aurelia-pal';
import { observable, computedFrom, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxInputComponent, normalizeBooleanAttribute, getBackgroundColorThroughParents, InputVariant } from '@aurelia-ux/core';
import { SelectControlTheme } from './select-control-theme';
import { SelectControlDefaultConfiguration } from './select-control-default-configuration';
import { UxModalService } from '@aurelia-ux/modal';

// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component.css';
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component--outline.css';
import { PromptSelectDialog } from '../dialogs/prompt-select-dialog';

interface UxInputElement extends HTMLElement {
  value: any;
}

@inject(Element, StyleEngine, UxModalService, SelectControlDefaultConfiguration)
@customElement('select-control')
@useView(PLATFORM.moduleName('./select-control.html'))

export class SelectControl implements UxInputComponent {

  @bindable public disabled: any = false;
  @bindable public readonly: any = false;
  @bindable public theme: SelectControlTheme;
  @bindable public label: string;
  @bindable public placeholder: string;
  @bindable public type: 'chips' | 'modal' | 'dropdown' = 'modal';
  @bindable public variant: InputVariant = 'filled';
  @bindable public dense: any = false;
  @bindable public multiple: any = false;
  @bindable public options: Array<any> = [];
  @bindable({defaultBindingMode: bindingMode.twoWay}) public value: any;
  @bindable public labelKey: string = '';
  @bindable public valueKey: string = '';
  @bindable public icon: string = '';
  @bindable public showSearch: 'auto' | boolean = 'auto';

  @observable
  public focused: boolean = false;

  public valuebox: HTMLSpanElement;

  constructor(private element: UxInputElement, public styleEngine: StyleEngine, public modalService: UxModalService, defaultConfiguration: SelectControlDefaultConfiguration) {
    defineSelectControlElementApis(element);
    if (defaultConfiguration.theme !== undefined) {
      this.theme = defaultConfiguration.theme;
    }
    if (defaultConfiguration.dense !== undefined) {
      this.dense = defaultConfiguration.dense;
    }
    if (defaultConfiguration.variant !== undefined) {
      this.variant = defaultConfiguration.variant;
    }
  }

  public bind() {
    this.denseChanged();
    this.multipleChanged();
    this.themeChanged(this.theme);
    this.serializedCurrentValue = this.value ? this.value.toString() : '';
  }
  
  public denseChanged() {
    this.dense = normalizeBooleanAttribute('dense', this.dense);
  }
  
  public multipleChanged() {
    this.multiple = normalizeBooleanAttribute('multiple', this.multiple);
  }

  public attached() {
    this.variantChanged(this.variant);
  }

  public detached() {
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

  public computeLabel(option: any): string {
    if (typeof option === 'object' && this.labelKey) {
      return option[this.labelKey] || '';
    }
    return option || '';
  }

  public computeValue(option: any): any {
    if (typeof option === 'object' && this.valueKey) {
      return option[this.valueKey];
    }
    return option;
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'input';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public focusedChanged(focused: boolean) {
    this.element.classList.toggle('ux-input-component--focused', focused);

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
    if (this.type === 'modal') {
      const modal = await this.modalService.open({
        viewModel: PromptSelectDialog,
        model: {
          options: this.options,
          labelKey: this.labelKey,
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
  }

  public blur(): void {

  }

  public variantChanged(newValue: string) {
    this.element.style.backgroundColor = newValue === 'outline' ?
      this.element.style.backgroundColor = getBackgroundColorThroughParents(this.element) :
      '';
  }

  @computedFrom('label')
  get placeholderMode(): boolean {
    return typeof this.label !== 'string' || this.label.length === 0;
  }

  @computedFrom('value.length', 'multiple', 'options.length', 'labelKey', 'valueKey')
  public get displayedValue(): string {
    const ifEmpty = this.placeholder || '';
    let result = ifEmpty;
    if (this.multiple && Array.isArray(this.value)) {
      const keyValues = this.options.reduce((previousValue, currentValue) => {
        previousValue[this.computeValue(currentValue)] = this.computeLabel(currentValue);
        return previousValue;
      }, {});
      const computedLabels: Array<string> = this.value.map(v => keyValues[v]);
      result = computedLabels.length > 0 ? computedLabels.join(', ') : ifEmpty;
    } else if (!this.multiple) {
      const keyValues = this.options.reduce((previousValue, currentValue) => {
        previousValue[this.computeValue(currentValue)] = this.computeLabel(currentValue);
        return previousValue;
      }, {});
      const value = keyValues[this.value];
      result = value || ifEmpty;
    }
    // we consider that the field hasValue if there is an actual value or if the field is displayed with chips
    // and even if no chips are selected, because they are displayed the label must be positionned as if there is a value
    // in the field
    const hasValue = (result && result.length > 0) || (this.type === 'chips' && this.options.length > 0);
    this.element.classList.toggle('ux-input-component--has-value', hasValue);
    return result;
  }
}

const getVm = <T>(_: any) => _.au.controller.viewModel as T;
const defineSelectControlElementApis = (element: HTMLElement) => {
  Object.defineProperties(element, {
    value: {
      get() {
        return getVm<SelectControl>(this).getValue();
      },
      set(value: any) {
        getVm<SelectControl>(this).setValue(value);
      },
      configurable: true
    },
    focus: {
      value() {
        getVm<SelectControl>(this).focus();
      },
      configurable: true
    },
    blur: {
      value() {
        getVm<SelectControl>(this).blur();
      },
      configurable: true
    }
  });
};
