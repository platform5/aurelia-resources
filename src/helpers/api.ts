import {
  inject,
} from 'aurelia-framework';
import {
  HttpClient
} from 'aurelia-fetch-client';
import {
  EventAggregator
} from 'aurelia-event-aggregator';
import 'whatwg-fetch';

@inject(HttpClient, EventAggregator)
export class Api {

  /**
   * Set this property in children class when using this class as inheritance
   */
  public baseUrl: string = '';

  constructor(public http: HttpClient, public eventAggregator: EventAggregator) {
    this.configure();
  }

  configure() {
    this.http.configure((config) => {
      config
        //.useStandardConfiguration()
        .withDefaults({
          credentials: 'same-origin'
        })
        .withBaseUrl(this.baseUrl);
      });
  }

  defaultOptions(options: any = {}) {
    let o: any = {
      method: 'get',
      headers: {}
    };

    o.headers['Content-Type'] = 'application/json';

    return Object.assign({}, o, options);
  }

  get(entrypoint: string, options: any = {}): Promise < any > {
    return this.http.fetch(entrypoint, this.defaultOptions(options));
  }

  post(entrypoint: string, body: any = {}, options: any = {}): Promise < any > {
    let o = this.defaultOptions(options);
    o.method = 'post';
    o.body = this.normalizeBody(body, options);
    return this.http.fetch(entrypoint, o);
  }

  put(entrypoint: string, body: any = {}, options: any = {}): Promise < any > {
    let o = this.defaultOptions(options);
    o.method = 'put';
    o.body = this.normalizeBody(body, options);
    return this.http.fetch(entrypoint, o);
  }

  delete(entrypoint: string, body: any = {}, options: any = {}): Promise < any > {
    let o = this.defaultOptions(options);
    o.method = 'delete';
    o.body = this.normalizeBody(body, options);
    return this.http.fetch(entrypoint, o);
  }

  normalizeBody(body: any, options: any) {
    if (!options.bodyFormat ||  options.bodyFormat === 'json') {
      body = JSON.stringify(body);
    }
    return body;
  }
}
