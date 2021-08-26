export declare class UxDateTimePicker {
    private element;
    value: Date;
    defaultTime: string;
    step: number;
    label: string;
    placeholder: string;
    time: string;
    private _value;
    constructor(element: HTMLElement);
    bind(): void;
    valueChanged(): void;
    setValueAndTime(newValue: Date | undefined): void;
    applyDateToTime(): void;
    _valueChanged(): void;
    timeChanged(newValue: string, oldValue: string): void;
    private timeout;
    private requestApplyTimeToDate;
    private preventApply;
    applyTimeToDate(): void;
    notifyChange(): void;
}
