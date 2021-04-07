import { bindable, bindingMode, observable, inject } from 'aurelia-framework';
import * as moment from 'moment';

@inject(Element)
export class UxDateTimePicker {
  
  @bindable({defaultBindingMode: bindingMode.twoWay}) value: Date;
  @bindable defaultTime: string;
  @bindable step: number = 3600;
  
  @bindable label: string;
  @bindable placeholder: string;

  @observable time: string;

  public constructor(private element: HTMLElement) {

  }

  public bind() {
    this.applyDateToTime();
  }

  public setValueAndTime(newValue: Date | undefined) {
    this.value = newValue;
    this.applyDateToTime();
  }

  public valueChanged() {
    this.requestApplyTimeToDate();
  }

  public timeChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.applyTimeToDate();
    }
  }

  public applyDateToTime() {
    if (!this.value) {
      this.time = '';
      return;
    }
    const m = moment(this.value);
    if (!m.isValid()) {
      this.time = '';
      return;
    }
    this.time = m.format('HH:mm');
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
    if (!this.value) {
      this.time = '';
      return;
    }
    const m = moment(this.value);
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
      return; // time is correct
    }

    this.preventApply = true;
    m.hour(hour).minute(minutes);
    this.value = m.toDate();
    setTimeout(() => {
      this.preventApply = false;
      this.notifyChange();
    }, 5);
  }

  public notifyChange() {
    this.element.dispatchEvent(new CustomEvent('change', {detail: this.value, bubbles: true}));
  }
}
