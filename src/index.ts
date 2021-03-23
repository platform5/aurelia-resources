import { SentryHelper } from './helpers/sentry';
import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import { NumStringValueConverter, RoundValueConverter, AddZeroDecimalValueConverter } from './value-converters/numbers';

export interface AureliaResourcesConfig {
  stripe?: {
    apiKey?: string
  };
  sentry?: {
    dsn?: string;
    environment?: string;
    debug?: boolean;
    samplingRate?: number;
  }
}

export function configure(config: FrameworkConfiguration, pluginConfig?: AureliaResourcesConfig) {
  config.container.registerInstance('aurelia-resources-config', pluginConfig || {});

  const sentry =config.container.get(SentryHelper);
  sentry.initIfConfigured();

  config.globalResources([
    PLATFORM.moduleName('./controls/ar-tags-input'),
    PLATFORM.moduleName('./controls/filter-boolean-control'),
    PLATFORM.moduleName('./controls/filter-chips-control'),
    PLATFORM.moduleName('./controls/filter-date-control'),
    PLATFORM.moduleName('./controls/filter-dates-control'),
    PLATFORM.moduleName('./controls/filter-prompt-control'),
    PLATFORM.moduleName('./controls/filter-control'),
    PLATFORM.moduleName('./controls/select-control'),
  ]);

  config.globalResources([
    PLATFORM.moduleName('./elements/listing/listing-head'),
    PLATFORM.moduleName('./elements/listing/listing-list-item'),
    PLATFORM.moduleName('./elements/listing/listing-list'),
    PLATFORM.moduleName('./elements/listing/listing-toolbar'),
  ]);

  config.globalResources([

    PLATFORM.moduleName('./dialogs/confirm-dialog'),
    PLATFORM.moduleName('./dialogs/countries-dialog'),
    PLATFORM.moduleName('./dialogs/languages-dialog'),
    PLATFORM.moduleName('./dialogs/locales-dialog'),
    PLATFORM.moduleName('./dialogs/prompt-boolean-dialog'),
    PLATFORM.moduleName('./dialogs/prompt-select-dialog'),
    PLATFORM.moduleName('./dialogs/prompt-text-dialog'),

    PLATFORM.moduleName('./elements/ar-breadcrumb'),
    PLATFORM.moduleName('./elements/ar-breadcrumb-item.html'),

    PLATFORM.moduleName('./elements/ar-dialog-prompt'),
    PLATFORM.moduleName('./elements/ar-dialog'),

    PLATFORM.moduleName('./elements/ar-drawer'),

    PLATFORM.moduleName('./elements/ar-lang-selector'),
    PLATFORM.moduleName('./elements/ar-list-item'),

    PLATFORM.moduleName('./elements/ar-main-header'),
    
    PLATFORM.moduleName('./elements/ar-main-footer'),

    PLATFORM.moduleName('./elements/ar-metadata'),

    PLATFORM.moduleName('./elements/ar-next'),
    PLATFORM.moduleName('./elements/ar-next-item.html'),

    PLATFORM.moduleName('./elements/ar-notification'),

    PLATFORM.moduleName('./elements/ar-parallax'),

    PLATFORM.moduleName('./elements/ar-progress'),

    PLATFORM.moduleName('./elements/ar-range-input'),

    PLATFORM.moduleName('./elements/ar-select'),
    PLATFORM.moduleName('./elements/ar-option'),

    PLATFORM.moduleName('./elements/ar-slider'),
    PLATFORM.moduleName('./elements/ar-slide'),

    PLATFORM.moduleName('./elements/ar-search-input'),

    PLATFORM.moduleName('./elements/ar-smart-toolbar'),

    PLATFORM.moduleName('./elements/ar-spinner-icon'),
    PLATFORM.moduleName('./elements/ar-spinner-line'),

    PLATFORM.moduleName('./elements/ar-stripe-element'),

    PLATFORM.moduleName('./elements/ar-timeline'),
    PLATFORM.moduleName('./elements/ar-timeline-item'),

    PLATFORM.moduleName('./elements/ar-video'),
    PLATFORM.moduleName('./elements/noie'),

    PLATFORM.moduleName('./elements/ux-input-int-phone'),

    PLATFORM.moduleName('./value-converters/currency'),
    PLATFORM.moduleName('./value-converters/date'),
    PLATFORM.moduleName('./value-converters/first-letter-upper'),
    PLATFORM.moduleName('./value-converters/phone'),
    PLATFORM.moduleName('./value-converters/langname'),
    PLATFORM.moduleName('./value-converters/countryname'),
    PLATFORM.moduleName('./value-converters/locale-name'),
    PLATFORM.moduleName('./value-converters/nl2br'),
    PLATFORM.moduleName('./value-converters/object-keys'),
    // PLATFORM.moduleName('./value-converters/round'),
    NumStringValueConverter,
    RoundValueConverter,
    AddZeroDecimalValueConverter,
    PLATFORM.moduleName('./value-converters/translate'),

    PLATFORM.moduleName('./attributes/smooth-scroll'),
    PLATFORM.moduleName('./attributes/touch-active'),
  ]);
  config.container.registerInstance('aurelia-resources-config', pluginConfig);
}

/* Expose helpers */
export { Api } from './helpers/api';
export { Analytics, AnalyticEntry } from './helpers/analytics';
export { AnalyticsGoogle } from './helpers/analytics-google';
export { CordovaHelpers } from './helpers/cordova';
export { PageVisibilityHelpers } from './helpers/page-visibility';
export { Parser } from './helpers/parser';
export { SentryHelper } from './helpers/sentry';
export { DomHelpers } from './helpers/dom';
export { StringHelpers } from './helpers/string';
export { ImageUtils, ImageHelpers } from './helpers/image';
export { countries } from './helpers/countries';
export { languages } from './helpers/languages';
export { locales } from './helpers/locales';
export * from './helpers/notify';
export * from './helpers/number';
export * from './helpers/ux-form-renderer';

/* Expose Controls */
export * from './controls/filter-boolean-control';
export * from './controls/filter-chips-control';
export * from './controls/filter-date-control';
export * from './controls/filter-dates-control';
export * from './controls/filter-prompt-control';
export * from './controls/filter-control';
export * from './controls/select-control';

/* Expose Dialogs */
export * from './dialogs/confirm-dialog';
export * from './dialogs/countries-dialog';
export * from './dialogs/languages-dialog';
export * from './dialogs/locales-dialog';
export * from './dialogs/prompt-boolean-dialog';
export * from './dialogs/prompt-select-dialog';
export * from './dialogs/prompt-text-dialog';

/* Expose elements */
export { ArBreadcrumb } from './elements/ar-breadcrumb';
export { ArBreadcrumbTheme } from './elements/ar-breadcrumb-theme';

export { DialogTypes, ArDialog, ArDialogOptions, arDialog } from './elements/ar-dialog';
export { ArDialogTheme } from './elements/ar-dialog-theme';
export { ArDialogPrompt, ArDialogPromptOption } from './elements/ar-dialog-prompt';

export { ArDrawer, ArDrawerToggleAttribute, ArDrawerOpenAttribute, ArDrawerCloseAttribute, onDrawerStatusChanged } from './elements/ar-drawer';
export { ArDrawerTheme } from './elements/ar-drawer-theme';

export * from './elements/ar-lang-selector';
export * from './elements/ar-lang-selector-theme';

export { ArListItem } from './elements/ar-list-item';
export { ArListTheme } from './elements/ar-list-theme';

export { ArMainHeader } from './elements/ar-main-header';
export { ArMainHeaderTheme } from './elements/ar-main-header-theme';

export { ArMainFooter } from './elements/ar-main-footer';
export { ArMainFooterTheme } from './elements/ar-main-footer-theme';

export { ArMetadata } from './elements/ar-metadata';
export { ArMetadataTheme } from './elements/ar-metadata-theme';

export { ArNext } from './elements/ar-next';
export { ArNextTheme } from './elements/ar-next-theme';

export * from './elements/ar-notification';

export { ArParallax } from './elements/ar-parallax';

export { ArProgress } from './elements/ar-progress';
export { ArProgressTheme } from './elements/ar-progress-theme';

export { ArRangeInput } from './elements/ar-range-input';
export { ArRangeInputTheme } from './elements/ar-range-input-theme';

export { ArSelect } from './elements/ar-select';
export { ArOption } from './elements/ar-option';
export { ArSelectTheme } from './elements/ar-select-theme';

export { ArSlider } from './elements/ar-slider';
export { ArSlide } from './elements/ar-slide';
export { ArSliderTheme } from './elements/ar-slider-theme';

export { ArSearchInput } from './elements/ar-search-input';
export { ArSearchInputTheme } from './elements/ar-search-input-theme';

export { ArSmartToolbar } from './elements/ar-smart-toolbar';
export { ArSmartToolbarTheme } from './elements/ar-smart-toolbar-theme';

export { ArSpinnerIcon } from './elements/ar-spinner-icon';
export { ArSpinnerIconTheme } from './elements/ar-spinner-icon-theme';

export { ArSpinnerLine } from './elements/ar-spinner-line';
export { ArSpinnerLineTheme } from './elements/ar-spinner-line-theme';

export { ArStripeElement } from './elements/ar-stripe-element';
export { ArStripeElementTheme } from './elements/ar-stripe-element-theme';

export { ArTimeline } from './elements/ar-timeline';
export { ArTimelineTheme } from './elements/ar-timeline-theme';
export { ArTimelineItem } from './elements/ar-timeline-item';

export { ArVideo } from './elements/ar-video';
export { ArVideoTheme } from './elements/ar-video-theme';

export { UxInputIntPhone } from './elements/ux-input-int-phone';

export * from './elements/listing/listing-head';
export * from './elements/listing/listing-list-item';
export * from './elements/listing/listing-list';
export * from './elements/listing/listing-toolbar';

/* Expose attributes */
export { SmoothScroll } from './attributes/smooth-scroll';

/* Expose interfaces */
export { StringTMap, NumberTMap, StringAnyMap, NumberAnyMap, StringStringMap, NumberStringMap, StringNumberMap, NumberNumberMap, StringBooleanMap, NumberBooleanMap} from './interfaces/types';

export * from './icons';
