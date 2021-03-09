"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// list extracted from https://stackoverflow.com/a/28357857
// better list might be found somewhere else, this is just a start
exports.list = [
    'en_AU',
    'en_CA',
    'en_NZ',
    'en_GB',
    'en_US',
    'fr_BE',
    'fr_CA',
    'fr_FR',
    'fr_CH',
    'de_AT',
    'de_BE',
    'de_DE',
    'de_LU',
    'de_CH',
    'it_IT',
    'it_CH',
];
exports.languages = {
    en: 'English',
    fr: 'French',
    de: 'German',
    it: 'Italian',
};
exports.countries = {
    AU: 'Austrlia',
    CA: 'Canada',
    NZ: 'New Zealand',
    GB: 'United Kingdom',
    US: 'United States',
    FR: 'France',
    CH: 'Switzerland',
    AT: 'Austria',
    BE: 'Belgium',
    DE: 'Germany',
    IT: 'Italy',
};
exports.locales = {
    list: exports.list,
    languages: exports.languages,
    countries: exports.countries
};
exports.default = exports.locales;
