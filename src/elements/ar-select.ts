import { DomHelpers } from './../helpers/dom';
import { customElement, bindable, children } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArSelectTheme } from './ar-select-theme';
import { getLogger, Logger } from 'aurelia-logging';
import { EventAggregator } from 'aurelia-event-aggregator';
import { bindingMode, computedFrom } from 'aurelia-framework';
import { ArOption } from './ar-option';
import { DOM } from 'aurelia-pal';
import * as removeAccents from 'remove-accents';
import { ArDialog, arDialog } from './ar-dialog';

@inject(Element, StyleEngine, EventAggregator)
@customElement('ar-select')
export class ArSelect implements UxComponent {

  @bindable public theme: ArSelectTheme;
  @bindable({defaultBindingMode: bindingMode.twoWay}) value: any | Array<any>;
  @bindable multiple: boolean = false;
  @bindable allowAny: boolean = false;
  @bindable displaySearch: 'auto' | 'hidden' | 'always' = 'auto'; 
  @bindable searchTrigger: number = 10;
  @bindable placeholder: string = 'Click to select a value';
  @bindable addExtraValueButtonText: string = 'Add Custom Value';
  @bindable wrap: boolean = true;
  @bindable disabled: boolean = false;
  
  @children('ar-option') private options: Array<ArOption> = [];
  private focused: boolean = false;

  private mapContainer: HTMLElement;
  private handleResize: EventListener;
  private mapHeight: number = 300;
  private log: Logger;

  private selectorContainer: HTMLElement;

  private originalValue: any | Array<any>; 
  private extraValues: Array<string> = [];

  private filter: string = '';

  private dialog: ArDialog;
  private dialogElement: HTMLElement;

  @bindable public compareValues: Function = (a: any, b: any) => {
    return a === b;
  };
  
  constructor(private element: HTMLElement, public styleEngine: StyleEngine, private eventAggregator: EventAggregator) {
    this.log = getLogger('ar-select');
  }

  public bind() {
    const element = this.element;
    this.themeChanged(this.theme);
    this.optionsChanged();
    this.valueChanged();
  }

  public attached() {
    setTimeout(() => {
      this.detectExtraValues();
    }, 250);
  }

  public detached() {

  }

  public zIndex: number = 10;
  public setZIndex()  {
    this.zIndex = ArDialog.zIndexRef + ArDialog.dialogLayers;
  }

  public moveToBodyTag() {
    document.getElementsByTagName('BODY')[0].appendChild(this.selectorContainer);
  }

  public removeFromBodyTag() {
    if (this.selectorContainer) document.getElementsByTagName('BODY')[0].removeChild(this.selectorContainer);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'ar-select';
    }
    this.styleEngine.applyTheme(newValue, this.element);
  }

  optionsChanged() {
    this.checkAppropriateOptions();
  }

  valueChanged() {
    if (this.multiple) {
      if (typeof this.value === 'string') this.value = (this.value as string).split(',');
      if (!Array.isArray(this.value)) {
        this.value = [];
      }
    }
    this.checkAppropriateOptions();
  }

  checkAppropriateOptions() {
    if (!this.options || !Array.isArray(this.options) || this.options.length === 0) return;
    for (let option of this.options) {
      if (this.multiple) {
        option.checked = false;
        for (let value of this.value) {
          if (this.compareValues(option.value, value)) {
            option.checked = true;
            break;
          }
        }
      } else {
        option.checked = this.compareValues(option.value, this.value);
      }
    }
  }

  focus() {
    if (this.disabled) {
      this.focused = false;
      return;
    }
    this.focused = true;
    this.detectExtraValues();
    this.dialog.open();
    if (this.multiple) {
      this.originalValue = this.value.map(i => i);
    } else {
      this.originalValue = this.value;
    }
    setTimeout(() => {
      if (this.extraValues && this.extraValues.length) this.scrollToTop();
      else this.autoScrollToFirstSelectedOption();
    }, 100)
  }

  detectExtraValues() {
    let extraValues: Array<string> = [];
    
    let valuesForDetection: Array<any> = (Array.isArray(this.value)) ? this.value : [this.value];

    for (let v of valuesForDetection) {
      let found = false;
      for (let option of this.options || []) {
        if (this.compareValues(option.value, v)) {
          found = true;
          break;
        }
      }
      if (found) continue;
      extraValues.push(v);      
    }

    this.extraValues = extraValues;

    if (!this.allowAny) {
      this.extraValues = [];
    }

  }

  closeSelector() {
    this.focused = false;
    this.dialog.close();
    this.filter = ''; 
  }

  toggleOption(option, event) {
    event.stopPropagation();
    let value = option.value;

    if (this.multiple) {
      let index = this.value.indexOf(value);
      if (index === -1) {
        this.value.push(value);
      } else {
        this.value.splice(index, 1);
      }
    } else {
      this.extraValues = [];
      if (this.value === value) this.value = null;
      else this.value = value;
      setTimeout(() => {
        this.closeSelector();
      }, 1);
    }
    
    this.valueChanged();
    let customEvent =  DOM.createCustomEvent('change', {bubbles: true, detail: this.value});
    this.element.dispatchEvent(customEvent);
  }

  scrollToTop() {
    if (!this.focused) return;
    let container = this.dialogElement.querySelector('ux-card-content');
    if (container instanceof HTMLElement) {
      DomHelpers.scrollToX(container, container.scrollTop, 0, 0, 1 / 250, 20, DomHelpers.easeOutCuaic);
    }
  }

  autoScrollToNewExtraValue() {
    if (!this.focused) return;
    if (!this.extraValues || this.extraValues.length === 0) return;
    let index = this.extraValues.length - 1;
    let element = this.dialogElement.querySelectorAll('ux-list-item.extra-value')[index];
    let container = this.dialogElement.querySelector('ux-card-content');
    if (element instanceof HTMLElement && container instanceof HTMLElement) {
      DomHelpers.scrollToX(container, container.scrollTop, element.offsetTop - 150, 0, 1 / 500, 20, DomHelpers.easeOutCuaic);
    }
  }

  autoScrollToFirstSelectedOption() {
    if (!this.focused) return;
    let index = 0;
    for (let option of this.options) {
      if (option.checked) {
        let element = this.dialogElement.querySelectorAll('ux-list-item.option')[index];
        let container = this.dialogElement.querySelector('ux-card-content');
        if (element instanceof HTMLElement && container instanceof HTMLElement) {
          DomHelpers.scrollToX(container, container.scrollTop, element.offsetTop - 150, 0, 1 / 250, 20, DomHelpers.easeOutCuaic);
        }
        return;
      }
      index++;
    }
  }

  cancel() {
    this.value = this.originalValue;
    this.closeSelector();
  }

  save() {
    this.closeSelector();
  }

  @computedFrom('options', 'options.length', 'value')
  get selectedOption(): ArOption {
    if (!this.options || !Array.isArray(this.options) || this.options.length === 0) return null;
    for (let option of this.options) {
      if (this.compareValues(option.value, this.value)) {
        return option;
      }
    }
    return null;
  }

  @computedFrom('options', 'options.length', 'value', 'value.length')
  get selectedOptions(): Array<ArOption> {
    let options: Array<ArOption> = [];
    if (!this.options || !Array.isArray(this.options) || this.options.length === 0) return options;
    if (!this.value || !Array.isArray(this.value)) return options;
    for (let option of this.options) {
      for (let value of this.value) {
        if (this.compareValues(option.value, value)) {
          options.push(option);
          break;
        }
      }
    }
    return options;
  }

  addExtraValue() {
    let vm = arDialog({type: 'prompt', 'title': this.addExtraValueButtonText});
    vm.whenClosed().then((result) => {
      if (!result.dismissed && result.value) {
        if (this.extraValues.indexOf(result.value) === -1) this.extraValues.push(result.value);
        if (this.multiple) {
          if (this.value.indexOf(result.value) === -1) this.value.push(result.value);
        } else {
          this.value = result.value;
        }
        this.valueChanged();
        setTimeout(() => {
          this.autoScrollToNewExtraValue();
        }, 100);
        let customEvent =  DOM.createCustomEvent('change', {bubbles: true, detail: this.value});
        this.element.dispatchEvent(customEvent);
      }
    });
  }

  removeExtraValue(extraValue: string) {
    let index2 = this.extraValues.indexOf(extraValue);
    if (index2 !== -1) this.extraValues.splice(index2, 1);
    if (this.multiple) {
      let index1 = this.value.indexOf(extraValue);
      if (index1 !== -1) this.value.splice(index1, 1);
    } else {
      this.value = null;
    }
    this.valueChanged();
    let customEvent =  DOM.createCustomEvent('change', {bubbles: true, detail: this.value});
    this.element.dispatchEvent(customEvent);
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

}


export class FilterOptionsValueConverter {
  toView (list: Array<ArOption>, filter: string = ''): Array<ArOption> {
    if (!filter) return list;
    let newList: Array<ArOption> = [];
    filter = removeAccents(filter.toLowerCase());
    for (let item of list) {
      let labelString = typeof item.label === 'string' ? removeAccents(item.label.toLowerCase()) : '';
      let valueString = typeof item.label === 'string' ? removeAccents(item.value.toLowerCase()) : '';

      if (labelString.indexOf(filter) !== -1 || valueString.indexOf(filter) !== -1) {
        newList.push(item);
      }
    }
    return newList;
  }
}
