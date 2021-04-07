"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArSearchInput = exports.ArSliderTheme = exports.ArSlide = exports.ArSlider = exports.ArSelectTheme = exports.ArOption = exports.ArSelect = exports.ArRangeInputTheme = exports.ArRangeInput = exports.ArProgressTheme = exports.ArProgress = exports.ArParallax = exports.ArNextTheme = exports.ArNext = exports.ArMetadataTheme = exports.ArMetadata = exports.ArMainFooterTheme = exports.ArMainFooter = exports.ArMainHeaderTheme = exports.ArMainHeader = exports.ArListTheme = exports.ArListItem = exports.ArDrawerTheme = exports.onDrawerStatusChanged = exports.ArDrawerCloseAttribute = exports.ArDrawerOpenAttribute = exports.ArDrawerToggleAttribute = exports.ArDrawer = exports.ArDialogPrompt = exports.ArDialogTheme = exports.arDialog = exports.ArDialog = exports.ArBreadcrumbTheme = exports.ArBreadcrumb = exports.locales = exports.languages = exports.countries = exports.ImageHelpers = exports.ImageUtils = exports.StringHelpers = exports.DomHelpers = exports.SentryHelper = exports.Parser = exports.PageVisibilityHelpers = exports.CordovaHelpers = exports.AnalyticsGoogle = exports.AnalyticEntry = exports.Analytics = exports.Api = exports.configure = void 0;
exports.SmoothScroll = exports.UxInputIntPhone = exports.ArVideoTheme = exports.ArVideo = exports.ArTimelineItem = exports.ArTimelineTheme = exports.ArTimeline = exports.ArStripeElementTheme = exports.ArStripeElement = exports.ArSpinnerLineTheme = exports.ArSpinnerLine = exports.ArSpinnerIconTheme = exports.ArSpinnerIcon = exports.ArSmartToolbarTheme = exports.ArSmartToolbar = exports.ArSearchInputTheme = void 0;
var sentry_1 = require("./helpers/sentry");
var aurelia_framework_1 = require("aurelia-framework");
var numbers_1 = require("./value-converters/numbers");
function configure(config, pluginConfig) {
    config.container.registerInstance('aurelia-resources-config', pluginConfig || {});
    var sentry = config.container.get(sentry_1.SentryHelper);
    sentry.initIfConfigured();
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./controls/ar-tags-input'),
        aurelia_framework_1.PLATFORM.moduleName('./controls/filter-boolean-control'),
        aurelia_framework_1.PLATFORM.moduleName('./controls/filter-chips-control'),
        aurelia_framework_1.PLATFORM.moduleName('./controls/filter-date-control'),
        aurelia_framework_1.PLATFORM.moduleName('./controls/filter-dates-control'),
        aurelia_framework_1.PLATFORM.moduleName('./controls/filter-prompt-control'),
        aurelia_framework_1.PLATFORM.moduleName('./controls/filter-control'),
        aurelia_framework_1.PLATFORM.moduleName('./controls/select-control'),
        aurelia_framework_1.PLATFORM.moduleName('./controls/ux-date-time-picker'),
    ]);
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./elements/listing/listing-head'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/listing/listing-list-item'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/listing/listing-list'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/listing/listing-toolbar'),
    ]);
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./dialogs/confirm-dialog'),
        aurelia_framework_1.PLATFORM.moduleName('./dialogs/countries-dialog'),
        aurelia_framework_1.PLATFORM.moduleName('./dialogs/languages-dialog'),
        aurelia_framework_1.PLATFORM.moduleName('./dialogs/locales-dialog'),
        aurelia_framework_1.PLATFORM.moduleName('./dialogs/prompt-boolean-dialog'),
        aurelia_framework_1.PLATFORM.moduleName('./dialogs/prompt-date-dialog'),
        aurelia_framework_1.PLATFORM.moduleName('./dialogs/prompt-select-dialog'),
        aurelia_framework_1.PLATFORM.moduleName('./dialogs/prompt-text-dialog'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-breadcrumb'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-breadcrumb-item.html'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-dialog-prompt'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-dialog'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-drawer'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-lang-selector'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-list-item'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-main-header'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-main-footer'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-metadata'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-next'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-next-item.html'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-notification'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-parallax'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-progress'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-range-input'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-select'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-option'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-slider'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-slide'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-search-input'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-smart-toolbar'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-spinner-icon'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-spinner-line'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-stripe-element'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-timeline'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-timeline-item'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ar-video'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/noie'),
        aurelia_framework_1.PLATFORM.moduleName('./elements/ux-input-int-phone'),
        aurelia_framework_1.PLATFORM.moduleName('./value-converters/currency'),
        aurelia_framework_1.PLATFORM.moduleName('./value-converters/date'),
        aurelia_framework_1.PLATFORM.moduleName('./value-converters/first-letter-upper'),
        aurelia_framework_1.PLATFORM.moduleName('./value-converters/phone'),
        aurelia_framework_1.PLATFORM.moduleName('./value-converters/langname'),
        aurelia_framework_1.PLATFORM.moduleName('./value-converters/countryname'),
        aurelia_framework_1.PLATFORM.moduleName('./value-converters/locale-name'),
        aurelia_framework_1.PLATFORM.moduleName('./value-converters/nl2br'),
        aurelia_framework_1.PLATFORM.moduleName('./value-converters/object-keys'),
        // PLATFORM.moduleName('./value-converters/round'),
        numbers_1.NumStringValueConverter,
        numbers_1.RoundValueConverter,
        numbers_1.AddZeroDecimalValueConverter,
        aurelia_framework_1.PLATFORM.moduleName('./value-converters/translate'),
        aurelia_framework_1.PLATFORM.moduleName('./attributes/smooth-scroll'),
        aurelia_framework_1.PLATFORM.moduleName('./attributes/touch-active'),
    ]);
    config.container.registerInstance('aurelia-resources-config', pluginConfig);
}
exports.configure = configure;
/* Expose helpers */
var api_1 = require("./helpers/api");
Object.defineProperty(exports, "Api", { enumerable: true, get: function () { return api_1.Api; } });
var analytics_1 = require("./helpers/analytics");
Object.defineProperty(exports, "Analytics", { enumerable: true, get: function () { return analytics_1.Analytics; } });
Object.defineProperty(exports, "AnalyticEntry", { enumerable: true, get: function () { return analytics_1.AnalyticEntry; } });
var analytics_google_1 = require("./helpers/analytics-google");
Object.defineProperty(exports, "AnalyticsGoogle", { enumerable: true, get: function () { return analytics_google_1.AnalyticsGoogle; } });
var cordova_1 = require("./helpers/cordova");
Object.defineProperty(exports, "CordovaHelpers", { enumerable: true, get: function () { return cordova_1.CordovaHelpers; } });
var page_visibility_1 = require("./helpers/page-visibility");
Object.defineProperty(exports, "PageVisibilityHelpers", { enumerable: true, get: function () { return page_visibility_1.PageVisibilityHelpers; } });
var parser_1 = require("./helpers/parser");
Object.defineProperty(exports, "Parser", { enumerable: true, get: function () { return parser_1.Parser; } });
var sentry_2 = require("./helpers/sentry");
Object.defineProperty(exports, "SentryHelper", { enumerable: true, get: function () { return sentry_2.SentryHelper; } });
var dom_1 = require("./helpers/dom");
Object.defineProperty(exports, "DomHelpers", { enumerable: true, get: function () { return dom_1.DomHelpers; } });
var string_1 = require("./helpers/string");
Object.defineProperty(exports, "StringHelpers", { enumerable: true, get: function () { return string_1.StringHelpers; } });
var image_1 = require("./helpers/image");
Object.defineProperty(exports, "ImageUtils", { enumerable: true, get: function () { return image_1.ImageUtils; } });
Object.defineProperty(exports, "ImageHelpers", { enumerable: true, get: function () { return image_1.ImageHelpers; } });
var countries_1 = require("./helpers/countries");
Object.defineProperty(exports, "countries", { enumerable: true, get: function () { return countries_1.countries; } });
var languages_1 = require("./helpers/languages");
Object.defineProperty(exports, "languages", { enumerable: true, get: function () { return languages_1.languages; } });
var locales_1 = require("./helpers/locales");
Object.defineProperty(exports, "locales", { enumerable: true, get: function () { return locales_1.locales; } });
__exportStar(require("./helpers/notify"), exports);
__exportStar(require("./helpers/date"), exports);
__exportStar(require("./helpers/number"), exports);
__exportStar(require("./helpers/ux-form-renderer"), exports);
/* Expose Controls */
__exportStar(require("./controls/filter-boolean-control"), exports);
__exportStar(require("./controls/filter-chips-control"), exports);
__exportStar(require("./controls/filter-date-control"), exports);
__exportStar(require("./controls/filter-dates-control"), exports);
__exportStar(require("./controls/filter-prompt-control"), exports);
__exportStar(require("./controls/filter-control"), exports);
__exportStar(require("./controls/select-control"), exports);
__exportStar(require("./controls/ux-date-time-picker"), exports);
/* Expose Dialogs */
__exportStar(require("./dialogs/confirm-dialog"), exports);
__exportStar(require("./dialogs/countries-dialog"), exports);
__exportStar(require("./dialogs/languages-dialog"), exports);
__exportStar(require("./dialogs/locales-dialog"), exports);
__exportStar(require("./dialogs/prompt-boolean-dialog"), exports);
__exportStar(require("./dialogs/prompt-date-dialog"), exports);
__exportStar(require("./dialogs/prompt-select-dialog"), exports);
__exportStar(require("./dialogs/prompt-text-dialog"), exports);
/* Expose elements */
var ar_breadcrumb_1 = require("./elements/ar-breadcrumb");
Object.defineProperty(exports, "ArBreadcrumb", { enumerable: true, get: function () { return ar_breadcrumb_1.ArBreadcrumb; } });
var ar_breadcrumb_theme_1 = require("./elements/ar-breadcrumb-theme");
Object.defineProperty(exports, "ArBreadcrumbTheme", { enumerable: true, get: function () { return ar_breadcrumb_theme_1.ArBreadcrumbTheme; } });
var ar_dialog_1 = require("./elements/ar-dialog");
Object.defineProperty(exports, "ArDialog", { enumerable: true, get: function () { return ar_dialog_1.ArDialog; } });
Object.defineProperty(exports, "arDialog", { enumerable: true, get: function () { return ar_dialog_1.arDialog; } });
var ar_dialog_theme_1 = require("./elements/ar-dialog-theme");
Object.defineProperty(exports, "ArDialogTheme", { enumerable: true, get: function () { return ar_dialog_theme_1.ArDialogTheme; } });
var ar_dialog_prompt_1 = require("./elements/ar-dialog-prompt");
Object.defineProperty(exports, "ArDialogPrompt", { enumerable: true, get: function () { return ar_dialog_prompt_1.ArDialogPrompt; } });
var ar_drawer_1 = require("./elements/ar-drawer");
Object.defineProperty(exports, "ArDrawer", { enumerable: true, get: function () { return ar_drawer_1.ArDrawer; } });
Object.defineProperty(exports, "ArDrawerToggleAttribute", { enumerable: true, get: function () { return ar_drawer_1.ArDrawerToggleAttribute; } });
Object.defineProperty(exports, "ArDrawerOpenAttribute", { enumerable: true, get: function () { return ar_drawer_1.ArDrawerOpenAttribute; } });
Object.defineProperty(exports, "ArDrawerCloseAttribute", { enumerable: true, get: function () { return ar_drawer_1.ArDrawerCloseAttribute; } });
Object.defineProperty(exports, "onDrawerStatusChanged", { enumerable: true, get: function () { return ar_drawer_1.onDrawerStatusChanged; } });
var ar_drawer_theme_1 = require("./elements/ar-drawer-theme");
Object.defineProperty(exports, "ArDrawerTheme", { enumerable: true, get: function () { return ar_drawer_theme_1.ArDrawerTheme; } });
__exportStar(require("./elements/ar-lang-selector"), exports);
__exportStar(require("./elements/ar-lang-selector-theme"), exports);
var ar_list_item_1 = require("./elements/ar-list-item");
Object.defineProperty(exports, "ArListItem", { enumerable: true, get: function () { return ar_list_item_1.ArListItem; } });
var ar_list_theme_1 = require("./elements/ar-list-theme");
Object.defineProperty(exports, "ArListTheme", { enumerable: true, get: function () { return ar_list_theme_1.ArListTheme; } });
var ar_main_header_1 = require("./elements/ar-main-header");
Object.defineProperty(exports, "ArMainHeader", { enumerable: true, get: function () { return ar_main_header_1.ArMainHeader; } });
var ar_main_header_theme_1 = require("./elements/ar-main-header-theme");
Object.defineProperty(exports, "ArMainHeaderTheme", { enumerable: true, get: function () { return ar_main_header_theme_1.ArMainHeaderTheme; } });
var ar_main_footer_1 = require("./elements/ar-main-footer");
Object.defineProperty(exports, "ArMainFooter", { enumerable: true, get: function () { return ar_main_footer_1.ArMainFooter; } });
var ar_main_footer_theme_1 = require("./elements/ar-main-footer-theme");
Object.defineProperty(exports, "ArMainFooterTheme", { enumerable: true, get: function () { return ar_main_footer_theme_1.ArMainFooterTheme; } });
var ar_metadata_1 = require("./elements/ar-metadata");
Object.defineProperty(exports, "ArMetadata", { enumerable: true, get: function () { return ar_metadata_1.ArMetadata; } });
var ar_metadata_theme_1 = require("./elements/ar-metadata-theme");
Object.defineProperty(exports, "ArMetadataTheme", { enumerable: true, get: function () { return ar_metadata_theme_1.ArMetadataTheme; } });
var ar_next_1 = require("./elements/ar-next");
Object.defineProperty(exports, "ArNext", { enumerable: true, get: function () { return ar_next_1.ArNext; } });
var ar_next_theme_1 = require("./elements/ar-next-theme");
Object.defineProperty(exports, "ArNextTheme", { enumerable: true, get: function () { return ar_next_theme_1.ArNextTheme; } });
__exportStar(require("./elements/ar-notification"), exports);
var ar_parallax_1 = require("./elements/ar-parallax");
Object.defineProperty(exports, "ArParallax", { enumerable: true, get: function () { return ar_parallax_1.ArParallax; } });
var ar_progress_1 = require("./elements/ar-progress");
Object.defineProperty(exports, "ArProgress", { enumerable: true, get: function () { return ar_progress_1.ArProgress; } });
var ar_progress_theme_1 = require("./elements/ar-progress-theme");
Object.defineProperty(exports, "ArProgressTheme", { enumerable: true, get: function () { return ar_progress_theme_1.ArProgressTheme; } });
var ar_range_input_1 = require("./elements/ar-range-input");
Object.defineProperty(exports, "ArRangeInput", { enumerable: true, get: function () { return ar_range_input_1.ArRangeInput; } });
var ar_range_input_theme_1 = require("./elements/ar-range-input-theme");
Object.defineProperty(exports, "ArRangeInputTheme", { enumerable: true, get: function () { return ar_range_input_theme_1.ArRangeInputTheme; } });
var ar_select_1 = require("./elements/ar-select");
Object.defineProperty(exports, "ArSelect", { enumerable: true, get: function () { return ar_select_1.ArSelect; } });
var ar_option_1 = require("./elements/ar-option");
Object.defineProperty(exports, "ArOption", { enumerable: true, get: function () { return ar_option_1.ArOption; } });
var ar_select_theme_1 = require("./elements/ar-select-theme");
Object.defineProperty(exports, "ArSelectTheme", { enumerable: true, get: function () { return ar_select_theme_1.ArSelectTheme; } });
var ar_slider_1 = require("./elements/ar-slider");
Object.defineProperty(exports, "ArSlider", { enumerable: true, get: function () { return ar_slider_1.ArSlider; } });
var ar_slide_1 = require("./elements/ar-slide");
Object.defineProperty(exports, "ArSlide", { enumerable: true, get: function () { return ar_slide_1.ArSlide; } });
var ar_slider_theme_1 = require("./elements/ar-slider-theme");
Object.defineProperty(exports, "ArSliderTheme", { enumerable: true, get: function () { return ar_slider_theme_1.ArSliderTheme; } });
var ar_search_input_1 = require("./elements/ar-search-input");
Object.defineProperty(exports, "ArSearchInput", { enumerable: true, get: function () { return ar_search_input_1.ArSearchInput; } });
var ar_search_input_theme_1 = require("./elements/ar-search-input-theme");
Object.defineProperty(exports, "ArSearchInputTheme", { enumerable: true, get: function () { return ar_search_input_theme_1.ArSearchInputTheme; } });
var ar_smart_toolbar_1 = require("./elements/ar-smart-toolbar");
Object.defineProperty(exports, "ArSmartToolbar", { enumerable: true, get: function () { return ar_smart_toolbar_1.ArSmartToolbar; } });
var ar_smart_toolbar_theme_1 = require("./elements/ar-smart-toolbar-theme");
Object.defineProperty(exports, "ArSmartToolbarTheme", { enumerable: true, get: function () { return ar_smart_toolbar_theme_1.ArSmartToolbarTheme; } });
var ar_spinner_icon_1 = require("./elements/ar-spinner-icon");
Object.defineProperty(exports, "ArSpinnerIcon", { enumerable: true, get: function () { return ar_spinner_icon_1.ArSpinnerIcon; } });
var ar_spinner_icon_theme_1 = require("./elements/ar-spinner-icon-theme");
Object.defineProperty(exports, "ArSpinnerIconTheme", { enumerable: true, get: function () { return ar_spinner_icon_theme_1.ArSpinnerIconTheme; } });
var ar_spinner_line_1 = require("./elements/ar-spinner-line");
Object.defineProperty(exports, "ArSpinnerLine", { enumerable: true, get: function () { return ar_spinner_line_1.ArSpinnerLine; } });
var ar_spinner_line_theme_1 = require("./elements/ar-spinner-line-theme");
Object.defineProperty(exports, "ArSpinnerLineTheme", { enumerable: true, get: function () { return ar_spinner_line_theme_1.ArSpinnerLineTheme; } });
var ar_stripe_element_1 = require("./elements/ar-stripe-element");
Object.defineProperty(exports, "ArStripeElement", { enumerable: true, get: function () { return ar_stripe_element_1.ArStripeElement; } });
var ar_stripe_element_theme_1 = require("./elements/ar-stripe-element-theme");
Object.defineProperty(exports, "ArStripeElementTheme", { enumerable: true, get: function () { return ar_stripe_element_theme_1.ArStripeElementTheme; } });
var ar_timeline_1 = require("./elements/ar-timeline");
Object.defineProperty(exports, "ArTimeline", { enumerable: true, get: function () { return ar_timeline_1.ArTimeline; } });
var ar_timeline_theme_1 = require("./elements/ar-timeline-theme");
Object.defineProperty(exports, "ArTimelineTheme", { enumerable: true, get: function () { return ar_timeline_theme_1.ArTimelineTheme; } });
var ar_timeline_item_1 = require("./elements/ar-timeline-item");
Object.defineProperty(exports, "ArTimelineItem", { enumerable: true, get: function () { return ar_timeline_item_1.ArTimelineItem; } });
var ar_video_1 = require("./elements/ar-video");
Object.defineProperty(exports, "ArVideo", { enumerable: true, get: function () { return ar_video_1.ArVideo; } });
var ar_video_theme_1 = require("./elements/ar-video-theme");
Object.defineProperty(exports, "ArVideoTheme", { enumerable: true, get: function () { return ar_video_theme_1.ArVideoTheme; } });
var ux_input_int_phone_1 = require("./elements/ux-input-int-phone");
Object.defineProperty(exports, "UxInputIntPhone", { enumerable: true, get: function () { return ux_input_int_phone_1.UxInputIntPhone; } });
__exportStar(require("./elements/listing/listing-head"), exports);
__exportStar(require("./elements/listing/listing-list-item"), exports);
__exportStar(require("./elements/listing/listing-list"), exports);
__exportStar(require("./elements/listing/listing-toolbar"), exports);
/* Expose attributes */
var smooth_scroll_1 = require("./attributes/smooth-scroll");
Object.defineProperty(exports, "SmoothScroll", { enumerable: true, get: function () { return smooth_scroll_1.SmoothScroll; } });
__exportStar(require("./icons"), exports);
