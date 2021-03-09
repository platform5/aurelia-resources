import { bindable } from 'aurelia-framework';
import * as moment from 'moment';
import { getLogger, Logger } from 'aurelia-logging';

export class ArTimelineItem {

  @bindable date: Date | null = null;
  
  public order: number | null = null;
  public hidden: boolean = false;
  @bindable public position: string = 'left';
  
  private log: Logger;

  constructor() {
    this.log = getLogger('ar-timeline-item');
  }

  dateChanged() {
    let instanceOfDate = this.date instanceof Date;
    if (instanceOfDate) return;
    if (typeof this.date === 'string') {
      let m = moment(this.date);
      if (m.isValid) this.date = m.toDate();
    }
  }
}
