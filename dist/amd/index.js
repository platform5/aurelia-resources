define(["require", "exports", "./helpers/sentry", "aurelia-framework", "./value-converters/numbers", "./helpers/api", "./helpers/analytics", "./helpers/analytics-google", "./helpers/cordova", "./helpers/page-visibility", "./helpers/parser", "./helpers/sentry", "./helpers/dom", "./helpers/string", "./helpers/image", "./helpers/countries", "./helpers/languages", "./helpers/locales", "./helpers/notify", "./helpers/number", "./helpers/ux-form-renderer", "./controls/filter-boolean-control", "./controls/filter-date-control", "./controls/filter-dates-control", "./controls/filter-prompt-control", "./controls/filter-control", "./controls/select-control", "./dialogs/confirm-dialog", "./dialogs/countries-dialog", "./dialogs/languages-dialog", "./dialogs/locales-dialog", "./dialogs/prompt-boolean-dialog", "./dialogs/prompt-select-dialog", "./dialogs/prompt-text-dialog", "./elements/ar-breadcrumb", "./elements/ar-breadcrumb-theme", "./elements/ar-dialog", "./elements/ar-dialog-theme", "./elements/ar-dialog-prompt", "./elements/ar-drawer", "./elements/ar-drawer-theme", "./elements/ar-lang-selector", "./elements/ar-lang-selector-theme", "./elements/ar-list-item", "./elements/ar-list-theme", "./elements/ar-main-header", "./elements/ar-main-header-theme", "./elements/ar-main-footer", "./elements/ar-main-footer-theme", "./elements/ar-metadata", "./elements/ar-metadata-theme", "./elements/ar-next", "./elements/ar-next-theme", "./elements/ar-notification", "./elements/ar-parallax", "./elements/ar-progress", "./elements/ar-progress-theme", "./elements/ar-range-input", "./elements/ar-range-input-theme", "./elements/ar-select", "./elements/ar-option", "./elements/ar-select-theme", "./elements/ar-slider", "./elements/ar-slide", "./elements/ar-slider-theme", "./elements/ar-search-input", "./elements/ar-search-input-theme", "./elements/ar-smart-toolbar", "./elements/ar-smart-toolbar-theme", "./elements/ar-spinner-icon", "./elements/ar-spinner-icon-theme", "./elements/ar-spinner-line", "./elements/ar-spinner-line-theme", "./elements/ar-stripe-element", "./elements/ar-stripe-element-theme", "./elements/ar-timeline", "./elements/ar-timeline-theme", "./elements/ar-timeline-item", "./elements/ar-video", "./elements/ar-video-theme", "./elements/ux-input-int-phone", "./elements/listing/listing-head", "./elements/listing/listing-list-item", "./elements/listing/listing-list", "./elements/listing/listing-toolbar", "./attributes/smooth-scroll", "./icons"], function (require, exports, sentry_1, aurelia_framework_1, numbers_1, api_1, analytics_1, analytics_google_1, cordova_1, page_visibility_1, parser_1, sentry_2, dom_1, string_1, image_1, countries_1, languages_1, locales_1, notify_1, number_1, ux_form_renderer_1, filter_boolean_control_1, filter_date_control_1, filter_dates_control_1, filter_prompt_control_1, filter_control_1, select_control_1, confirm_dialog_1, countries_dialog_1, languages_dialog_1, locales_dialog_1, prompt_boolean_dialog_1, prompt_select_dialog_1, prompt_text_dialog_1, ar_breadcrumb_1, ar_breadcrumb_theme_1, ar_dialog_1, ar_dialog_theme_1, ar_dialog_prompt_1, ar_drawer_1, ar_drawer_theme_1, ar_lang_selector_1, ar_lang_selector_theme_1, ar_list_item_1, ar_list_theme_1, ar_main_header_1, ar_main_header_theme_1, ar_main_footer_1, ar_main_footer_theme_1, ar_metadata_1, ar_metadata_theme_1, ar_next_1, ar_next_theme_1, ar_notification_1, ar_parallax_1, ar_progress_1, ar_progress_theme_1, ar_range_input_1, ar_range_input_theme_1, ar_select_1, ar_option_1, ar_select_theme_1, ar_slider_1, ar_slide_1, ar_slider_theme_1, ar_search_input_1, ar_search_input_theme_1, ar_smart_toolbar_1, ar_smart_toolbar_theme_1, ar_spinner_icon_1, ar_spinner_icon_theme_1, ar_spinner_line_1, ar_spinner_line_theme_1, ar_stripe_element_1, ar_stripe_element_theme_1, ar_timeline_1, ar_timeline_theme_1, ar_timeline_item_1, ar_video_1, ar_video_theme_1, ux_input_int_phone_1, listing_head_1, listing_list_item_1, listing_list_1, listing_toolbar_1, smooth_scroll_1, icons_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.Api = api_1.Api;
    exports.Analytics = analytics_1.Analytics;
    exports.AnalyticEntry = analytics_1.AnalyticEntry;
    exports.AnalyticsGoogle = analytics_google_1.AnalyticsGoogle;
    exports.CordovaHelpers = cordova_1.CordovaHelpers;
    exports.PageVisibilityHelpers = page_visibility_1.PageVisibilityHelpers;
    exports.Parser = parser_1.Parser;
    exports.SentryHelper = sentry_2.SentryHelper;
    exports.DomHelpers = dom_1.DomHelpers;
    exports.StringHelpers = string_1.StringHelpers;
    exports.ImageUtils = image_1.ImageUtils;
    exports.ImageHelpers = image_1.ImageHelpers;
    exports.countries = countries_1.countries;
    exports.languages = languages_1.languages;
    exports.locales = locales_1.locales;
    __export(notify_1);
    __export(number_1);
    __export(ux_form_renderer_1);
    /* Expose Controls */
    __export(filter_boolean_control_1);
    __export(filter_date_control_1);
    __export(filter_dates_control_1);
    __export(filter_prompt_control_1);
    __export(filter_control_1);
    __export(select_control_1);
    /* Expose Dialogs */
    __export(confirm_dialog_1);
    __export(countries_dialog_1);
    __export(languages_dialog_1);
    __export(locales_dialog_1);
    __export(prompt_boolean_dialog_1);
    __export(prompt_select_dialog_1);
    __export(prompt_text_dialog_1);
    exports.ArBreadcrumb = ar_breadcrumb_1.ArBreadcrumb;
    exports.ArBreadcrumbTheme = ar_breadcrumb_theme_1.ArBreadcrumbTheme;
    exports.ArDialog = ar_dialog_1.ArDialog;
    exports.arDialog = ar_dialog_1.arDialog;
    exports.ArDialogTheme = ar_dialog_theme_1.ArDialogTheme;
    exports.ArDialogPrompt = ar_dialog_prompt_1.ArDialogPrompt;
    exports.ArDrawer = ar_drawer_1.ArDrawer;
    exports.ArDrawerToggleAttribute = ar_drawer_1.ArDrawerToggleAttribute;
    exports.ArDrawerOpenAttribute = ar_drawer_1.ArDrawerOpenAttribute;
    exports.ArDrawerCloseAttribute = ar_drawer_1.ArDrawerCloseAttribute;
    exports.onDrawerStatusChanged = ar_drawer_1.onDrawerStatusChanged;
    exports.ArDrawerTheme = ar_drawer_theme_1.ArDrawerTheme;
    __export(ar_lang_selector_1);
    __export(ar_lang_selector_theme_1);
    exports.ArListItem = ar_list_item_1.ArListItem;
    exports.ArListTheme = ar_list_theme_1.ArListTheme;
    exports.ArMainHeader = ar_main_header_1.ArMainHeader;
    exports.ArMainHeaderTheme = ar_main_header_theme_1.ArMainHeaderTheme;
    exports.ArMainFooter = ar_main_footer_1.ArMainFooter;
    exports.ArMainFooterTheme = ar_main_footer_theme_1.ArMainFooterTheme;
    exports.ArMetadata = ar_metadata_1.ArMetadata;
    exports.ArMetadataTheme = ar_metadata_theme_1.ArMetadataTheme;
    exports.ArNext = ar_next_1.ArNext;
    exports.ArNextTheme = ar_next_theme_1.ArNextTheme;
    __export(ar_notification_1);
    exports.ArParallax = ar_parallax_1.ArParallax;
    exports.ArProgress = ar_progress_1.ArProgress;
    exports.ArProgressTheme = ar_progress_theme_1.ArProgressTheme;
    exports.ArRangeInput = ar_range_input_1.ArRangeInput;
    exports.ArRangeInputTheme = ar_range_input_theme_1.ArRangeInputTheme;
    exports.ArSelect = ar_select_1.ArSelect;
    exports.ArOption = ar_option_1.ArOption;
    exports.ArSelectTheme = ar_select_theme_1.ArSelectTheme;
    exports.ArSlider = ar_slider_1.ArSlider;
    exports.ArSlide = ar_slide_1.ArSlide;
    exports.ArSliderTheme = ar_slider_theme_1.ArSliderTheme;
    exports.ArSearchInput = ar_search_input_1.ArSearchInput;
    exports.ArSearchInputTheme = ar_search_input_theme_1.ArSearchInputTheme;
    exports.ArSmartToolbar = ar_smart_toolbar_1.ArSmartToolbar;
    exports.ArSmartToolbarTheme = ar_smart_toolbar_theme_1.ArSmartToolbarTheme;
    exports.ArSpinnerIcon = ar_spinner_icon_1.ArSpinnerIcon;
    exports.ArSpinnerIconTheme = ar_spinner_icon_theme_1.ArSpinnerIconTheme;
    exports.ArSpinnerLine = ar_spinner_line_1.ArSpinnerLine;
    exports.ArSpinnerLineTheme = ar_spinner_line_theme_1.ArSpinnerLineTheme;
    exports.ArStripeElement = ar_stripe_element_1.ArStripeElement;
    exports.ArStripeElementTheme = ar_stripe_element_theme_1.ArStripeElementTheme;
    exports.ArTimeline = ar_timeline_1.ArTimeline;
    exports.ArTimelineTheme = ar_timeline_theme_1.ArTimelineTheme;
    exports.ArTimelineItem = ar_timeline_item_1.ArTimelineItem;
    exports.ArVideo = ar_video_1.ArVideo;
    exports.ArVideoTheme = ar_video_theme_1.ArVideoTheme;
    exports.UxInputIntPhone = ux_input_int_phone_1.UxInputIntPhone;
    __export(listing_head_1);
    __export(listing_list_item_1);
    __export(listing_list_1);
    __export(listing_toolbar_1);
    exports.SmoothScroll = smooth_scroll_1.SmoothScroll;
    __export(icons_1);
});
