import { StringHelpers } from '../helpers/string';
import { AureliaResourcesConfig } from '../index';
import { customElement, bindable, children } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArStripeElementTheme } from './ar-stripe-element-theme';
import { getLogger, Logger } from 'aurelia-logging';
import { EventAggregator } from 'aurelia-event-aggregator';

import { noView, customAttribute, Container } from 'aurelia-framework';

@inject(Element, StyleEngine, EventAggregator)
@customElement('ar-stripe-element')
export class ArStripeElement implements UxComponent {

  @bindable public id: string;
  @bindable public type: string = 'card';
  @bindable public hidePostalCode: boolean = true;
  @bindable public apiKey: string = '';
  
  private log: Logger;
  private stripeReady = false;
  private stripe: any;
  private card: any;
  private errorMessage: string = '';

  @bindable public theme: ArStripeElementTheme;
  
  constructor(private element: HTMLElement, public styleEngine: StyleEngine, private eventAggregator: EventAggregator) {
    this.log = getLogger('ar-stripe-element');
  }

  public bind() {
    const element = this.element;
    this.themeChanged(this.theme);
  }

  private getApiKey() {
    if (this.apiKey) return this.apiKey;
    let config: AureliaResourcesConfig = Container.instance.get('aurelia-resources-config');
    if (config && config.stripe && config.stripe.apiKey) return config.stripe.apiKey;
    return null;
  }

  public attached() {
    let apiKey = this.getApiKey();
    if (!apiKey) throw new Error('Missing Stripe API Key');
    if (!this.id) this.id = StringHelpers.randomString();
    this.loadStripe();
    this.isStripReady().then(() => {
        this.stripe = (window as any).Stripe(apiKey)
        this.createStripeElement();
    });
  }

  private createStripeElement() {
      switch (this.type) {
        case 'card': return this.createCardElement();
      }
  }

  private createCardElement() {
    const elements = this.stripe.elements();
    const style = {
        base: {
          // Add your base input styles here. For example:
          fontSize: '16px',
          color: 'inherit',
        }
      };
      
    // Create an instance of the card Element.
    this.card = elements.create('card', {style: style, hidePostalCode: this.hidePostalCode});
    // Add an instance of the card Element into the `card-element` <div>.
    this.card.mount(`#stripe-${this.id}`);

    this.card.addEventListener('change', ({error}) => {
        if (error) {
            this.errorMessage = error.message;
        } else {
            this.errorMessage = '';
        }
    });
  }

  public detached() {
    
  }

  private loadStripe() {
    let body = document.querySelectorAll('body')[0]
    // check if we already have requested stripe loading
    if (!body.classList.contains('stripe-requested')) {
        // request stripe
        let script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        body.appendChild(script);
        body.classList.add('stripe-requested');
    }
  }

  public isStripReady(): Promise<boolean> {
    if (this.stripeReady || (window as any).Stripe) return Promise.resolve(true);
    return new Promise((resolve, reject) => {
        let count = 0;
        let interval = setInterval(() => {
            if ((window as any).Stripe) {
                this.stripeReady = true;
                clearInterval(interval);
                resolve(true);
            }
            if (count >= 100) {
                reject(new Error('Stripe unavailable'));
            }
        }, 100);
    });
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'stripe-element';
    }
    this.styleEngine.applyTheme(newValue, this.element);
  }

  public createToken(): Promise<any> {
    if (!this.card) return Promise.reject(new Error('createToken can only be called once a card has been created'));
    return this.stripe.createToken(this.card).then((result) => {
        if (result.error) {
            this.errorMessage = result.error.message;
            return Promise.reject(result.error);
        } else {
            return result.token;
        }
    });
  }
}
