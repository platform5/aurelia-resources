"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analytics = exports.AnalyticEntry = void 0;
var string_1 = require("./string");
var moment = require("moment");
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_router_1 = require("aurelia-router");
var aurelia_logging_1 = require("aurelia-logging");
var log = aurelia_logging_1.getLogger('analytics');
var AnalyticEntry = /** @class */ (function () {
    function AnalyticEntry(type, path) {
        this.type = 'navigation';
        this._isSaved = false;
        this.date = moment().toDate();
        this.type = type;
        this.path = path;
    }
    AnalyticEntry.navigation = function (path, title) {
        var entry = new AnalyticEntry('navigation', path);
        entry.path = path;
        entry.title = title;
        return entry;
    };
    AnalyticEntry.click = function (path, category, action, label, value) {
        var entry = new AnalyticEntry('click', path);
        entry.category = category;
        entry.action = action;
        entry.title = label;
        entry.value = value;
        return entry;
    };
    AnalyticEntry.event = function (path, category, action, label, value) {
        var entry = new AnalyticEntry('event', path);
        entry.category = category;
        entry.action = action;
        entry.title = label;
        entry.value = value;
        return entry;
    };
    Object.defineProperty(AnalyticEntry.prototype, "isSaved", {
        get: function () {
            return this._isSaved;
        },
        enumerable: false,
        configurable: true
    });
    AnalyticEntry.prototype.saved = function () {
        this._isSaved = true;
    };
    AnalyticEntry.prototype.output = function () {
        return {
            date: this.date,
            type: this.type,
            path: this.path,
            category: this.category,
            action: this.action,
            title: this.title,
            value: this.value,
        };
    };
    return AnalyticEntry;
}());
exports.AnalyticEntry = AnalyticEntry;
var Analytics = /** @class */ (function () {
    function Analytics(id) {
        this.entries = [];
        this.enableNavigationTracking = false;
        this.enableClickTracking = false;
        this.enableEventTracking = false;
        this.saveOnNavigation = false;
        this.saveOnClick = false;
        this.saveOnEvent = false;
        this.listenRouter = false;
        this.currentPath = '';
        this.setSessionId(id);
    }
    Analytics.prototype.setSessionId = function (id) {
        if (id) {
            this.sessionId = id;
        }
        else {
            this.sessionId = string_1.StringHelpers.random({ charset: 'alphanumeric', length: 32 });
        }
    };
    Analytics.prototype.setIdentity = function (identity) {
        this.identity = identity;
    };
    Analytics.prototype.setListeners = function () {
        var _this = this;
        var ea = aurelia_framework_1.Container.instance.get(aurelia_event_aggregator_1.EventAggregator);
        ea.subscribe('router:navigation:success', function (event) {
            if (!_this.listenRouter)
                return;
            var instruction = event.instruction;
            _this.navigation(instruction.fragment + '?' + instruction.queryString, instruction.config.name);
        });
        ea.subscribe('analytics:navigation', function (event) {
            if (event instanceof aurelia_router_1.NavigationInstruction) {
                _this.navigation(event.fragment + '?' + event.queryString, event.config.name);
            }
            else if (event.key) {
                _this.navigation(event.key, event.fullUri);
            }
        });
        ea.subscribe('analytics:click', function (event) {
            if (event.key) {
                event.category = event.key; // for compatibility
            }
            _this.click(event.category, event.action, event.label, event.value);
        });
        ea.subscribe('analytics:event', function (event) {
            if (event.key) {
                event.category = event.key; // for compatibility
            }
            _this.event(event.category, event.action, event.label, event.value);
        });
        ea.subscribe('analytics:request-save', function (event) {
            _this.save();
        });
    };
    Analytics.prototype.navigation = function (path, title) {
        this.currentPath = path;
        if (!this.enableNavigationTracking)
            return;
        this.entries.push(AnalyticEntry.navigation(path, title));
        if (this.saveOnNavigation)
            this.save();
    };
    Analytics.prototype.click = function (category, action, label, value) {
        if (action === void 0) { action = ''; }
        if (label === void 0) { label = ''; }
        if (value === void 0) { value = undefined; }
        if (!this.enableClickTracking)
            return;
        this.entries.push(AnalyticEntry.click(this.currentPath, category, action, label, value));
        if (this.saveOnClick)
            this.save();
    };
    Analytics.prototype.event = function (category, action, label, value) {
        if (action === void 0) { action = ''; }
        if (label === void 0) { label = ''; }
        if (value === void 0) { value = undefined; }
        if (!this.enableEventTracking)
            return;
        this.entries.push(AnalyticEntry.event(this.currentPath, category, action, label, value));
        if (this.saveOnEvent)
            this.save();
    };
    Analytics.prototype.save = function (onlyUnsaved) {
        var _this = this;
        if (onlyUnsaved === void 0) { onlyUnsaved = true; }
        if (this.saveTimeout)
            clearTimeout();
        this.saveTimeout = setTimeout(function () {
            var data = [];
            for (var _i = 0, _a = _this.entries; _i < _a.length; _i++) {
                var entry = _a[_i];
                if (entry.isSaved && onlyUnsaved)
                    continue;
                var output = entry.output();
                output.sessionId = _this.sessionId;
                if (_this.identity)
                    output.identity = _this.identity;
                data.push(output);
                entry.saved();
            }
            var ea = aurelia_framework_1.Container.instance.get(aurelia_event_aggregator_1.EventAggregator);
            ea.publish('analytics:save', data);
        }, 50);
    };
    return Analytics;
}());
exports.Analytics = Analytics;
