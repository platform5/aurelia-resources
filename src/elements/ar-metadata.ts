import { customElement, bindable, children } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArMetadataTheme } from './ar-metadata-theme';
import { getLogger, Logger } from 'aurelia-logging';
import { EventAggregator } from 'aurelia-event-aggregator';
import { noView, customAttribute, Container } from 'aurelia-framework';
import { ArDialog } from './ar-dialog';

export interface Metadata {
  key: string;
  value: any;
}

@inject(Element, StyleEngine, EventAggregator)
@customElement('ar-metadata')
export class ArMetadata implements UxComponent {

  @bindable public theme: ArMetadataTheme;
  @bindable value: Array<Metadata> | any;

  private fakeValue: Array<Metadata> = [];
  
  //@children('ar-metadata-item') private items: Array<ArMetadataItem> = [];
  private focused: boolean = false;
  private log: Logger;

  private editorContainer: HTMLElement;
  private originalValue: any | Array<any>;

  private dialog: ArDialog;
  
  constructor(private element: HTMLElement, public styleEngine: StyleEngine, private eventAggregator: EventAggregator) {
    this.log = getLogger('ar-metadata');
  }

  public bind() {
    const element = this.element;
    this.themeChanged(this.theme);
  }

  public attached() {
    //this.moveToBodyTag();
  }

  public detached() {
    //this.removeFromBodyTag();
  }

  public moveToBodyTag() {
    document.getElementsByTagName('BODY')[0].appendChild(this.editorContainer);
  }

  public removeFromBodyTag() {
    document.getElementsByTagName('BODY')[0].removeChild(this.editorContainer);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'ar-metadata';
    }
    this.styleEngine.applyTheme(newValue, this.element);
  }

  public valueChanged() {
    if (this.value === null) {
      this.value = undefined;
    } else if (typeof this.value === 'string') {
      this.value = this.value.split(',');
    } else if (!Array.isArray(this.value)) {
      this.value = [];
    }
  }
  

  focus() {
    this.focused = true;
    this.dialog.open();
    this.originalValue = this.value;
  }

  closeEditor() {
    this.dialog.close();
    this.focused = false;
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  addItem(event) {
    event.stopPropagation();
    if (!Array.isArray(this.value)) this.value = [];
    this.value.push({key: '', value: ''});
  }

  removeItem(index, event) {
    event.stopPropagation();
    this.value.splice(index, 1);
  }

}
