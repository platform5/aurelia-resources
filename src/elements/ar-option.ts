import { bindable } from 'aurelia-framework';

export class ArOption {
  @bindable value: any;
  @bindable label: string = '';
  @bindable checked: boolean = false;

  valueChanged() {

  }

  labelChanged() {

  }

  get computedLabel(): string {
    if (this.label) return this.label;
    if (this.value && typeof this.value === 'string') return this.value;
    if (this.value && this.value.toString) return this.value.toString();
    return '';
  }
}
