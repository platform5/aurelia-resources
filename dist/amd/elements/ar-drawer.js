var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-templating", "aurelia-dependency-injection", "@aurelia-ux/core", "aurelia-logging", "aurelia-event-aggregator", "aurelia-framework"], function (require, exports, aurelia_templating_1, aurelia_dependency_injection_1, core_1, aurelia_logging_1, aurelia_event_aggregator_1, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onDrawerStatusChanged = exports.toggleDrawer = exports.closeDrawer = exports.openDrawer = exports.ArDrawerCloseAttribute = exports.ArDrawerOpenAttribute = exports.ArDrawerToggleAttribute = exports.ArDrawer = void 0;
    var ArDrawer = /** @class */ (function () {
        function ArDrawer(element, styleEngine, eventAggregator) {
            this.element = element;
            this.styleEngine = styleEngine;
            this.eventAggregator = eventAggregator;
            this.position = 'left'; // left, top, right, bottom
            this.animate = true;
            this.fullScreen = false;
            this.overlay = false;
            this.showBar = false;
            this.title = '';
            this.opened = false;
            this.overlayShowed = false;
            this.zIndex = 200;
            this.log = aurelia_logging_1.getLogger('ar-drawer');
            this.handleResize = function (e) {
            };
        }
        ArDrawer_1 = ArDrawer;
        ArDrawer.prototype.bind = function () {
            var element = this.element;
            this.themeChanged(this.theme);
        };
        ArDrawer.prototype.attached = function () {
            this.handleResize(null);
            window.addEventListener('resize', this.handleResize);
            if (this.fullScreen || !this.fullScreen)
                this.moveToBodyTag();
        };
        ArDrawer.prototype.detached = function () {
            window.removeEventListener('resize', this.handleResize);
            if (this.fullScreen || !this.fullScreen)
                this.removeFromBodyTag();
        };
        ArDrawer.prototype.moveToBodyTag = function () {
            var body = document.getElementsByTagName('BODY')[0];
            body.appendChild(this.element);
            this.overlayElement = document.createElement('div');
            this.overlayElement.classList.add('drawer-overlay');
        };
        ArDrawer.prototype.removeFromBodyTag = function () {
            document.getElementsByTagName('BODY')[0].removeChild(this.element);
        };
        ArDrawer.prototype.showOverlay = function () {
            var _this = this;
            if (this.overlayShowed)
                return;
            if (this.animate) {
                this.overlayElement.classList.remove('visible');
                this.overlayElement.classList.add('animate');
            }
            var body = document.getElementsByTagName('BODY')[0];
            body.insertBefore(this.overlayElement, this.element);
            this.overlayShowed = true;
            setTimeout(function () {
                _this.overlayElement.classList.add('visible');
            }, 10);
            Array.from(document.querySelectorAll('.vscroll')).forEach(function (i) { return i.classList.add('vscroll-canceled-by-drawer-overlay'); });
            Array.from(document.querySelectorAll('.hscroll')).forEach(function (i) { return i.classList.add('hscroll-canceled-by-drawer-overlay'); });
            this.overlayElement.addEventListener('click', function (event) {
                _this.close();
                event.stopPropagation();
                return false;
            });
        };
        ArDrawer.prototype.hideOverlay = function () {
            var _this = this;
            if (!this.overlayShowed)
                return;
            var body = document.getElementsByTagName('BODY')[0];
            Array.from(document.querySelectorAll('.vscroll-canceled-by-drawer-overlay')).forEach(function (i) { return i.classList.remove('vscroll-canceled-by-drawer-overlay'); });
            Array.from(document.querySelectorAll('.hscroll-canceled-by-drawer-overlay')).forEach(function (i) { return i.classList.remove('hscroll-canceled-by-drawer-overlay'); });
            if (!this.animate) {
                body.removeChild(this.overlayElement);
            }
            else {
                this.overlayElement.classList.remove('visible');
                setTimeout(function () {
                    body.removeChild(_this.overlayElement);
                }, 500);
            }
            this.overlayShowed = false;
        };
        ArDrawer.prototype.themeChanged = function (newValue) {
            if (newValue != null && newValue.themeKey == null) {
                newValue.themeKey = 'ar-drawer';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        };
        ArDrawer.prototype.open = function () {
            ArDrawer_1.drawerLayers++;
            this.setZIndex();
            var notice = false;
            if (!this.opened) {
                notice = true;
            }
            this.opened = true;
            if (notice)
                this.noticeApp();
            if (this.overlay)
                this.showOverlay();
        };
        ArDrawer.prototype.close = function () {
            ArDrawer_1.drawerLayers--;
            var notice = false;
            if (this.opened) {
                notice = true;
            }
            this.opened = false;
            if (notice)
                this.noticeApp();
            if (this.overlay)
                this.hideOverlay();
        };
        ArDrawer.prototype.setZIndex = function () {
            this.zIndex = ArDrawer_1.zIndexRef + ArDrawer_1.drawerLayers;
        };
        ArDrawer.prototype.toggle = function () {
            if (this.opened)
                this.close();
            else
                this.open();
        };
        ArDrawer.prototype.noticeApp = function () {
            if (this.opened) {
                this.eventAggregator.publish('ar-drawer-open', { id: this.id });
            }
            else {
                this.eventAggregator.publish('ar-drawer-close', { id: this.id });
            }
            this.eventAggregator.publish('ar-drawer-toggle', { id: this.id, opened: this.opened });
        };
        var ArDrawer_1;
        ArDrawer.zIndexRef = 200;
        ArDrawer.drawerLayers = 0;
        __decorate([
            aurelia_templating_1.bindable
        ], ArDrawer.prototype, "id", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArDrawer.prototype, "position", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArDrawer.prototype, "animate", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArDrawer.prototype, "fullScreen", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArDrawer.prototype, "overlay", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArDrawer.prototype, "showBar", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArDrawer.prototype, "title", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArDrawer.prototype, "theme", void 0);
        ArDrawer = ArDrawer_1 = __decorate([
            aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine, aurelia_event_aggregator_1.EventAggregator),
            aurelia_templating_1.customElement('ar-drawer')
        ], ArDrawer);
        return ArDrawer;
    }());
    exports.ArDrawer = ArDrawer;
    var ArDrawerToggleAttribute = /** @class */ (function () {
        function ArDrawerToggleAttribute(element) {
            this.element = element;
            this.subs = [];
        }
        ArDrawerToggleAttribute.prototype.attached = function () {
            var sub = this.onClick.bind(this);
            this.subs.push(sub);
            this.element.addEventListener('click', sub);
        };
        ArDrawerToggleAttribute.prototype.detached = function () {
            if (this.subs)
                for (var _i = 0, _a = this.subs; _i < _a.length; _i++) {
                    var sub = _a[_i];
                    this.element.removeEventListener('click', sub);
                }
        };
        ArDrawerToggleAttribute.prototype.onClick = function (event) {
            event.preventDefault();
            var vm = getArDrawerFromId(this.value);
            if (vm) {
                vm.toggle();
            }
        };
        ArDrawerToggleAttribute = __decorate([
            aurelia_framework_1.customAttribute('ar-drawer-toggle'),
            aurelia_framework_1.noView,
            aurelia_dependency_injection_1.inject(Element)
        ], ArDrawerToggleAttribute);
        return ArDrawerToggleAttribute;
    }());
    exports.ArDrawerToggleAttribute = ArDrawerToggleAttribute;
    var ArDrawerOpenAttribute = /** @class */ (function () {
        function ArDrawerOpenAttribute(element) {
            this.element = element;
            this.subs = [];
        }
        ArDrawerOpenAttribute.prototype.attached = function () {
            var sub = this.onClick.bind(this);
            this.subs.push(sub);
            this.element.addEventListener('click', sub);
        };
        ArDrawerOpenAttribute.prototype.detached = function () {
            if (this.subs)
                for (var _i = 0, _a = this.subs; _i < _a.length; _i++) {
                    var sub = _a[_i];
                    this.element.removeEventListener('click', sub);
                }
        };
        ArDrawerOpenAttribute.prototype.onClick = function (event) {
            event.preventDefault();
            var vm = getArDrawerFromId(this.value);
            if (vm) {
                vm.open();
            }
        };
        ArDrawerOpenAttribute = __decorate([
            aurelia_framework_1.customAttribute('ar-drawer-open'),
            aurelia_framework_1.noView,
            aurelia_dependency_injection_1.inject(Element)
        ], ArDrawerOpenAttribute);
        return ArDrawerOpenAttribute;
    }());
    exports.ArDrawerOpenAttribute = ArDrawerOpenAttribute;
    var ArDrawerCloseAttribute = /** @class */ (function () {
        function ArDrawerCloseAttribute(element) {
            this.element = element;
            this.subs = [];
        }
        ArDrawerCloseAttribute.prototype.attached = function () {
            var sub = this.onClick.bind(this);
            this.subs.push(sub);
            this.element.addEventListener('click', sub);
        };
        ArDrawerCloseAttribute.prototype.detached = function () {
            if (this.subs)
                for (var _i = 0, _a = this.subs; _i < _a.length; _i++) {
                    var sub = _a[_i];
                    this.element.removeEventListener('click', sub);
                }
        };
        ArDrawerCloseAttribute.prototype.onClick = function (event) {
            event.preventDefault();
            var vm = getArDrawerFromId(this.value);
            if (vm) {
                vm.close();
            }
        };
        ArDrawerCloseAttribute = __decorate([
            aurelia_framework_1.customAttribute('ar-drawer-close'),
            aurelia_framework_1.noView,
            aurelia_dependency_injection_1.inject(Element)
        ], ArDrawerCloseAttribute);
        return ArDrawerCloseAttribute;
    }());
    exports.ArDrawerCloseAttribute = ArDrawerCloseAttribute;
    function getArDrawerFromId(id) {
        var element = document.querySelector('#' + id);
        if (element && element.au && element.au.controller && element.au.controller.viewModel) {
            var vm = element.au.controller.viewModel;
            if (vm instanceof ArDrawer) {
                return vm;
            }
        }
        return null;
    }
    function openDrawer(id) {
        var vm = getArDrawerFromId(id);
        if (vm)
            vm.open();
    }
    exports.openDrawer = openDrawer;
    function closeDrawer(id) {
        var vm = getArDrawerFromId(id);
        if (vm)
            vm.close();
    }
    exports.closeDrawer = closeDrawer;
    function toggleDrawer(id) {
        var vm = getArDrawerFromId(id);
        if (vm)
            vm.toggle();
    }
    exports.toggleDrawer = toggleDrawer;
    function onDrawerStatusChanged(id, settings) {
        if (settings === void 0) { settings = { setup: 'attached', teardown: 'detached', onChanged: 'drawerStatusChanged' }; }
        var eventAggregator = aurelia_framework_1.Container.instance.get(aurelia_event_aggregator_1.EventAggregator);
        return function (target) {
            var subscription;
            var originalSetup = typeof settings === 'object' && settings.setup
                ? target.prototype[settings.setup]
                : target.prototype.bind;
            var originalTeardown = typeof settings === 'object' && settings.teardown
                ? target.prototype[settings.teardown]
                : target.prototype.unbind;
            target.prototype[typeof settings === 'object' && settings.setup ? settings.setup : 'bind'] = function () {
                var _this = this;
                if (typeof settings == 'object' &&
                    typeof settings.onChanged === 'string' &&
                    !(settings.onChanged in this)) {
                    throw new Error('Provided onChanged handler does not exist on target VM');
                }
                subscription = eventAggregator.subscribe('ar-drawer-toggle', function (data) {
                    if (data.id === id) {
                        if (typeof settings == 'object' &&
                            typeof settings.onChanged === 'string') {
                            _this[settings.onChanged](data.opened);
                        }
                    }
                });
                if (originalSetup) {
                    return originalSetup.apply(this, arguments);
                }
            };
            target.prototype[typeof settings === 'object' && settings.teardown ? settings.teardown : 'unbind'] = function () {
                subscription.dispose();
                if (originalTeardown) {
                    return originalTeardown.apply(this, arguments);
                }
            };
        };
    }
    exports.onDrawerStatusChanged = onDrawerStatusChanged;
});
