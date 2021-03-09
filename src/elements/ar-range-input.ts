import * as multirange from 'multirange';
// https://www.w3schools.com/howto/howto_js_rangeslider.asp
import { customElement, bindable } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { observable, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArRangeInputTheme } from './ar-range-input-theme';
import { getLogger } from 'aurelia-logging';

const log = getLogger('ar-range-input');

@inject(Element, StyleEngine)
@customElement('ar-range-input')
export class ArRangeInput implements UxComponent {

  @bindable public theme: ArRangeInputTheme;
  @bindable public type: string = 'circle'; // circle, square, progress
  @bindable({defaultBindingMode: bindingMode.twoWay}) public value: number = 0;
  @bindable public min: number = 0;
  @bindable public max: number = 100;
  @bindable public step: number = 1;
  @bindable public multiple: boolean = false;
  @bindable({defaultBindingMode: bindingMode.twoWay}) low: number | null = null;
  @bindable({defaultBindingMode: bindingMode.twoWay}) high: number | null = null;

  @observable private rawValue: string;

  private handleResize: EventListener;
  private rawValueUpdating: boolean = false;
  public progress: number;

  constructor(public element: HTMLElement, public styleEngine: StyleEngine) {
    this.handleResize = e => {
    };
  }

  public bind() {
    const element = this.element;
    this.valueChanged();
    this.themeChanged(this.theme);
  }

  public attached() {
    this.handleResize(null);
    window.addEventListener('resize', this.handleResize);
    this.setMultirange();
  }

  public multipleChanged() {
    this.setMultirange();
  }

  public setMultirange() {
    // if (!(window as any).multirange) {
    //   throw new Error('Missing multirange in globals');
    // }
    let input = this.element.getElementsByTagName('INPUT');
    if (!input[0]) return;

    if (this.multiple) {
      input[0].setAttribute('multiple', 'multiple');
      this.rawValue = `${this.low.toString()},${this.high.toString()}`;
      (input[0] as any).setAttribute('value', this.rawValue);
      multirange(input[0]);
    } else {
      input[0].removeAttribute('multiple');
    }
    this.listenToInputChange();
  }

  public listenToInputChange() {
    if (!this.multiple) return;
    let inputs = this.element.getElementsByTagName('INPUT');
    let original: any = this.element.getElementsByClassName('original');
    if (original[0]) original = original[0];
    else return;
    for (let index = 0; index < inputs.length; index++) {
      let input = inputs.item(index);
      if (input.classList.contains('__l')) continue;
      input.addEventListener('input', () => {
        this.low = original.valueLow;
        this.high = original.valueHigh;
      });
      input.classList.add('__l');
    }
  }

  public detached() {
    window.removeEventListener('resize', this.handleResize);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'ar-range-input';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public valueChanged() {
    if (!this.rawValueUpdating) this.rawValue = this.value.toString();
    let diff = this.max - this.min;
    let pos = this.value - this.min;
    this.progress = pos / diff * 100;
    let event = DOM.createCustomEvent('change', {bubbles: true, detail: this.progress});
    this.element.dispatchEvent(event);
  }

  rawValueChanged() {
    this.rawValueUpdating = true;
    this.value = parseFloat(this.rawValue);
    this.rawValueUpdating = false;
  }

}

function stopEvent(e: Event) {
  e.stopPropagation();
}
