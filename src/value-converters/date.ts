import * as moment from 'moment';
import { DateHelper } from '../helpers/date';

export class DateValueConverter {
  toView(date: string | moment.Moment, format: string = 'DD.MM.YYYY') {
    const m = DateHelper.moment(date, format);
    if (!m) {
      return '';
    }

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
