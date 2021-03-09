var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "../helpers/string", "aurelia-templating", "aurelia-dependency-injection", "@aurelia-ux/core", "aurelia-logging", "aurelia-event-aggregator", "aurelia-framework"], function (require, exports, string_1, aurelia_templating_1, aurelia_dependency_injection_1, core_1, aurelia_logging_1, aurelia_event_aggregator_1, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ArStripeElement = /** @class */ (function () {
        function ArStripeElement(element, styleEngine, eventAggregator) {
            this.element = element;
            this.styleEngine = styleEngine;
            this.eventAggregator = eventAggregator;
            this.type = 'card';
            this.hidePostalCode = true;
            this.apiKey = '';
            this.stripeReady = false;
            this.errorMessage = '';
            this.log = aurelia_logging_1.getLogger('ar-stripe-element');
        }
        ArStripeElement.prototype.bind = function () {
            var element = this.element;
            this.themeChanged(this.theme);
        };
        ArStripeElement.prototype.getApiKey = function () {
            if (this.apiKey)
                return this.apiKey;
            var config = aurelia_framework_1.Container.instance.get('aurelia-resources-config');
            if (config && config.stripe && config.stripe.apiKey)
                return config.stripe.apiKey;
            return null;
        };
        ArStripeElement.prototype.attached = function () {
            var _this = this;
            var apiKey = this.getApiKey();
            if (!apiKey)
                throw new Error('Missing Stripe API Key');
            if (!this.id)
                this.id = string_1.StringHelpers.randomString();
            this.loadStripe();
            this.isStripReady().then(function () {
                _this.stripe = window.Stripe(apiKey);
                _this.createStripeElement();
            });
        };
        ArStripeElement.prototype.createStripeElement = function () {
            switch (this.type) {
                case 'card': return this.createCardElement();
            }
        };
        ArStripeElement.prototype.createCardElement = function () {
            var _this = this;
            var elements = this.stripe.elements();
            var style = {
                base: {
                    // Add your base input styles here. For example:
                    fontSize: '16px',
                    color: 'inherit',
                }
            };
            // Create an instance of the card Element.
            this.card = elements.create('card', { style: style, hidePostalCode: this.hidePostalCode });
            // Add an instance of the card Element into the `card-element` <div>.
            this.card.mount("#stripe-" + this.id);
            this.card.addEventListener('change', function (_a) {
                var error = _a.error;
                if (error) {
                    _this.errorMessage = error.message;
                }
                else {
                    _this.errorMessage = '';
                }
            });
        };
        ArStripeElement.prototype.detached = function () {
        };
        ArStripeElement.prototype.loadStripe = function () {
            var body = document.querySelectorAll('body')[0];
            // check if we already have requested stripe loading
            if (!body.classList.contains('stripe-requested')) {
                // request stripe
                var script = document.createElement('script');
                script.src = 'https://js.stripe.com/v3/';
                body.appendChild(script);
                body.classList.add('stripe-requested');
            }
        };
        ArStripeElement.prototype.isStripReady = function () {
            var _this = this;
            if (this.stripeReady || window.Stripe)
                return Promise.resolve(true);
            return new Promise(function (resolve, reject) {
                var count = 0;
                var interval = setInterval(function () {
                    if (window.Stripe) {
                        _this.stripeReady = true;
                        clearInterval(interval);
                        resolve(true);
                    }
                    if (count >= 100) {
                        reject(new Error('Stripe unavailable'));
                    }
                }, 100);
            });
        };
        ArStripeElement.prototype.themeChanged = function (newValue) {
            if (newValue != null && newValue.themeKey == null) {
                newValue.themeKey = 'stripe-element';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        };
        ArStripeElement.prototype.createToken = function () {
            var _this = this;
            if (!this.card)
                return Promise.reject(new Error('createToken can only be called once a card has been created'));
            return this.stripe.createToken(this.card).then(function (result) {
                if (result.error) {
                    _this.errorMessage = result.error.message;
                    return Promise.reject(result.error);
                }
                else {
                    return result.token;
                }
            });
        };
        __decorate([
            aurelia_templating_1.bindable
        ], ArStripeElement.prototype, "id", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArStripeElement.prototype, "type", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArStripeElement.prototype, "hidePostalCode", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArStripeElement.prototype, "apiKey", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], ArStripeElement.prototype, "theme", void 0);
        ArStripeElement = __decorate([
            aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine, aurelia_event_aggregator_1.EventAggregator),
            aurelia_templating_1.customElement('ar-stripe-element')
        ], ArStripeElement);
        return ArStripeElement;
    }());
    exports.ArStripeElement = ArStripeElement;
});
