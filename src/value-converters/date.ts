import * as moment from 'moment';

export class DateValueConverter {
  toView(date: string | moment.Moment, format: string = 'DD.MM.YYYY') {
    if (!date) return '';
    let m: moment.Moment;
    if (typeof date === 'string') {
      if (date.length === 10 && date.substr(2, 1) === '-' && date.substr(5, 1) === '-') {
        m = moment(date, 'DD-MM-YYYY');
      } else if (date.length === 8 && date.substr(2, 1) === '-' && date.substr(5, 1) === '-') {
        m = moment(date, 'DD-MM-YY');
      } else if (date.length === 10 && date.substr(2, 1) === '/' && date.substr(5, 1) === '/') {
        m = moment(date, 'DD/MM/YYYY');
      } else if (date.length === 8 && date.substr(2, 1) === '/' && date.substr(5, 1) === '/') {
        m = moment(date, 'DD/MM/YY');
      } else if (date.length === 10 && date.substr(2, 1) === '.' && date.substr(5, 1) === '.') {
        m = moment(date, 'DD.MM.YYYY');
      } else if (date.length === 8 && date.substr(2, 1) === '.' && date.substr(5, 1) === '.') {
        m = moment(date, 'DD.MM.YY');
      } else if (date.length > 10 && date.indexOf('T') !== -1 && date.indexOf('+') !== -1) {
        m = moment(date);
      } else {
        m = moment(date);
      }
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
