export declare class ListingList {
    private element;
    separators: boolean;
    firstLetterContainerSelector: string;
    separatorSelector: string;
    separator: 'first-letter' | 'all';
    private items;
    constructor(element: Element);
    attached(): void;
    itemsChanged(): void;
}
