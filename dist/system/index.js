System.register(["./helpers/sentry", "aurelia-framework", "./value-converters/numbers", "./helpers/api", "./helpers/analytics", "./helpers/analytics-google", "./helpers/page-visibility", "./helpers/parser", "./helpers/dom", "./helpers/string", "./helpers/image", "./helpers/countries", "./helpers/languages", "./helpers/locales", "./helpers/notify", "./helpers/date", "./helpers/number", "./helpers/ux-form-renderer", "./controls/filter-boolean-control", "./controls/filter-chips-control", "./controls/filter-date-control", "./controls/filter-dates-control", "./controls/filter-prompt-control", "./controls/filter-control", "./controls/select-control", "./controls/ux-date-time-picker", "./dialogs/confirm-dialog", "./dialogs/countries-dialog", "./dialogs/languages-dialog", "./dialogs/locales-dialog", "./dialogs/prompt-boolean-dialog", "./dialogs/prompt-date-dialog", "./dialogs/prompt-select-dialog", "./dialogs/prompt-text-dialog", "./elements/ar-dialog", "./elements/ar-dialog-theme", "./elements/ar-dialog-prompt", "./elements/ar-drawer", "./elements/ar-drawer-theme", "./elements/ar-lang-selector", "./elements/ar-lang-selector-theme", "./elements/ar-metadata", "./elements/ar-metadata-theme", "./elements/ar-next", "./elements/ar-next-theme", "./elements/ar-notification", "./elements/ar-progress", "./elements/ar-progress-theme", "./elements/ar-select", "./elements/ar-option", "./elements/ar-select-theme", "./elements/ar-search-input", "./elements/ar-search-input-theme", "./elements/ar-smart-toolbar", "./elements/ar-smart-toolbar-theme", "./elements/ar-spinner-icon", "./elements/ar-spinner-icon-theme", "./elements/ar-spinner-line", "./elements/ar-spinner-line-theme", "./elements/ar-stripe-element", "./elements/ar-stripe-element-theme", "./elements/listing/listing-head", "./elements/listing/listing-list-item", "./elements/listing/listing-list", "./elements/listing/listing-toolbar"], function (exports_1, context_1) {
    "use strict";
    var sentry_1, aurelia_framework_1, numbers_1;
    var __moduleName = context_1 && context_1.id;
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
            aurelia_framework_1.PLATFORM.moduleName('./elements/ar-dialog-prompt'),
            aurelia_framework_1.PLATFORM.moduleName('./elements/ar-dialog'),
            aurelia_framework_1.PLATFORM.moduleName('./elements/ar-drawer'),
            aurelia_framework_1.PLATFORM.moduleName('./elements/ar-lang-selector'),
            aurelia_framework_1.PLATFORM.moduleName('./elements/ar-metadata'),
            aurelia_framework_1.PLATFORM.moduleName('./elements/ar-next'),
            aurelia_framework_1.PLATFORM.moduleName('./elements/ar-next-item.html'),
            aurelia_framework_1.PLATFORM.moduleName('./elements/ar-notification'),
            aurelia_framework_1.PLATFORM.moduleName('./elements/ar-progress'),
            aurelia_framework_1.PLATFORM.moduleName('./elements/ar-select'),
            aurelia_framework_1.PLATFORM.moduleName('./elements/ar-option'),
            aurelia_framework_1.PLATFORM.moduleName('./elements/ar-search-input'),
            aurelia_framework_1.PLATFORM.moduleName('./elements/ar-smart-toolbar'),
            aurelia_framework_1.PLATFORM.moduleName('./elements/ar-spinner-icon'),
            aurelia_framework_1.PLATFORM.moduleName('./elements/ar-spinner-line'),
            aurelia_framework_1.PLATFORM.moduleName('./elements/ar-stripe-element'),
            aurelia_framework_1.PLATFORM.moduleName('./elements/noie'),
            aurelia_framework_1.PLATFORM.moduleName('./value-converters/currency'),
            aurelia_framework_1.PLATFORM.moduleName('./value-converters/date'),
            aurelia_framework_1.PLATFORM.moduleName('./value-converters/first-letter-upper'),
            aurelia_framework_1.PLATFORM.moduleName('./value-converters/phone'),
            aurelia_framework_1.PLATFORM.moduleName('./value-converters/langname'),
            aurelia_framework_1.PLATFORM.moduleName('./value-converters/countryname'),
            aurelia_framework_1.PLATFORM.moduleName('./value-converters/nl2br'),
            aurelia_framework_1.PLATFORM.moduleName('./value-converters/object-keys'),
            numbers_1.NumStringValueConverter,
            numbers_1.RoundValueConverter,
            numbers_1.AddZeroDecimalValueConverter,
            aurelia_framework_1.PLATFORM.moduleName('./value-converters/translate'),
        ]);
        config.container.registerInstance('aurelia-resources-config', pluginConfig);
    }
    exports_1("configure", configure);
    var exportedNames_1 = {
        "configure": true,
        "Api": true,
        "Analytics": true,
        "AnalyticEntry": true,
        "AnalyticsGoogle": true,
        "PageVisibilityHelpers": true,
        "Parser": true,
        "SentryHelper": true,
        "DomHelpers": true,
        "StringHelpers": true,
        "ImageHelpers": true,
        "countries": true,
        "languages": true,
        "locales": true,
        "ArDialog": true,
        "arDialog": true,
        "ArDialogTheme": true,
        "ArDialogPrompt": true,
        "ArDrawer": true,
        "ArDrawerToggleAttribute": true,
        "ArDrawerOpenAttribute": true,
        "ArDrawerCloseAttribute": true,
        "onDrawerStatusChanged": true,
        "ArDrawerTheme": true,
        "ArMetadata": true,
        "ArMetadataTheme": true,
        "ArNext": true,
        "ArNextTheme": true,
        "ArProgress": true,
        "ArProgressTheme": true,
        "ArSelect": true,
        "ArOption": true,
        "ArSelectTheme": true,
        "ArSearchInput": true,
        "ArSearchInputTheme": true,
        "ArSmartToolbar": true,
        "ArSmartToolbarTheme": true,
        "ArSpinnerIcon": true,
        "ArSpinnerIconTheme": true,
        "ArSpinnerLine": true,
        "ArSpinnerLineTheme": true,
        "ArStripeElement": true,
        "ArStripeElementTheme": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (sentry_1_1) {
                sentry_1 = sentry_1_1;
                exports_1({
                    "SentryHelper": sentry_1_1["SentryHelper"]
                });
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (numbers_1_1) {
                numbers_1 = numbers_1_1;
            },
            function (api_1_1) {
                exports_1({
                    "Api": api_1_1["Api"]
                });
            },
            function (analytics_1_1) {
                exports_1({
                    "Analytics": analytics_1_1["Analytics"],
                    "AnalyticEntry": analytics_1_1["AnalyticEntry"]
                });
            },
            function (analytics_google_1_1) {
                exports_1({
                    "AnalyticsGoogle": analytics_google_1_1["AnalyticsGoogle"]
                });
            },
            function (page_visibility_1_1) {
                exports_1({
                    "PageVisibilityHelpers": page_visibility_1_1["PageVisibilityHelpers"]
                });
            },
            function (parser_1_1) {
                exports_1({
                    "Parser": parser_1_1["Parser"]
                });
            },
            function (dom_1_1) {
                exports_1({
                    "DomHelpers": dom_1_1["DomHelpers"]
                });
            },
            function (string_1_1) {
                exports_1({
                    "StringHelpers": string_1_1["StringHelpers"]
                });
            },
            function (image_1_1) {
                exports_1({
                    "ImageHelpers": image_1_1["ImageHelpers"]
                });
            },
            function (countries_1_1) {
                exports_1({
                    "countries": countries_1_1["countries"]
                });
            },
            function (languages_1_1) {
                exports_1({
                    "languages": languages_1_1["languages"]
                });
            },
            function (locales_1_1) {
                exports_1({
                    "locales": locales_1_1["locales"]
                });
            },
            function (notify_1_1) {
                exportStar_1(notify_1_1);
            },
            function (date_1_1) {
                exportStar_1(date_1_1);
            },
            function (number_1_1) {
                exportStar_1(number_1_1);
            },
            function (ux_form_renderer_1_1) {
                exportStar_1(ux_form_renderer_1_1);
            },
            function (filter_boolean_control_1_1) {
                exportStar_1(filter_boolean_control_1_1);
            },
            function (filter_chips_control_1_1) {
                exportStar_1(filter_chips_control_1_1);
            },
            function (filter_date_control_1_1) {
                exportStar_1(filter_date_control_1_1);
            },
            function (filter_dates_control_1_1) {
                exportStar_1(filter_dates_control_1_1);
            },
            function (filter_prompt_control_1_1) {
                exportStar_1(filter_prompt_control_1_1);
            },
            function (filter_control_1_1) {
                exportStar_1(filter_control_1_1);
            },
            function (select_control_1_1) {
                exportStar_1(select_control_1_1);
            },
            function (ux_date_time_picker_1_1) {
                exportStar_1(ux_date_time_picker_1_1);
            },
            function (confirm_dialog_1_1) {
                exportStar_1(confirm_dialog_1_1);
            },
            function (countries_dialog_1_1) {
                exportStar_1(countries_dialog_1_1);
            },
            function (languages_dialog_1_1) {
                exportStar_1(languages_dialog_1_1);
            },
            function (locales_dialog_1_1) {
                exportStar_1(locales_dialog_1_1);
            },
            function (prompt_boolean_dialog_1_1) {
                exportStar_1(prompt_boolean_dialog_1_1);
            },
            function (prompt_date_dialog_1_1) {
                exportStar_1(prompt_date_dialog_1_1);
            },
            function (prompt_select_dialog_1_1) {
                exportStar_1(prompt_select_dialog_1_1);
            },
            function (prompt_text_dialog_1_1) {
                exportStar_1(prompt_text_dialog_1_1);
            },
            function (ar_dialog_1_1) {
                exports_1({
                    "ArDialog": ar_dialog_1_1["ArDialog"],
                    "arDialog": ar_dialog_1_1["arDialog"]
                });
            },
            function (ar_dialog_theme_1_1) {
                exports_1({
                    "ArDialogTheme": ar_dialog_theme_1_1["ArDialogTheme"]
                });
            },
            function (ar_dialog_prompt_1_1) {
                exports_1({
                    "ArDialogPrompt": ar_dialog_prompt_1_1["ArDialogPrompt"]
                });
            },
            function (ar_drawer_1_1) {
                exports_1({
                    "ArDrawer": ar_drawer_1_1["ArDrawer"],
                    "ArDrawerToggleAttribute": ar_drawer_1_1["ArDrawerToggleAttribute"],
                    "ArDrawerOpenAttribute": ar_drawer_1_1["ArDrawerOpenAttribute"],
                    "ArDrawerCloseAttribute": ar_drawer_1_1["ArDrawerCloseAttribute"],
                    "onDrawerStatusChanged": ar_drawer_1_1["onDrawerStatusChanged"]
                });
            },
            function (ar_drawer_theme_1_1) {
                exports_1({
                    "ArDrawerTheme": ar_drawer_theme_1_1["ArDrawerTheme"]
                });
            },
            function (ar_lang_selector_1_1) {
                exportStar_1(ar_lang_selector_1_1);
            },
            function (ar_lang_selector_theme_1_1) {
                exportStar_1(ar_lang_selector_theme_1_1);
            },
            function (ar_metadata_1_1) {
                exports_1({
                    "ArMetadata": ar_metadata_1_1["ArMetadata"]
                });
            },
            function (ar_metadata_theme_1_1) {
                exports_1({
                    "ArMetadataTheme": ar_metadata_theme_1_1["ArMetadataTheme"]
                });
            },
            function (ar_next_1_1) {
                exports_1({
                    "ArNext": ar_next_1_1["ArNext"]
                });
            },
            function (ar_next_theme_1_1) {
                exports_1({
                    "ArNextTheme": ar_next_theme_1_1["ArNextTheme"]
                });
            },
            function (ar_notification_1_1) {
                exportStar_1(ar_notification_1_1);
            },
            function (ar_progress_1_1) {
                exports_1({
                    "ArProgress": ar_progress_1_1["ArProgress"]
                });
            },
            function (ar_progress_theme_1_1) {
                exports_1({
                    "ArProgressTheme": ar_progress_theme_1_1["ArProgressTheme"]
                });
            },
            function (ar_select_1_1) {
                exports_1({
                    "ArSelect": ar_select_1_1["ArSelect"]
                });
            },
            function (ar_option_1_1) {
                exports_1({
                    "ArOption": ar_option_1_1["ArOption"]
                });
            },
            function (ar_select_theme_1_1) {
                exports_1({
                    "ArSelectTheme": ar_select_theme_1_1["ArSelectTheme"]
                });
            },
            function (ar_search_input_1_1) {
                exports_1({
                    "ArSearchInput": ar_search_input_1_1["ArSearchInput"]
                });
            },
            function (ar_search_input_theme_1_1) {
                exports_1({
                    "ArSearchInputTheme": ar_search_input_theme_1_1["ArSearchInputTheme"]
                });
            },
            function (ar_smart_toolbar_1_1) {
                exports_1({
                    "ArSmartToolbar": ar_smart_toolbar_1_1["ArSmartToolbar"]
                });
            },
            function (ar_smart_toolbar_theme_1_1) {
                exports_1({
                    "ArSmartToolbarTheme": ar_smart_toolbar_theme_1_1["ArSmartToolbarTheme"]
                });
            },
            function (ar_spinner_icon_1_1) {
                exports_1({
                    "ArSpinnerIcon": ar_spinner_icon_1_1["ArSpinnerIcon"]
                });
            },
            function (ar_spinner_icon_theme_1_1) {
                exports_1({
                    "ArSpinnerIconTheme": ar_spinner_icon_theme_1_1["ArSpinnerIconTheme"]
                });
            },
            function (ar_spinner_line_1_1) {
                exports_1({
                    "ArSpinnerLine": ar_spinner_line_1_1["ArSpinnerLine"]
                });
            },
            function (ar_spinner_line_theme_1_1) {
                exports_1({
                    "ArSpinnerLineTheme": ar_spinner_line_theme_1_1["ArSpinnerLineTheme"]
                });
            },
            function (ar_stripe_element_1_1) {
                exports_1({
                    "ArStripeElement": ar_stripe_element_1_1["ArStripeElement"]
                });
            },
            function (ar_stripe_element_theme_1_1) {
                exports_1({
                    "ArStripeElementTheme": ar_stripe_element_theme_1_1["ArStripeElementTheme"]
                });
            },
            function (listing_head_1_1) {
                exportStar_1(listing_head_1_1);
            },
            function (listing_list_item_1_1) {
                exportStar_1(listing_list_item_1_1);
            },
            function (listing_list_1_1) {
                exportStar_1(listing_list_1_1);
            },
            function (listing_toolbar_1_1) {
                exportStar_1(listing_toolbar_1_1);
            }
        ],
        execute: function () {
        }
    };
});
