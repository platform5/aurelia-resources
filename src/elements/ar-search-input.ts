import { inject, bindable, PLATFORM, bindingMode } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArSearchInputTheme } from './ar-search-input-theme';
import { DOM } from 'aurelia-pal';
import { observable } from 'aurelia-binding';

@inject(Element, StyleEngine)
@customElement('ar-search-input')
export class ArSearchInput implements UxComponent {

  @bindable public autofocus = null;
  @bindable public theme: ArSearchInputTheme;
  @bindable public placeholder: string;
  @bindable({defaultBindingMode: bindingMode.twoWay}) public value: string;

  @observable public rawValue: string = '';
  @observable public focused: boolean = false;
  public inputbox: HTMLInputElement;

  private ignoreRawChanges: boolean;

  constructor(private element: HTMLElement, public styleEngine: StyleEngine) {
    Object.setPrototypeOf(element, arSearchInputElementProto);
  }

  public attached() {
    this.inputbox.addEventListener('change', stopEvent);
    this.inputbox.addEventListener('input', stopEvent);
  }

  public detached() {
    if (this.inputbox) this.inputbox.removeEventListener('change', stopEvent);
    if (this.inputbox) this.inputbox.removeEventListener('input', stopEvent);
  }

  public bind() {
    if (this.autofocus || this.autofocus === '') {
      this.focused = true;
    }


    this.themeChanged(this.theme);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'ar-search-input';
    }
    this.styleEngine.applyTheme(newValue, this.element);
  }

  public focusedChanged(focused: boolean) {
    this.element.dispatchEvent(DOM.createCustomEvent(focused ? 'focus' : 'blur', { bubbles: false }));
  }

  public getValue() {
    return this.value;
  }

  public setValue(value: any) {
    const oldValue = this.value;
    const newValue = this.processRawValue(value);

    if (oldValue !== newValue) {
      this.value = newValue;
      this.ignoreRawChanges = true;
      this.rawValue = newValue === null || newValue === undefined ? '' : newValue.toString();
      this.ignoreRawChanges = false;
      this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
    }
  }

  private processRawValue(rawValue: string): any {
    let newValue: any = rawValue;
    return newValue;
  }

  public rawValueChanged(newValue: string) {
    if (this.ignoreRawChanges) {
      return;
    }
    this.setValue(newValue);
  }

  public focus() {
    this.inputbox.focus();
  }
}

function stopEvent(e: Event) {
  e.stopPropagation();
}

const getVm = <T>(_: any) => _.au.controller.viewModel as T;
const arSearchInputElementProto = Object.create(HTMLElement.prototype, {
  value: {
    get() {
      return getVm<ArSearchInput>(this).getValue();
    },
    set(value: any) {
      getVm<ArSearchInput>(this).setValue(value);
    }
  }
});
