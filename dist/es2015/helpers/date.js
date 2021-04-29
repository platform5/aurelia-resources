import * as moment from 'moment';
var DateHelper = /** @class */ (function () {
    function DateHelper() {
    }
    DateHelper.moment = function (date, suggestedFormat) {
        if (!date)
            return undefined;
        var m;
        if (typeof date === 'string') {
            var seemsIsoString = date.includes('T') && date.includes('Z');
            if (seemsIsoString) {
                m = moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSSZ');
                if (m.isValid()) {
                    return m;
                }
            }
            if (suggestedFormat) {
                var formats = Array.isArray(suggestedFormat) ? suggestedFormat : [suggestedFormat];
                for (var _i = 0, formats_1 = formats; _i < formats_1.length; _i++) {
                    var format = formats_1[_i];
                    m = moment(date, format);
                    if (m.isValid()) {
                        return m;
                    }
                    m = undefined;
                }
            }
            if (date.length === 10 && date.substr(2, 1) === '-' && date.substr(5, 1) === '-') {
                m = moment(date, 'DD-MM-YYYY');
            }
            else if (date.length === 16 && date.substr(2, 1) === '-' && date.substr(5, 1) === '-' && date.substr(10, 1) === ' ' && date.substr(13, 1) === ':') {
                m = moment(date, 'DD-MM-YYYY HH:mm');
            }
            else if (date.length === 8 && date.substr(2, 1) === '-' && date.substr(5, 1) === '-') {
                m = moment(date, 'DD-MM-YY');
            }
            else if (date.length === 10 && date.substr(2, 1) === '/' && date.substr(5, 1) === '/') {
                m = moment(date, 'DD/MM/YYYY');
            }
            else if (date.length === 16 && date.substr(2, 1) === '/' && date.substr(5, 1) === '/' && date.substr(10, 1) === ' ' && date.substr(13, 1) === ':') {
                m = moment(date, 'DD/MM/YYYY HH:mm');
            }
            else if (date.length === 8 && date.substr(2, 1) === '/' && date.substr(5, 1) === '/') {
                m = moment(date, 'DD/MM/YY');
            }
            else if (date.length === 10 && date.substr(2, 1) === '.' && date.substr(5, 1) === '.') {
                m = moment(date, 'DD.MM.YYYY');
            }
            else if (date.length === 16 && date.substr(2, 1) === '.' && date.substr(5, 1) === '.' && date.substr(10, 1) === ' ' && date.substr(13, 1) === ':') {
                m = moment(date, 'DD.MM.YYYY HH:mm');
            }
            else if (date.length === 8 && date.substr(2, 1) === '.' && date.substr(5, 1) === '.') {
                m = moment(date, 'DD.MM.YY');
            }
            else if (date.length > 10 && date.indexOf('T') !== -1 && date.indexOf('+') !== -1) {
                m = moment(date);
            }
            else {
                m = moment(date);
            }
        }
        else if (date instanceof Date) {
            m = moment(date);
        }
        else if (!moment.isMoment(date)) {
            m = moment(date);
            if (!m.isValid) {
                return undefined;
            }
        }
        else {
            m = date;
        }
        return m;
    };
    return DateHelper;
}());
export { DateHelper };
