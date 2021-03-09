var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-templating", "aurelia-dependency-injection", "@aurelia-ux/core", "aurelia-logging", "aurelia-event-aggregator"], function (require, exports, aurelia_templating_1, aurelia_dependency_injection_1, core_1, aurelia_logging_1, aurelia_event_aggregator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ArMetadata = /** @class */ (function () {
        function ArMetadata(element, styleEngine, eventAggregator) {
            this.element = element;
            this.styleEngine = styleEngine;
            this.eventAggregator = eventAggregator;
            this.fakeValue = [];
            //@children('ar-metadata-item') private items: Array<ArMetadataItem> = [];
            this.focused = false;
            this.log = aurelia_logging_1.getLogger('ar-metadata');
        }
        ArMetadata.prototype.bind = function () {
            var element = this.element;
            this.themeChanged(this.theme);
        };
        ArMetadata.prototype.attached = function () {
            //this.moveToBodyTag();
        };
        ArMetadata.prototype.detached = function () {
            //this.removeFromBodyTag();
        };
        ArMetadata.prototype.moveToBodyTag = function () {
            document.getElementsByTagName('BODY')[0].appendChild(this.editorContainer);
        };
        ArMetadata.prototype.removeFromBodyTag = function () {
            document.getElementsByTagName('BODY')[0].removeChild(this.editorContainer);
        };
        ArMetadata.prototype.themeChanged = function (newValue) {
            if (newValue != null && newValue.themeKey == null) {
                newValue.themeKey = 'ar-metadata';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        };
        ArMetadata.prototype.valueChanged = function () {
            if (this.value === null) {
                this.value = undefined;
            }
            else if (typeof this.value === 'string') {
                this.value = this.value.split(',');
            }
            else if (!Array.isArray(this.value)) {
                this.value = [];
            }
        };
        ArMetadata.prototype.focus = function () {
            this.focused = true;
            this.dialog.open();
            this.originalValue = this.value;
        };
        ArMetadata.prototype.closeEditor = function () {
            this.dialog.close();
            this.focused = false;
        };
        ArMetadata.prototype.stopPropagation = function (event) {
            event.stopPropagation();
        };
        ArMetadata.prototype.addItem = function (event) {
            event.stopPropagation();
            if (!Array.isArray(this.value))
                this.value = [];
            this.value.push({ key: '', value: '' });
        };
        ArMetadata.prototype.removeItem = function (index, event) {
            event.stopPropagation();
            this.value.splice(index, 1);
        };
        __decorate([
            aurelia_templating_1.bindable
        ], ArMetadata.prototype, "theme", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArMetadata.prototype, "value", void 0);
        ArMetadata = __decorate([
            aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine, aurelia_event_aggregator_1.EventAggregator),
            aurelia_templating_1.customElement('ar-metadata')
        ], ArMetadata);
        return ArMetadata;
    }());
    exports.ArMetadata = ArMetadata;
});
