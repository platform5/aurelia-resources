import * as moment from 'moment';
import { DateHelper } from '../helpers/date';
var DateValueConverter = /** @class */ (function () {
    function DateValueConverter() {
    }
    DateValueConverter.prototype.toView = function (date, format) {
        if (format === void 0) { format = 'DD.MM.YYYY'; }
        var m = DateHelper.moment(date, format);
        if (!m) {
            return '';
        }
        if (format === 'nice') {
            var diff = m.diff(moment(), 'days');
            if (diff < 14) {
                return m.fromNow();
            }
            else {
                return m.calendar();
            }
        }
        else if (format === 'calendar') {
            return m.calendar();
        }
        else if (format === 'fromnow') {
            return m.fromNow(true);
        }
        else {
            return m.format(format);
        }
    };
    return DateValueConverter;
}());
export { DateValueConverter };
