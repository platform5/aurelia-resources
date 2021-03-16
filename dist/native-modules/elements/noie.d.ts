export declare class Noie {
    private element;
    private title;
    private text;
    private bottomText;
    private log;
    private isIE;
    constructor(element: Element);
    attached(): void;
    openLink(href: string): void;
}
