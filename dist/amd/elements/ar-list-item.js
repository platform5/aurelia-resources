var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-templating"], function (require, exports, aurelia_templating_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //@containerless
    var ArListItem = /** @class */ (function () {
        function ArListItem() {
            //@bindable public theme = null;
            this.collapsed = true;
            this.toggleOnIcon = false;
            this.toggleOnContent = false;
            this.toggleOnActions = true;
        }
        ArListItem.prototype.clickOnIcon = function () {
            if (this.toggleOnIcon)
                return this.toggleCollapsed();
        };
        ArListItem.prototype.clickOnContent = function () {
            if (this.toggleOnContent)
                return this.toggleCollapsed();
        };
        ArListItem.prototype.clickOnActions = function () {
            if (this.toggleOnActions)
                return this.toggleCollapsed();
        };
        ArListItem.prototype.toggleCollapsed = function () {
            this.collapsed = !this.collapsed;
        };
        __decorate([
            aurelia_templating_1.bindable
        ], ArListItem.prototype, "collapsed", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArListItem.prototype, "toggleOnIcon", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArListItem.prototype, "toggleOnContent", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArListItem.prototype, "toggleOnActions", void 0);
        ArListItem = __decorate([
            aurelia_templating_1.customElement('ar-list-item')
        ], ArListItem);
        return ArListItem;
    }());
    exports.ArListItem = ArListItem;
});
