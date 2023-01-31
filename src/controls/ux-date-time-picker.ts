import { bindable, bindingMode, observable, inject } from 'aurelia-framework';
import moment from 'moment';

@inject(Element)
export class UxDateTimePicker {
  
  @bindable({defaultBindingMode: bindingMode.twoWay}) value: Date;
  @bindable defaultTime: string;
  @bindable step: number = 3600;
  
  @bindable label: string;
  @bindable placeholder: string;

  @observable time: string;

  @observable private _value: Date;

  public constructor(private element: HTMLElement) {

  }

  public bind() {
    this.valueChanged();
  }

  public valueChanged() {
    this.setValueAndTime(this.value);
  }

  public setValueAndTime(newValue: Date | undefined) {
    this.preventApply = true;
    this._value = newValue;
    this.applyDateToTime();
    this.preventApply = false;
  }

  public applyDateToTime() {
    if (!this._value) {
      this.time = '';
      return;
    }
    const m = moment(this._value);
    if (!m.isValid()) {
      this.time = '';
      return;
    }
    this.time = m.format('HH:mm');
  }

  public _valueChanged() {
    this.requestApplyTimeToDate();
  }

  public timeChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this._valueChanged();
    }
  }

  private timeout;
  private requestApplyTimeToDate() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.applyTimeToDate();
    }, 50);
  }

  private preventApply = false;
  public applyTimeToDate() {
    if (this.preventApply) {
      return;
    }
    if (!this._value) {
      this.time = '';
      this.value = null;
      return;
    }
    const m = moment(this._value);
    if (!m.isValid()) {
      this.time = '';
      return;
    }
    if (!this.time && this.defaultTime) {
      this.time = this.defaultTime;
      return; // this will trigger the timeChanged observer and come back here
    }
    const timeValues = this.time.split(':');
    const hour = parseInt(timeValues[0], 10);
    const minutes = parseInt(timeValues[1], 10);
    if (m.hour() === hour && m.minute() === minutes) {
      this.value = this._value;
      return; // time is correct
    }

    this.preventApply = true;
    m.hour(hour).minute(minutes);
    this._value = m.toDate();
    this.value = this._value;
    setTimeout(() => {
      this.preventApply = false;
      this.notifyChange();
    }, 5);
  }

  public notifyChange() {
    this.element.dispatchEvent(new CustomEvent('change', {detail: this.value, bubbles: true}));
  }
}
