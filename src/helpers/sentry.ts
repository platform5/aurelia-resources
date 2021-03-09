import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
import { inject, Container } from "aurelia-framework";
import { CaptureContext, User } from '@sentry/types';

@inject(Container)
export class SentryHelper {

  private isInited = false;

  public constructor(private container: Container) {

  }

  public initIfConfigured() {
    const config = this.container.get('aurelia-resources-config');
    const dsn = config?.sentry?.dsn;
    if (dsn) {
      this.init();
    }
  }

  public init() {
    if (this.isInited) {
      console.warn('Sentry has already been initialized. You should not call init() twice.');
      return;
    }
    const config = this.container.get('aurelia-resources-config');
    const dsn = config?.sentry?.dsn;
    if (dsn) {
      Sentry.init({
        dsn,
        release: config.sentry.release || undefined,
        environment: config.sentry.environment || undefined,
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: config.sentry.samplingRate || 1.0,
        debug: config.sentry.debug || undefined
      });
    }
    this.isInited = true;
  }

  public setUser(user: User) {
    if (!this.isInited) {
      console.warn('Sentry must be initialized first');
      return;
    }
    Sentry.setUser(user)
  }

  public unsetUser() {
    if (!this.isInited) {
      console.warn('Sentry must be initialized first');
      return;
    }
    Sentry.setUser(null);
  }


  public fakeError(fakeErrorMsg: string = 'This is my fake error message') {
    this.capture(new Error(fakeErrorMsg));
  }

  public captureIfConfigured(error: Error, context?: CaptureContext) {
    if (!this.isInited) {
      return;
    }
    this.capture(error, context);
  }

  public capture(error: Error, context?: CaptureContext) {
    if (!this.isInited) {
      console.warn('Sentry must be initialized first');
      return;
    }
    Sentry.captureException(error, context);
  }

  public captureMessageIfConfigured(message: string, context?: CaptureContext) {
    if (!this.isInited) {
      return;
    }
    this.captureMessage(message, context);
  }

  public captureMessage(message: string, context?: CaptureContext) {
    if (!this.isInited) {
      console.warn('Sentry must be initialized first');
      return;
    }
    Sentry.captureMessage(message, context);
  }

  
}
