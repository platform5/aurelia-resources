export declare class NumberHelper {
    static nbDecimal: number;
    static thousandSeparator: string;
    static round(value: number, nbDecimal?: number): number;
    static addZeroDecimals(value: number, nbDecimal?: number): string;
    static addThousandSeparators(value: number | string, separator?: string): string;
    static numString(value: number, nbDecimals?: number, separator?: string): string;
}
