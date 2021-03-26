var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
define(["require", "exports", "./helpers/sentry", "aurelia-framework", "./value-converters/numbers", "./helpers/api", "./helpers/analytics", "./helpers/analytics-google", "./helpers/cordova", "./helpers/page-visibility", "./helpers/parser", "./helpers/sentry", "./helpers/dom", "./helpers/string", "./helpers/image", "./helpers/countries", "./helpers/languages", "./helpers/locales", "./helpers/notify", "./helpers/date", "./helpers/number", "./helpers/ux-form-renderer", "./controls/filter-boolean-control", "./controls/filter-chips-control", "./controls/filter-date-control", "./controls/filter-dates-control", "./controls/filter-prompt-control", "./controls/filter-control", "./controls/select-control", "./dialogs/confirm-dialog", "./dialogs/countries-dialog", "./dialogs/languages-dialog", "./dialogs/locales-dialog", "./dialogs/prompt-boolean-dialog", "./dialogs/prompt-select-dialog", "./dialogs/prompt-text-dialog", "./elements/ar-breadcrumb", "./elements/ar-breadcrumb-theme", "./elements/ar-dialog", "./elements/ar-dialog-theme", "./elements/ar-dialog-prompt", "./elements/ar-drawer", "./elements/ar-drawer-theme", "./elements/ar-lang-selector", "./elements/ar-lang-selector-theme", "./elements/ar-list-item", "./elements/ar-list-theme", "./elements/ar-main-header", "./elements/ar-main-header-theme", "./elements/ar-main-footer", "./elements/ar-main-footer-theme", "./elements/ar-metadata", "./elements/ar-metadata-theme", "./elements/ar-next", "./elements/ar-next-theme", "./elements/ar-notification", "./elements/ar-parallax", "./elements/ar-progress", "./elements/ar-progress-theme", "./elements/ar-range-input", "./elements/ar-range-input-theme", "./elements/ar-select", "./elements/ar-option", "./elements/ar-select-theme", "./elements/ar-slider", "./elements/ar-slide", "./elements/ar-slider-theme", "./elements/ar-search-input", "./elements/ar-search-input-theme", "./elements/ar-smart-toolbar", "./elements/ar-smart-toolbar-theme", "./elements/ar-spinner-icon", "./elements/ar-spinner-icon-theme", "./elements/ar-spinner-line", "./elements/ar-spinner-line-theme", "./elements/ar-stripe-element", "./elements/ar-stripe-element-theme", "./elements/ar-timeline", "./elements/ar-timeline-theme", "./elements/ar-timeline-item", "./elements/ar-video", "./elements/ar-video-theme", "./elements/ux-input-int-phone", "./elements/listing/listing-head", "./elements/listing/listing-list-item", "./elements/listing/listing-list", "./elements/listing/listing-toolbar", "./attributes/smooth-scroll", "./icons"], function (require, exports, sentry_1, aurelia_framework_1, numbers_1, api_1, analytics_1, analytics_google_1, cordova_1, page_visibility_1, parser_1, sentry_2, dom_1, string_1, image_1, countries_1, languages_1, locales_1, notify_1, date_1, number_1, ux_form_renderer_1, filter_boolean_control_1, filter_chips_control_1, filter_date_control_1, filter_dates_control_1, filter_prompt_control_1, filter_control_1, select_control_1, confirm_dialog_1, countries_dialog_1, languages_dialog_1, locales_dialog_1, prompt_boolean_dialog_1, prompt_select_dialog_1, prompt_text_dialog_1, ar_breadcrumb_1, ar_breadcrumb_theme_1, ar_dialog_1, ar_dialog_theme_1, ar_dialog_prompt_1, ar_drawer_1, ar_drawer_theme_1, ar_lang_selector_1, ar_lang_selector_theme_1, ar_list_item_1, ar_list_theme_1, ar_main_header_1, ar_main_header_theme_1, ar_main_footer_1, ar_main_footer_theme_1, ar_metadata_1, ar_metadata_theme_1, ar_next_1, ar_next_theme_1, ar_notification_1, ar_parallax_1, ar_progress_1, ar_progress_theme_1, ar_range_input_1, ar_range_input_theme_1, ar_select_1, ar_option_1, ar_select_theme_1, ar_slider_1, ar_slide_1, ar_slider_theme_1, ar_search_input_1, ar_search_input_theme_1, ar_smart_toolbar_1, ar_smart_toolbar_theme_1, ar_spinner_icon_1, ar_spinner_icon_theme_1, ar_spinner_line_1, ar_spinner_line_theme_1, ar_stripe_element_1, ar_stripe_element_theme_1, ar_timeline_1, ar_timeline_theme_1, ar_timeline_item_1, ar_video_1, ar_video_theme_1, ux_input_int_phone_1, listing_head_1, listing_list_item_1, listing_list_1, listing_toolbar_1, smooth_scroll_1, icons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = void 0;
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
    Object.defineProperty(exports, "Api", { enumerable: true, get: function () { return api_1.Api; } });
    Object.defineProperty(exports, "Analytics", { enumerable: true, get: function () { return analytics_1.Analytics; } });
    Object.defineProperty(exports, "AnalyticEntry", { enumerable: true, get: function () { return analytics_1.AnalyticEntry; } });
    Object.defineProperty(exports, "AnalyticsGoogle", { enumerable: true, get: function () { return analytics_google_1.AnalyticsGoogle; } });
    Object.defineProperty(exports, "CordovaHelpers", { enumerable: true, get: function () { return cordova_1.CordovaHelpers; } });
    Object.defineProperty(exports, "PageVisibilityHelpers", { enumerable: true, get: function () { return page_visibility_1.PageVisibilityHelpers; } });
    Object.defineProperty(exports, "Parser", { enumerable: true, get: function () { return parser_1.Parser; } });
    Object.defineProperty(exports, "SentryHelper", { enumerable: true, get: function () { return sentry_2.SentryHelper; } });
    Object.defineProperty(exports, "DomHelpers", { enumerable: true, get: function () { return dom_1.DomHelpers; } });
    Object.defineProperty(exports, "StringHelpers", { enumerable: true, get: function () { return string_1.StringHelpers; } });
    Object.defineProperty(exports, "ImageUtils", { enumerable: true, get: function () { return image_1.ImageUtils; } });
    Object.defineProperty(exports, "ImageHelpers", { enumerable: true, get: function () { return image_1.ImageHelpers; } });
    Object.defineProperty(exports, "countries", { enumerable: true, get: function () { return countries_1.countries; } });
    Object.defineProperty(exports, "languages", { enumerable: true, get: function () { return languages_1.languages; } });
    Object.defineProperty(exports, "locales", { enumerable: true, get: function () { return locales_1.locales; } });
    __exportStar(notify_1, exports);
    __exportStar(date_1, exports);
    __exportStar(number_1, exports);
    __exportStar(ux_form_renderer_1, exports);
    /* Expose Controls */
    __exportStar(filter_boolean_control_1, exports);
    __exportStar(filter_chips_control_1, exports);
    __exportStar(filter_date_control_1, exports);
    __exportStar(filter_dates_control_1, exports);
    __exportStar(filter_prompt_control_1, exports);
    __exportStar(filter_control_1, exports);
    __exportStar(select_control_1, exports);
    /* Expose Dialogs */
    __exportStar(confirm_dialog_1, exports);
    __exportStar(countries_dialog_1, exports);
    __exportStar(languages_dialog_1, exports);
    __exportStar(locales_dialog_1, exports);
    __exportStar(prompt_boolean_dialog_1, exports);
    __exportStar(prompt_select_dialog_1, exports);
    __exportStar(prompt_text_dialog_1, exports);
    Object.defineProperty(exports, "ArBreadcrumb", { enumerable: true, get: function () { return ar_breadcrumb_1.ArBreadcrumb; } });
    Object.defineProperty(exports, "ArBreadcrumbTheme", { enumerable: true, get: function () { return ar_breadcrumb_theme_1.ArBreadcrumbTheme; } });
    Object.defineProperty(exports, "ArDialog", { enumerable: true, get: function () { return ar_dialog_1.ArDialog; } });
    Object.defineProperty(exports, "arDialog", { enumerable: true, get: function () { return ar_dialog_1.arDialog; } });
    Object.defineProperty(exports, "ArDialogTheme", { enumerable: true, get: function () { return ar_dialog_theme_1.ArDialogTheme; } });
    Object.defineProperty(exports, "ArDialogPrompt", { enumerable: true, get: function () { return ar_dialog_prompt_1.ArDialogPrompt; } });
    Object.defineProperty(exports, "ArDrawer", { enumerable: true, get: function () { return ar_drawer_1.ArDrawer; } });
    Object.defineProperty(exports, "ArDrawerToggleAttribute", { enumerable: true, get: function () { return ar_drawer_1.ArDrawerToggleAttribute; } });
    Object.defineProperty(exports, "ArDrawerOpenAttribute", { enumerable: true, get: function () { return ar_drawer_1.ArDrawerOpenAttribute; } });
    Object.defineProperty(exports, "ArDrawerCloseAttribute", { enumerable: true, get: function () { return ar_drawer_1.ArDrawerCloseAttribute; } });
    Object.defineProperty(exports, "onDrawerStatusChanged", { enumerable: true, get: function () { return ar_drawer_1.onDrawerStatusChanged; } });
    Object.defineProperty(exports, "ArDrawerTheme", { enumerable: true, get: function () { return ar_drawer_theme_1.ArDrawerTheme; } });
    __exportStar(ar_lang_selector_1, exports);
    __exportStar(ar_lang_selector_theme_1, exports);
    Object.defineProperty(exports, "ArListItem", { enumerable: true, get: function () { return ar_list_item_1.ArListItem; } });
    Object.defineProperty(exports, "ArListTheme", { enumerable: true, get: function () { return ar_list_theme_1.ArListTheme; } });
    Object.defineProperty(exports, "ArMainHeader", { enumerable: true, get: function () { return ar_main_header_1.ArMainHeader; } });
    Object.defineProperty(exports, "ArMainHeaderTheme", { enumerable: true, get: function () { return ar_main_header_theme_1.ArMainHeaderTheme; } });
    Object.defineProperty(exports, "ArMainFooter", { enumerable: true, get: function () { return ar_main_footer_1.ArMainFooter; } });
    Object.defineProperty(exports, "ArMainFooterTheme", { enumerable: true, get: function () { return ar_main_footer_theme_1.ArMainFooterTheme; } });
    Object.defineProperty(exports, "ArMetadata", { enumerable: true, get: function () { return ar_metadata_1.ArMetadata; } });
    Object.defineProperty(exports, "ArMetadataTheme", { enumerable: true, get: function () { return ar_metadata_theme_1.ArMetadataTheme; } });
    Object.defineProperty(exports, "ArNext", { enumerable: true, get: function () { return ar_next_1.ArNext; } });
    Object.defineProperty(exports, "ArNextTheme", { enumerable: true, get: function () { return ar_next_theme_1.ArNextTheme; } });
    __exportStar(ar_notification_1, exports);
    Object.defineProperty(exports, "ArParallax", { enumerable: true, get: function () { return ar_parallax_1.ArParallax; } });
    Object.defineProperty(exports, "ArProgress", { enumerable: true, get: function () { return ar_progress_1.ArProgress; } });
    Object.defineProperty(exports, "ArProgressTheme", { enumerable: true, get: function () { return ar_progress_theme_1.ArProgressTheme; } });
    Object.defineProperty(exports, "ArRangeInput", { enumerable: true, get: function () { return ar_range_input_1.ArRangeInput; } });
    Object.defineProperty(exports, "ArRangeInputTheme", { enumerable: true, get: function () { return ar_range_input_theme_1.ArRangeInputTheme; } });
    Object.defineProperty(exports, "ArSelect", { enumerable: true, get: function () { return ar_select_1.ArSelect; } });
    Object.defineProperty(exports, "ArOption", { enumerable: true, get: function () { return ar_option_1.ArOption; } });
    Object.defineProperty(exports, "ArSelectTheme", { enumerable: true, get: function () { return ar_select_theme_1.ArSelectTheme; } });
    Object.defineProperty(exports, "ArSlider", { enumerable: true, get: function () { return ar_slider_1.ArSlider; } });
    Object.defineProperty(exports, "ArSlide", { enumerable: true, get: function () { return ar_slide_1.ArSlide; } });
    Object.defineProperty(exports, "ArSliderTheme", { enumerable: true, get: function () { return ar_slider_theme_1.ArSliderTheme; } });
    Object.defineProperty(exports, "ArSearchInput", { enumerable: true, get: function () { return ar_search_input_1.ArSearchInput; } });
    Object.defineProperty(exports, "ArSearchInputTheme", { enumerable: true, get: function () { return ar_search_input_theme_1.ArSearchInputTheme; } });
    Object.defineProperty(exports, "ArSmartToolbar", { enumerable: true, get: function () { return ar_smart_toolbar_1.ArSmartToolbar; } });
    Object.defineProperty(exports, "ArSmartToolbarTheme", { enumerable: true, get: function () { return ar_smart_toolbar_theme_1.ArSmartToolbarTheme; } });
    Object.defineProperty(exports, "ArSpinnerIcon", { enumerable: true, get: function () { return ar_spinner_icon_1.ArSpinnerIcon; } });
    Object.defineProperty(exports, "ArSpinnerIconTheme", { enumerable: true, get: function () { return ar_spinner_icon_theme_1.ArSpinnerIconTheme; } });
    Object.defineProperty(exports, "ArSpinnerLine", { enumerable: true, get: function () { return ar_spinner_line_1.ArSpinnerLine; } });
    Object.defineProperty(exports, "ArSpinnerLineTheme", { enumerable: true, get: function () { return ar_spinner_line_theme_1.ArSpinnerLineTheme; } });
    Object.defineProperty(exports, "ArStripeElement", { enumerable: true, get: function () { return ar_stripe_element_1.ArStripeElement; } });
    Object.defineProperty(exports, "ArStripeElementTheme", { enumerable: true, get: function () { return ar_stripe_element_theme_1.ArStripeElementTheme; } });
    Object.defineProperty(exports, "ArTimeline", { enumerable: true, get: function () { return ar_timeline_1.ArTimeline; } });
    Object.defineProperty(exports, "ArTimelineTheme", { enumerable: true, get: function () { return ar_timeline_theme_1.ArTimelineTheme; } });
    Object.defineProperty(exports, "ArTimelineItem", { enumerable: true, get: function () { return ar_timeline_item_1.ArTimelineItem; } });
    Object.defineProperty(exports, "ArVideo", { enumerable: true, get: function () { return ar_video_1.ArVideo; } });
    Object.defineProperty(exports, "ArVideoTheme", { enumerable: true, get: function () { return ar_video_theme_1.ArVideoTheme; } });
    Object.defineProperty(exports, "UxInputIntPhone", { enumerable: true, get: function () { return ux_input_int_phone_1.UxInputIntPhone; } });
    __exportStar(listing_head_1, exports);
    __exportStar(listing_list_item_1, exports);
    __exportStar(listing_list_1, exports);
    __exportStar(listing_toolbar_1, exports);
    Object.defineProperty(exports, "SmoothScroll", { enumerable: true, get: function () { return smooth_scroll_1.SmoothScroll; } });
    __exportStar(icons_1, exports);
});
