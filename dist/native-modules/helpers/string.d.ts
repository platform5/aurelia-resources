export interface RandomOptions {
    charset: string;
    length: number;
    exclude?: string;
}
export declare class StringHelpers {
    static numbers: string;
    static letters: string;
    static specials: string;
    static default: RandomOptions;
    static random(options: RandomOptions): string;
    static randomString(nbChars?: number): string;
    static randomNumbers(nbChars?: number): string;
    static randomToken(nbChars?: number): string;
    static validatePhoneNumber(phoneNumber: string): string | false;
    static validateEmail(email: string): boolean;
}
