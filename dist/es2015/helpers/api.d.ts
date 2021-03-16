import { HttpClient } from 'aurelia-fetch-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import 'whatwg-fetch';
export declare class Api {
    http: HttpClient;
    eventAggregator: EventAggregator;
    /**
     * Set this property in children class when using this class as inheritance
     */
    baseUrl: string;
    constructor(http: HttpClient, eventAggregator: EventAggregator);
    configure(): void;
    defaultOptions(options?: any): any;
    get(entrypoint: string, options?: any): Promise<any>;
    post(entrypoint: string, body?: any, options?: any): Promise<any>;
    put(entrypoint: string, body?: any, options?: any): Promise<any>;
    delete(entrypoint: string, body?: any, options?: any): Promise<any>;
    normalizeBody(body: any, options: any): any;
}
