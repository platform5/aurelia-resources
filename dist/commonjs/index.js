"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
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
        aurelia_framework_1.PLATFORM.moduleName('./controls/filter-date-control'),
        aurelia_framework_1.PLATFORM.moduleName('./controls/filter-dates-control'),
        aurelia_framework_1.PLATFORM.moduleName('./controls/filter-prompt-control'),
        aurelia_framework_1.PLATFORM.moduleName('./controls/filter-control'),
        aurelia_framework_1.PLATFORM.moduleName('./controls/select-control'),
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
exports.Api = api_1.Api;
var analytics_1 = require("./helpers/analytics");
exports.Analytics = analytics_1.Analytics;
exports.AnalyticEntry = analytics_1.AnalyticEntry;
var analytics_google_1 = require("./helpers/analytics-google");
exports.AnalyticsGoogle = analytics_google_1.AnalyticsGoogle;
var cordova_1 = require("./helpers/cordova");
exports.CordovaHelpers = cordova_1.CordovaHelpers;
var page_visibility_1 = require("./helpers/page-visibility");
exports.PageVisibilityHelpers = page_visibility_1.PageVisibilityHelpers;
var parser_1 = require("./helpers/parser");
exports.Parser = parser_1.Parser;
var sentry_2 = require("./helpers/sentry");
exports.SentryHelper = sentry_2.SentryHelper;
var dom_1 = require("./helpers/dom");
exports.DomHelpers = dom_1.DomHelpers;
var string_1 = require("./helpers/string");
exports.StringHelpers = string_1.StringHelpers;
var image_1 = require("./helpers/image");
exports.ImageUtils = image_1.ImageUtils;
exports.ImageHelpers = image_1.ImageHelpers;
var countries_1 = require("./helpers/countries");
exports.countries = countries_1.countries;
var languages_1 = require("./helpers/languages");
exports.languages = languages_1.languages;
var locales_1 = require("./helpers/locales");
exports.locales = locales_1.locales;
__export(require("./helpers/notify"));
__export(require("./helpers/number"));
__export(require("./helpers/ux-form-renderer"));
/* Expose Controls */
__export(require("./controls/filter-boolean-control"));
__export(require("./controls/filter-date-control"));
__export(require("./controls/filter-dates-control"));
__export(require("./controls/filter-prompt-control"));
__export(require("./controls/filter-control"));
__export(require("./controls/select-control"));
/* Expose Dialogs */
__export(require("./dialogs/confirm-dialog"));
__export(require("./dialogs/countries-dialog"));
__export(require("./dialogs/languages-dialog"));
__export(require("./dialogs/locales-dialog"));
__export(require("./dialogs/prompt-boolean-dialog"));
__export(require("./dialogs/prompt-select-dialog"));
__export(require("./dialogs/prompt-text-dialog"));
/* Expose elements */
var ar_breadcrumb_1 = require("./elements/ar-breadcrumb");
exports.ArBreadcrumb = ar_breadcrumb_1.ArBreadcrumb;
var ar_breadcrumb_theme_1 = require("./elements/ar-breadcrumb-theme");
exports.ArBreadcrumbTheme = ar_breadcrumb_theme_1.ArBreadcrumbTheme;
var ar_dialog_1 = require("./elements/ar-dialog");
exports.ArDialog = ar_dialog_1.ArDialog;
exports.arDialog = ar_dialog_1.arDialog;
var ar_dialog_theme_1 = require("./elements/ar-dialog-theme");
exports.ArDialogTheme = ar_dialog_theme_1.ArDialogTheme;
var ar_dialog_prompt_1 = require("./elements/ar-dialog-prompt");
exports.ArDialogPrompt = ar_dialog_prompt_1.ArDialogPrompt;
var ar_drawer_1 = require("./elements/ar-drawer");
exports.ArDrawer = ar_drawer_1.ArDrawer;
exports.ArDrawerToggleAttribute = ar_drawer_1.ArDrawerToggleAttribute;
exports.ArDrawerOpenAttribute = ar_drawer_1.ArDrawerOpenAttribute;
exports.ArDrawerCloseAttribute = ar_drawer_1.ArDrawerCloseAttribute;
exports.onDrawerStatusChanged = ar_drawer_1.onDrawerStatusChanged;
var ar_drawer_theme_1 = require("./elements/ar-drawer-theme");
exports.ArDrawerTheme = ar_drawer_theme_1.ArDrawerTheme;
__export(require("./elements/ar-lang-selector"));
__export(require("./elements/ar-lang-selector-theme"));
var ar_list_item_1 = require("./elements/ar-list-item");
exports.ArListItem = ar_list_item_1.ArListItem;
var ar_list_theme_1 = require("./elements/ar-list-theme");
exports.ArListTheme = ar_list_theme_1.ArListTheme;
var ar_main_header_1 = require("./elements/ar-main-header");
exports.ArMainHeader = ar_main_header_1.ArMainHeader;
var ar_main_header_theme_1 = require("./elements/ar-main-header-theme");
exports.ArMainHeaderTheme = ar_main_header_theme_1.ArMainHeaderTheme;
var ar_main_footer_1 = require("./elements/ar-main-footer");
exports.ArMainFooter = ar_main_footer_1.ArMainFooter;
var ar_main_footer_theme_1 = require("./elements/ar-main-footer-theme");
exports.ArMainFooterTheme = ar_main_footer_theme_1.ArMainFooterTheme;
var ar_metadata_1 = require("./elements/ar-metadata");
exports.ArMetadata = ar_metadata_1.ArMetadata;
var ar_metadata_theme_1 = require("./elements/ar-metadata-theme");
exports.ArMetadataTheme = ar_metadata_theme_1.ArMetadataTheme;
var ar_next_1 = require("./elements/ar-next");
exports.ArNext = ar_next_1.ArNext;
var ar_next_theme_1 = require("./elements/ar-next-theme");
exports.ArNextTheme = ar_next_theme_1.ArNextTheme;
__export(require("./elements/ar-notification"));
var ar_parallax_1 = require("./elements/ar-parallax");
exports.ArParallax = ar_parallax_1.ArParallax;
var ar_progress_1 = require("./elements/ar-progress");
exports.ArProgress = ar_progress_1.ArProgress;
var ar_progress_theme_1 = require("./elements/ar-progress-theme");
exports.ArProgressTheme = ar_progress_theme_1.ArProgressTheme;
var ar_range_input_1 = require("./elements/ar-range-input");
exports.ArRangeInput = ar_range_input_1.ArRangeInput;
var ar_range_input_theme_1 = require("./elements/ar-range-input-theme");
exports.ArRangeInputTheme = ar_range_input_theme_1.ArRangeInputTheme;
var ar_select_1 = require("./elements/ar-select");
exports.ArSelect = ar_select_1.ArSelect;
var ar_option_1 = require("./elements/ar-option");
exports.ArOption = ar_option_1.ArOption;
var ar_select_theme_1 = require("./elements/ar-select-theme");
exports.ArSelectTheme = ar_select_theme_1.ArSelectTheme;
var ar_slider_1 = require("./elements/ar-slider");
exports.ArSlider = ar_slider_1.ArSlider;
var ar_slide_1 = require("./elements/ar-slide");
exports.ArSlide = ar_slide_1.ArSlide;
var ar_slider_theme_1 = require("./elements/ar-slider-theme");
exports.ArSliderTheme = ar_slider_theme_1.ArSliderTheme;
var ar_search_input_1 = require("./elements/ar-search-input");
exports.ArSearchInput = ar_search_input_1.ArSearchInput;
var ar_search_input_theme_1 = require("./elements/ar-search-input-theme");
exports.ArSearchInputTheme = ar_search_input_theme_1.ArSearchInputTheme;
var ar_smart_toolbar_1 = require("./elements/ar-smart-toolbar");
exports.ArSmartToolbar = ar_smart_toolbar_1.ArSmartToolbar;
var ar_smart_toolbar_theme_1 = require("./elements/ar-smart-toolbar-theme");
exports.ArSmartToolbarTheme = ar_smart_toolbar_theme_1.ArSmartToolbarTheme;
var ar_spinner_icon_1 = require("./elements/ar-spinner-icon");
exports.ArSpinnerIcon = ar_spinner_icon_1.ArSpinnerIcon;
var ar_spinner_icon_theme_1 = require("./elements/ar-spinner-icon-theme");
exports.ArSpinnerIconTheme = ar_spinner_icon_theme_1.ArSpinnerIconTheme;
var ar_spinner_line_1 = require("./elements/ar-spinner-line");
exports.ArSpinnerLine = ar_spinner_line_1.ArSpinnerLine;
var ar_spinner_line_theme_1 = require("./elements/ar-spinner-line-theme");
exports.ArSpinnerLineTheme = ar_spinner_line_theme_1.ArSpinnerLineTheme;
var ar_stripe_element_1 = require("./elements/ar-stripe-element");
exports.ArStripeElement = ar_stripe_element_1.ArStripeElement;
var ar_stripe_element_theme_1 = require("./elements/ar-stripe-element-theme");
exports.ArStripeElementTheme = ar_stripe_element_theme_1.ArStripeElementTheme;
var ar_timeline_1 = require("./elements/ar-timeline");
exports.ArTimeline = ar_timeline_1.ArTimeline;
var ar_timeline_theme_1 = require("./elements/ar-timeline-theme");
exports.ArTimelineTheme = ar_timeline_theme_1.ArTimelineTheme;
var ar_timeline_item_1 = require("./elements/ar-timeline-item");
exports.ArTimelineItem = ar_timeline_item_1.ArTimelineItem;
var ar_video_1 = require("./elements/ar-video");
exports.ArVideo = ar_video_1.ArVideo;
var ar_video_theme_1 = require("./elements/ar-video-theme");
exports.ArVideoTheme = ar_video_theme_1.ArVideoTheme;
var ux_input_int_phone_1 = require("./elements/ux-input-int-phone");
exports.UxInputIntPhone = ux_input_int_phone_1.UxInputIntPhone;
__export(require("./elements/listing/listing-head"));
__export(require("./elements/listing/listing-list-item"));
__export(require("./elements/listing/listing-list"));
__export(require("./elements/listing/listing-toolbar"));
/* Expose attributes */
var smooth_scroll_1 = require("./attributes/smooth-scroll");
exports.SmoothScroll = smooth_scroll_1.SmoothScroll;
__export(require("./icons"));
