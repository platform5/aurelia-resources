System.register([], function (exports_1, context_1) {
    "use strict";
    var list, languages, countries, locales;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            // list extracted from https://stackoverflow.com/a/28357857
            // better list might be found somewhere else, this is just a start
            exports_1("list", list = [
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
            ]);
            exports_1("languages", languages = {
                en: 'English',
                fr: 'French',
                de: 'German',
                it: 'Italian',
            });
            exports_1("countries", countries = {
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
            });
            exports_1("locales", locales = {
                list: list,
                languages: languages,
                countries: countries
            });
            exports_1("default", locales);
        }
    };
});
