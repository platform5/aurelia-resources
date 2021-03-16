define(["require", "exports", "aurelia-event-aggregator", "aurelia-framework", "aurelia-router", "aurelia-logging"], function (require, exports, aurelia_event_aggregator_1, aurelia_framework_1, aurelia_router_1, aurelia_logging_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AnalyticsGoogle = void 0;
    var criteria = {
        isElement: function (e) {
            return e instanceof HTMLElement;
        },
        hasClass: function (cls) {
            return function (e) {
                return criteria.isElement(e) && e.classList.contains(cls);
            };
        },
        hasTrackingInfo: function (e) {
            return criteria.isElement(e) &&
                e.hasAttribute('data-analytics-category') &&
                e.hasAttribute('data-analytics-action');
        },
        isOfType: function (e, type) {
            return criteria.isElement(e) && e.nodeName.toLowerCase() === type.toLowerCase();
        },
        isAnchor: function (e) {
            return criteria.isOfType(e, 'a');
        },
        isButton: function (e) {
            return criteria.isOfType(e, 'button');
        }
    };
    var AnalyticsGoogle = /** @class */ (function () {
        function AnalyticsGoogle() {
            this.initialized = false;
            this.enableNavigationTracking = false;
            this.enableClickTracking = false;
            this.enableEventTracking = false;
            this.listenRouter = false;
            this.anonymizeIp = false;
            this.log = aurelia_logging_1.getLogger('analytics-google');
        }
        AnalyticsGoogle.prototype.init = function (id) {
            var script = document.createElement('script');
            script.text = "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){" +
                "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o)," +
                "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)" +
                "})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');";
            document.querySelector('body').appendChild(script);
            var _ga = function () {
                // @ts-ignore
                (ga.q = ga.q || []).push(arguments);
            };
            _ga.tmp = true;
            window.ga = window.ga || _ga;
            this.ga.l = +new Date;
            this.ga('create', id, 'auto');
            this.initialized = true;
        };
        Object.defineProperty(AnalyticsGoogle.prototype, "ga", {
            get: function () {
                return window.ga;
            },
            enumerable: false,
            configurable: true
        });
        AnalyticsGoogle.prototype.start = function () {
            if (!this.initialized) {
                this.log.warn("Please call 'init()' before calling 'start()'.");
                return;
            }
            this.setListeners();
            this.attachClickTracker();
        };
        AnalyticsGoogle.prototype.setListeners = function () {
            var _this = this;
            var ea = aurelia_framework_1.Container.instance.get(aurelia_event_aggregator_1.EventAggregator);
            ea.subscribe('router:navigation:success', function (event) {
                if (!_this.listenRouter)
                    return;
                var instruction = event.instruction;
                _this.trackPage(instruction.fragment + '?' + instruction.queryString, instruction.config.name);
            });
            ea.subscribe('analytics:navigation', function (event) {
                if (event instanceof aurelia_router_1.NavigationInstruction) {
                    _this.trackPage(event.fragment + '?' + event.queryString, event.config.name);
                }
                else if (event.path) {
                    _this.trackPage(event.path, event.title);
                }
            });
            ea.subscribe('analytics:click', function (event) {
                if (event.category && event.action) {
                    _this.trackClick(event.category, event.action, event.label, event.value);
                }
            });
            ea.subscribe('analytics:event', function (event) {
                if (event.category && event.action) {
                    _this.trackClick(event.category, event.action, event.label, event.value);
                }
            });
        };
        AnalyticsGoogle.prototype.attachClickTracker = function () {
            var _this = this;
            document.querySelector('body').addEventListener('click', function (event) {
                if (!_this.enableClickTracking)
                    return;
                var el = event.target;
                var delegateTarget;
                do {
                    if (!criteria.hasTrackingInfo(el))
                        continue;
                    delegateTarget = el;
                    var tracking = {
                        category: delegateTarget.getAttribute('data-analytics-category'),
                        action: delegateTarget.getAttribute('data-analytics-action'),
                        label: delegateTarget.getAttribute('data-analytics-label'),
                        value: delegateTarget.getAttribute('data-analytics-value')
                    };
                    _this.trackClick(tracking.category, tracking.action, tracking.label, tracking.value);
                    return;
                } while ((el = el.parentNode));
            });
        };
        AnalyticsGoogle.prototype.trackClick = function (category, action, label, value) {
            if (!this.enableClickTracking)
                return;
            if (!this.initialized) {
                this.log.warn("Please call 'init()' before calling 'start()'.");
                return;
            }
            this.ga('send', 'event', category, action, label, value);
        };
        AnalyticsGoogle.prototype.trackPage = function (path, title) {
            if (!this.enableNavigationTracking)
                return;
            if (!this.initialized) {
                this.log.warn("Please call 'init()' before calling 'start()'.");
                return;
            }
            this.ga('set', {
                page: path,
                title: title,
                anonymizeIp: this.anonymizeIp
            });
            this.ga('send', 'pageview');
        };
        return AnalyticsGoogle;
    }());
    exports.AnalyticsGoogle = AnalyticsGoogle;
});
