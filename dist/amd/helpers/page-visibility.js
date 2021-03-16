define(["require", "exports", "aurelia-event-aggregator", "aurelia-framework", "aurelia-logging"], function (require, exports, aurelia_event_aggregator_1, aurelia_framework_1, aurelia_logging_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PageVisibilityHelpers = void 0;
    var eventAggregator = aurelia_framework_1.Container.instance.get(aurelia_event_aggregator_1.EventAggregator);
    var log = aurelia_logging_1.getLogger('page-visiblity');
    var PageVisibilityHelpers = /** @class */ (function () {
        function PageVisibilityHelpers() {
        }
        PageVisibilityHelpers.init = function () {
            if (PageVisibilityHelpers.log) {
                log.debug('Init');
            }
            if (typeof document.hidden !== 'undefined') {
                PageVisibilityHelpers.hidden = 'hidden';
                PageVisibilityHelpers.visibilityChange = 'visibilitychange';
            }
            else if (typeof document.msHidden !== 'undefined') {
                PageVisibilityHelpers.hidden = 'msHidden';
                PageVisibilityHelpers.visibilityChange = 'msvisibilitychange';
            }
            else if (typeof document.webkitHidden !== 'undefined') {
                PageVisibilityHelpers.hidden = 'webkitHidden';
                PageVisibilityHelpers.visibilityChange = 'webkitvisibilitychange';
            }
            if (PageVisibilityHelpers.log) {
                log.debug('hidden:', PageVisibilityHelpers.hidden);
                log.debug('visibilityChange:', PageVisibilityHelpers.visibilityChange);
            }
        };
        PageVisibilityHelpers.listen = function () {
            if (PageVisibilityHelpers.log) {
                log.debug('Listen');
            }
            if (!PageVisibilityHelpers.hidden)
                PageVisibilityHelpers.init();
            // Warn if the browser doesn't support addEventListener or the Page Visibility API
            if (typeof document.addEventListener === 'undefined' || typeof document.hidden === 'undefined') {
                if (PageVisibilityHelpers.log)
                    log.warn('This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.');
            }
            else {
                // Handle page visibility change
                document.addEventListener(PageVisibilityHelpers.visibilityChange, function () {
                    if (document[PageVisibilityHelpers.hidden]) {
                        if (PageVisibilityHelpers.log)
                            log.info('Page is now hidden');
                        eventAggregator.publish('page:background');
                    }
                    else {
                        if (PageVisibilityHelpers.log)
                            log.info('Page is now visibile');
                        eventAggregator.publish('page:foreground');
                    }
                }, false);
            }
        };
        PageVisibilityHelpers.isHidden = function () {
            return document[PageVisibilityHelpers.hidden];
        };
        PageVisibilityHelpers.log = false;
        return PageVisibilityHelpers;
    }());
    exports.PageVisibilityHelpers = PageVisibilityHelpers;
});
