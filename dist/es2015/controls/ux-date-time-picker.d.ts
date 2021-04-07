export declare class UxDateTimePicker {
    private element;
    value: Date;
    defaultTime: string;
    step: number;
    label: string;
    placeholder: string;
    time: string;
    constructor(element: HTMLElement);
    bind(): void;
    valueChanged(): void;
    timeChanged(newValue: string, oldValue: string): void;
    applyDateToTime(): void;
    private preventApply;
    applyTimeToDate(): void;
    notifyChange(): void;
}
