import { customElement, bindable, children } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { observable, bindingMode, computedFrom } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArTagsInputTheme } from './ar-tags-input-theme';
import { getLogger, Logger } from 'aurelia-logging';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as removeAccents from 'remove-accents';

@inject(Element, StyleEngine, EventAggregator)
@customElement('ar-tags-input')
export class ArTagsInput implements UxComponent {

  @bindable({defaultBindingMode: bindingMode.twoWay}) public value: Array<string>;
  @bindable public availableTagsList: Array<string>;
  @bindable public allowEmptyTag: boolean = false;
  @bindable public allowNewTag: boolean = true;
  
  private visibles: {[key: string]: boolean} = {};

  private log: Logger;
  @bindable public theme: ArTagsInputTheme;
  constructor(private element: HTMLElement, public styleEngine: StyleEngine, private eventAggregator: EventAggregator) {
    this.log = getLogger('ar-tags-input');
  }

  public bind() {
    const element = this.element;
    this.themeChanged(this.theme);
    this.valueChanged();
    this.availableTagsListChanged();
  }

  public valueChanged() {
    if (typeof this.value === 'string') this.value = (this.value as string).split(',');
    if (!Array.isArray(this.value)) this.value = [];
    this.sort(this.value);
    let visibles: {[key: string]: boolean} = {};
    for (let tag of this.value) {
      visibles[tag] = true;
    }
    this.visibles = visibles;
  }

  public availableTagsListChanged() {
    if (typeof this.availableTagsList === 'string') this.availableTagsList = (this.availableTagsList as string).split(',');
    if (!Array.isArray(this.availableTagsList)) this.availableTagsList = [];
    if (!this.allowEmptyTag && this.availableTagsList.includes('')) {
      this.availableTagsList = this.availableTagsList.filter(t => t !== '');
    }
    this.sort(this.availableTagsList);
    this.dispatchListChangeEvent();
  }

  @computedFrom('value', 'value.length', 'availableTagsList', 'availableTagsList.length')
  public get remainingTags() {
    let tags: Array<string> = [];
    for (let tag of this.availableTagsList) {
      if (this.value.indexOf(tag) === -1) tags.push(tag);
    }
    return tags;
  }

  public attached() {
  }

  public detached() {
    
  }

  private sort(array: Array<string>) {
    array.sort((a: string, b: string) => {
      let va = removeAccents(a.toLowerCase());
      let vb = removeAccents(b.toLowerCase());
      if (va < vb) return -1;
      if (va > vb) return 1;
      return 0;
    });
  }

  public selectTag(tag: string) {
    if (this.availableTagsList.indexOf(tag) === -1) {
      this.availableTagsList.push(tag);
      this.availableTagsListChanged();
    } 
    if (this.value.indexOf(tag) === -1) this.value.push(tag);
    this.sort(this.value);
    this.valueChanged();
    this.dispatchChangeEvent();
  }
  
  public removeTag(tag: string) {
    let index = this.value.indexOf(tag);
    if (index !== -1) this.value.splice(index, 1);
    this.valueChanged();
    this.dispatchChangeEvent();
  }

  @observable newTag: string = '';
  newTagActive = false;
  inputBox: HTMLInputElement;
  public activeNewTag() {
    if (!this.allowNewTag) return;
    this.newTagActive = true;
    this.inputBox.focus();
  }

  public newTagChanged() {
    if (!this.allowNewTag) return;
    if (!this.inputBox) return;
    let size = Math.max(4, this.newTag.length + 2);
    this.inputBox.setAttribute('size', size.toString());
  }

  public blur() {
    if (!this.allowNewTag) return;
    if (this.newTag) this.selectTag(this.newTag);
    this.newTag = '';
    this.newTagActive = false;
  }

  public keyDown(event) {
    if (event.keyCode === 13) {
      /*if (this.newTag) this.selectTag(this.newTag);
      this.newTag = '';
      this.newTagActive = false;*/
      this.blur();
    }
    return true;
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'ar-tags-input';
    }
    this.styleEngine.applyTheme(newValue, this.element);
  }

  public dispatchChangeEvent() {
    const customEvent = DOM.createCustomEvent('change', {bubbles: true, detail: this.value});
    this.element.dispatchEvent(customEvent);
  }

  public dispatchListChangeEvent() {
    const customEvent = DOM.createCustomEvent('list-change', {bubbles: true, detail: this.availableTagsList});
    this.element.dispatchEvent(customEvent);
  }
}
