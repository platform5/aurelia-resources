export declare class UxInputIntPhone {
    private element;
    value: string;
    national: string;
    international: string;
    isValid: boolean;
    isMobile: boolean;
    isPossible: boolean;
    disabled: boolean;
    label: any;
    private countriesFilter;
    autocomplete: string;
    private log;
    uxInputTheme: any;
    uxSelectTheme: any;
    private countrySelect;
    inputValue: string;
    constructor(element: Element);
    get countries(): {
        countryCode: string;
        name: string;
        countryCode2: string;
    }[];
    attached(): void;
    private countryCode;
    private countryPrefix;
    private phonePlaceholder;
    getCountryPrefix(countryCode: string): string;
    countryCodeChanged(): void;
    openCountrySelector(event: any): void;
    preventInternalValueUpdate: boolean;
    inputValueChanged(): void;
    nationalChanged(): void;
    internationalChanged(): void;
    valueChanged(): void;
}
