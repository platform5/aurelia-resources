System.register(["aurelia-framework", "moment", "aurelia-logging"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, moment, aurelia_logging_1, ArTimelineItem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (moment_1) {
                moment = moment_1;
            },
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            }
        ],
        execute: function () {
            ArTimelineItem = /** @class */ (function () {
                function ArTimelineItem() {
                    this.date = null;
                    this.order = null;
                    this.hidden = false;
                    this.position = 'left';
                    this.log = aurelia_logging_1.getLogger('ar-timeline-item');
                }
                ArTimelineItem.prototype.dateChanged = function () {
                    var instanceOfDate = this.date instanceof Date;
                    if (instanceOfDate)
                        return;
                    if (typeof this.date === 'string') {
                        var m = moment(this.date);
                        if (m.isValid)
                            this.date = m.toDate();
                    }
                };
                __decorate([
                    aurelia_framework_1.bindable
                ], ArTimelineItem.prototype, "date", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], ArTimelineItem.prototype, "position", void 0);
                return ArTimelineItem;
            }());
            exports_1("ArTimelineItem", ArTimelineItem);
        }
    };
});
