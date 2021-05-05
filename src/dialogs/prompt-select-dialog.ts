import { UxModalService, UxModalServiceResult } from '@aurelia-ux/modal';
import { inject, computedFrom } from 'aurelia-framework';
import { errorify } from '../helpers/notify';
import * as removeAccents from 'remove-accents';

@inject(UxModalService)
export class PromptSelectDialog {

  public mode: 'single' | 'multiple' = 'single';
  public options: Array<any> = [];
  public value: any;
  public labelKey: string = '';
  public secondaryKey: string = '';
  public valueKey: string = '';
  public title: string = 'Select an option';
  public required: boolean = false;
  public autoClose: boolean = false;
  public icon: string = '';
  public showSearch: 'auto' | boolean = 'auto';
  
  constructor(private modalService: UxModalService) {
    
  }

  public activate(params: any) {
    if (!params) {
      throw new Error('You must provide params when opening prompt-select-dialog');
    }
    if (!params.options || !Array.isArray(params.options)) {
      throw new Error('You must provide an array of options in params when opening prompt-select-dialog');
    }
    if (params.mode) {
      this.mode = params.mode === 'multiple' ? 'multiple' : 'single';
    }
    if (params.showSearch) {
      this.showSearch = params.showSearch;
    } else {
      this.showSearch = 'auto';
    }
    this.icon = params.icon;
    this.required = params.required === true ? true : false;
    this.autoClose = params.autoClose === true ? true : false;
    this.title = params.title ? params.title : 'Select an option';
    this.options = Array.isArray(params.options) ? params.options : [];
    this.labelKey = params.labelKey || undefined;
    this.secondaryKey = params.secondaryKey || undefined;
    this.valueKey = params.valueKey || undefined;

    const options = this.options.map(o => this.getValue(o));
    if (this.mode === 'multiple') {
      if (Array.isArray(params.value)) {
        const value: Array<any> = [];
        for (const val of params.value) {
          const computedVal = this.getValue(val);
          if (options.includes(val)) {
            value.push(val);
          } else if (options.includes(computedVal)) {
            value.push(computedVal);
          }
        }
        this.value = value;
      }
    } else {
      if (options.includes(params.value)) {
        this.value = params.value;
      } else if (options.includes(this.getValue(params.value))) {
        this.value = this.getValue(params.value);
      } else {
        this.value = undefined;
      }
    }


    if (this.mode === 'multiple' && !Array.isArray(this.value)) {
      this.value = [];
    }

  }

  public async canDeactivate(result: UxModalServiceResult) {
    if (result.wasCancelled) {
      return true;
    }
    if (this.required && !result.output) {
      errorify(new Error('You must select an option'));
      return false;
    }
    return true;
  }

  public getLabel(option: any): string {
    if (typeof option === 'object' && this.labelKey) {
      return option[this.labelKey];
    }
    return option;
  }

  public getSecondary(option: any): string {
    if (typeof option === 'object' && this.secondaryKey) {
      return option[this.secondaryKey];
    }
    return option;
  }

  public getValue(option: any): any {
    if (typeof option === 'object' && this.valueKey) {
      return option[this.valueKey];
    }
    return option;
  }

  public toggleOption(option: any, event: MouseEvent) {
    event.stopPropagation();
    const value = this.getValue(option);

    if (this.mode === 'multiple') {
      let index = this.value.indexOf(value);
      if (index === -1) {
        this.value.push(value);
      } else {
        this.value.splice(index, 1);
      }
    } else {
      if (this.value === value) this.value = typeof value === 'string' ? '' : undefined;
      else this.value = value;
    }

    if (this.mode === 'single' && (this.value || !this.required) && this.autoClose) {
      this.modalService.ok(this.value);
    }
  }

  public isSelected(option: any, value: any): boolean {
    const optionValue = this.getValue(option);
    if (this.mode === 'multiple') {
      if (!Array.isArray(value)) {
        return false;
      }
      return value.includes(optionValue);
    } else {
      return value === optionValue;
    }
  }

  @computedFrom('showSearch', 'options.length')
  public get shouldShowSearch(): boolean {
    return this.showSearch === 'auto'
      ? this.options.length > 10
      : this.showSearch;
  }
}


export class PromptSelectDialogFilterOptionsValueConverter {
  toView (list: Array<any>, filter: string = '', labelKey: string | undefined, secondaryKey: string | undefined, valueKey: string | undefined): Array<any> {
    if (!filter) return list;
    let newList: Array<any> = [];
    filter = removeAccents(filter.toLowerCase());
    for (let item of list) {
      const label = typeof item === 'object' && labelKey ? item[labelKey] : item;
      const secondary = typeof item === 'object' && secondaryKey ? item[secondaryKey] : item;
      const value = typeof item === 'object' && valueKey ? item[valueKey] : item;
      const l = typeof label === 'string' ? removeAccents(label.toLowerCase()) : '';
      const s = typeof secondary === 'string' ? removeAccents(secondary.toLowerCase()) : '';
      const v = typeof value === 'string' ? removeAccents(value.toLowerCase()) : '';
      if (l.indexOf(filter) !== -1 || s.indexOf(filter) !== -1 || v.indexOf(filter) !== -1) {
        newList.push(item);
      }
    }
    return newList;
  }
}
