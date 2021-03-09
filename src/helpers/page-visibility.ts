import { EventAggregator } from 'aurelia-event-aggregator';
import { Container } from 'aurelia-framework';
import { Logger, getLogger } from 'aurelia-logging';

let eventAggregator = Container.instance.get(EventAggregator);
let log: Logger = getLogger('page-visiblity');

export class PageVisibilityHelpers {

  static log: boolean = false;
  static hidden: string;
  static visibilityChange: string;

  private static init() {
    if (PageVisibilityHelpers.log) {
      log.debug('Init');
    }
    if (typeof document.hidden !== 'undefined') {
      PageVisibilityHelpers.hidden = 'hidden';
      PageVisibilityHelpers.visibilityChange = 'visibilitychange';
    } else if (typeof (document as any).msHidden !== 'undefined') {
      PageVisibilityHelpers.hidden = 'msHidden';
      PageVisibilityHelpers.visibilityChange = 'msvisibilitychange';
    } else if (typeof (document as any).webkitHidden !== 'undefined') {
      PageVisibilityHelpers.hidden = 'webkitHidden';
      PageVisibilityHelpers.visibilityChange = 'webkitvisibilitychange';
    }
    if (PageVisibilityHelpers.log) {
      log.debug('hidden:', PageVisibilityHelpers.hidden);
      log.debug('visibilityChange:', PageVisibilityHelpers.visibilityChange);
    }
  }

  static listen() {
    if (PageVisibilityHelpers.log) {
      log.debug('Listen');
    }
    if (!PageVisibilityHelpers.hidden) PageVisibilityHelpers.init();

    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (typeof document.addEventListener === 'undefined' || typeof document.hidden === 'undefined') {
      if (PageVisibilityHelpers.log) log.warn('This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.');
    } else {
      // Handle page visibility change
      document.addEventListener(PageVisibilityHelpers.visibilityChange, () => {
        if (document[PageVisibilityHelpers.hidden]) {
          if (PageVisibilityHelpers.log) log.info('Page is now hidden');
          eventAggregator.publish('page:background');
        } else {
          if (PageVisibilityHelpers.log) log.info('Page is now visibile');
          eventAggregator.publish('page:foreground');
        }
      }, false);
    }
  }

  static isHidden() {
    return document[PageVisibilityHelpers.hidden];
  }
}
