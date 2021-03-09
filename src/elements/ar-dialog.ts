import { ArDialogPromptOption } from './ar-dialog-prompt';
import { inject, bindable, Container, TemplatingEngine } from 'aurelia-framework';
import { getLogger, Logger } from 'aurelia-logging';
import { DOM } from 'aurelia-pal';
import { customElement, child, Controller } from 'aurelia-templating';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArDialogTheme } from './ar-dialog-theme';
import { errorify } from '../helpers/notify';

export type DialogTypes = 'alert' | 'confirmation' | 'prompt' | 'edition';

export interface DialogResponse {
  dismissed: boolean;
  value?: any;
  agree?: boolean;
  error?: Error;
}

@customElement('ar-dialog')
@inject(Element, StyleEngine, TemplatingEngine)
export class ArDialog implements UxComponent {    

  // Bindables
  @bindable public theme: ArDialogTheme;
  @bindable container: null | string | Element = null;
  @bindable overlayDismiss: boolean = true;
  @bindable animation: string = 'zoom'; 
  @bindable animationDuration: number = 250; // TODO: use this setting to configure animation duration
  @bindable public type: DialogTypes = 'alert';
  @bindable public transient: boolean = false; // if transient, the customElement is attached and removed of the DOM automatically when opening and closing
  @bindable public title: string;
  @bindable public content: string;
  @bindable public contentViewModelPath: string;
  @bindable public promptCompName: string = 'ar-dialog-prompt';
  @bindable public promptOptions?: Array<ArDialogPromptOption>;
  @bindable public editionViewModelPath: string;
  @bindable private editionModel: any
  @bindable private editionCallback: Function; // must return a promise 

  private promptContainer: Element;
  private promptIncludedCompName: string = '';
  private promptVM: any;
  private promptValue: any;
  
  public static zIndexRef: number = 300;
  public static dialogLayers: number = 0;
  private zIndex: number = 300;
  private log: Logger;
  private overlayVisible: boolean = false;
  private dialogVisible: boolean = false;

  private window = window;

  constructor(private element: Element, public styleEngine: StyleEngine, private templatingEngine: TemplatingEngine) {
    this.log = getLogger('comp:ar-dialog');
  }

  public attached() {
    if (this.transient) this.open();
    else this.moveToContainer()
  }

  private moveToContainer() {
    let container: Element;
    if (this.container instanceof Element) container = this.container;
    else if (typeof this.container === 'string') {
      container = document.querySelector(this.container);
    } else {
      container = (document.getElementsByTagName('BODY')[0] as HTMLBodyElement)
    }
    container.appendChild(this.element);
  }

  private removeFromContainer() {
    let container = this.element.parentElement;
    container.removeChild(this.element);
  }

  private createPromptTimeout;
  public typeChanged() {
    if (this.type === 'prompt') {
      if (this.promptIncludedCompName !== this.promptCompName && this.promptVM) {
        if (this.promptVM.element) this.promptVM.element.remove();
        this.promptVM.detached();
        this.promptVM = undefined;
      }
      this.promptIncludedCompName = this.promptCompName;
      if (this.createPromptTimeout) clearTimeout(this.createPromptTimeout);
      this.createPromptTimeout = setTimeout(() => {
        let element = DOM.createElement(this.promptCompName);
        element.setAttribute('value.two-way', 'promptValue');
        if(this.promptOptions) {
          element.setAttribute('options.bind', 'promptOptions');
        }
        this.promptContainer.appendChild(element);
        let bindingContext = this;
        //let templatingEngine: TemplatingEngine = Container.instance.get(TemplatingEngine);
        this.promptVM = this.templatingEngine.enhance({ element: element, bindingContext: bindingContext });
        this.promptVM.attached();
      }, 50);
    } else if (this.promptVM) {
      this.promptVM.element.remove();
      this.promptVM.detached();
      this.promptVM = undefined;
      this.promptIncludedCompName = '';
    }
  }

  public detached() {
    this.removeFromContainer();
  }

  private clickOnOverlay(event) {
    event.stopPropagation();
    if (this.overlayDismiss) {
      this.dismiss()
    }
    return true;
  }

  private clickOnCard(event) {
    event.stopPropagation();
    return true;
  }

  private stopPropagation(event) {
    event.stopPropagation();
    return true;
  }

  public dismiss() {
    this.returnResponse({
      dismissed: true
    })
    this.close();
  }

  private returnPromptValue() {
    this.returnResponse({
      dismissed: false,
      value: this.promptValue
    });
    this.close();
  }

  private returnAgree(agree: boolean = true) {
    this.returnResponse({
      dismissed: false,
      agree: agree
    });
    this.close();
  }

  public open() {
    setTimeout(() => {
      ArDialog.dialogLayers++;
      this.setZIndex();
      this.overlayVisible = true;
      this.typeChanged();
    }, 1);
    setTimeout(() => {
      this.dialogVisible = true;
    }, 10)
  }

  public close() {
    ArDialog.dialogLayers--;
    this.dialogVisible = false;
    if (this.transient) this.remove();
    else {
      setTimeout(() => {
        this.overlayVisible = false;
      }, this.animationDuration);
    }
  }

  private remove() {
    setTimeout(() => {
      this.detached();
    }, this.animationDuration)
  }

  private processSaving() {
    if (this.editionCallback) {
      this.editionCallback().then((value) => {
        this.returnResponse({
          value: value,
          dismissed: false
        });
        this.close();
      }).catch(errorify);
    } else {
      this.returnResponse({
        value: null,
        dismissed: false
      });
      this.close();
    }
  }

  private returnResponse(response: DialogResponse) {
    for (let sub of this.subscriptions) {
      sub(response);
    }
    this.subscriptions = [];
  }

  subscriptions: Array<Function> = [];
  errorSubscriptions: Array<Function> = [];
  public whenClosed(): Promise<DialogResponse> {
    return new Promise((resolve, reject) => {
      this.subscriptions.push(resolve);
      this.errorSubscriptions.push(reject);
    });
  }

  public setZIndex()  {
    this.zIndex = ArDialog.zIndexRef + ArDialog.dialogLayers;
  }
}

export interface ArDialogOptions {
  title?: string;
  bindingContext?: any;
  slotHTML?: string;
  content?: string;
  contentViewModelPath?: string;
  editionViewModelPath?: string;
  editionModel?: any;
  promptCompName?: string;
  type?: DialogTypes;
  promptOptions?: Array<ArDialogPromptOption>;
  editionCallback?: Function;
}

let arDialog = (options: ArDialogOptions): ArDialog => {
  let element = DOM.createElement('ar-dialog');
  element.setAttribute('transient.bind', 'true');
  if (options && options.slotHTML) element.innerHTML = options.slotHTML;
  if (options && options.title) element.setAttribute('title', options.title);
  if (options && options.content) element.setAttribute('content', options.content);
  if (options && options.contentViewModelPath) element.setAttribute('content-view-model-path', options.contentViewModelPath);
  if (options && options.editionViewModelPath) element.setAttribute('edition-view-model-path', options.editionViewModelPath);
  if (options && options.promptCompName) element.setAttribute('prompt-comp-name', options.promptCompName);
  if (options && options.type) element.setAttribute('type', options.type);
  document.querySelector('body').appendChild(element);
  let bindingContext = (options && options.bindingContext) ? options.bindingContext : this;
  if (!bindingContext) bindingContext = {};
  bindingContext.editionModel = options.editionModel;
  bindingContext.editionCallback = options.editionCallback;
  bindingContext.promptOptions = options.promptOptions;
  if (options && options.editionModel) element.setAttribute('edition-model.bind', 'editionModel');
  if (options && options.editionCallback) element.setAttribute('edition-callback.bind', 'editionCallback');
  if (options && options.promptOptions) element.setAttribute('prompt-options.bind', 'promptOptions');
  let templatingEngine = Container.instance.get(TemplatingEngine);
  let childView = templatingEngine.enhance({ element: element, bindingContext: bindingContext });
  childView.attached();
  const controllers = (childView as any).controllers as Controller[];
  return (controllers[0].viewModel as ArDialog);
}

export {arDialog};
