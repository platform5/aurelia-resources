import { Container } from 'aurelia-framework';
import { NotificationService } from 'aurelia-notify';
import { Logger, getLogger } from 'aurelia-logging';
import { ArNotification } from '../elements/ar-notification';
import { StringStringMap } from '../interfaces/types';
import { SentryHelper } from './sentry';
import { CaptureContext } from '@sentry/types';


let serviceReady = false;
let notificationService: NotificationService;
let log: Logger;

function gettingServiceReady() {
  if (serviceReady) return;
  log = getLogger('notify');
  notificationService = Container.instance.get(NotificationService);
  serviceReady = true;
}

export interface NotifyOptions {
  append?: boolean;
  containerSelector?: string;
  timeout?: number;
  viewModel?: any;
  limit?: number;
  type?: 'info' | 'success' | 'warning' | 'danger' | 'primary' | 'accent' | 'action';
  sendToSentry?: boolean;
  context?: {[key: string]: any};
}

let defaultOptions: NotifyOptions = {
  timeout: 5000,
  viewModel: ArNotification,
  type: 'info',
};

let aliases: StringStringMap = {};

export function addNotifyContainerAlias(alias: string, selector: string) {
  aliases[alias] = selector;
}

export function setNotifyDefaults(settings: NotifyOptions, setOnlyGiventKeys: boolean = true) {
  if (setOnlyGiventKeys) {
    for (let key in settings) {
      defaultOptions[key] = settings[key];
    }
  } else {
    defaultOptions = settings;
  }
}

export function notifaction(message: string, actionLabel: string, actionCallback: () => any, actionContext: any, options: NotifyOptions) {
  gettingServiceReady();
  let type = options.type || 'action';
  let settings = Object.assign({}, defaultOptions, options);
  if (aliases[settings.containerSelector]) settings.containerSelector = aliases[settings.containerSelector];
  return notificationService.notify({
    notification: message,
    actionLabel: actionLabel,
    actionCallback: actionCallback,
    actionContext: actionContext
  }, settings, type);
}

export function notify(message: string, options: NotifyOptions = {}) {
  gettingServiceReady();
  let type = options.type || defaultOptions.type || 'info';
  let settings = Object.assign({}, defaultOptions, options);
  if (aliases[settings.containerSelector]) settings.containerSelector = aliases[settings.containerSelector];
  // by default not sent to sentry
  if (options.sendToSentry === true) {
    const sentryContext: CaptureContext = options.context ? {contexts: options.context} : undefined;
    Container.instance.get(SentryHelper).captureMessageIfConfigured(message, sentryContext);
  }
  return notificationService.notify(message, settings, type);
}

export function errorify(error: Error, options: NotifyOptions = {}) {
  if (!options.type) options.type = 'warning';
  // by default send to sentry
  if (options.sendToSentry !== false) {
    const sentryContext: CaptureContext = options.context ? {contexts: options.context} : undefined;
    Container.instance.get(SentryHelper).captureIfConfigured(error, sentryContext);
  }
  return notify(error.message, Object.assign({}, options, {sendToSentry: false}));
}

export function errorifyTo(containerSelector: string) {
  return (error: Error) => {
    return errorify(error, )
  }
}
