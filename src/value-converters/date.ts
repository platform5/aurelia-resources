import * as moment from 'moment';

export class DateValueConverter {
  toView(date: string | moment.Moment, format: string = 'DD.MM.YYYY') {
    if (!date) return '';
    let m = moment(date);

    if (format === 'nice') {
      let diff = m.diff(moment(), 'days');
      if (diff < 14) {
        return m.fromNow();
      } else {
        return m.calendar();
      }
    } else if (format === 'calendar') {
      return m.calendar();
    } else if (format === 'fromnow') {
      return m.fromNow(true);
    } else {
      return m.format(format);
    }
  }
}
