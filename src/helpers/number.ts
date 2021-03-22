export class NumberHelper {

  public static nbDecimal = 2;
  public static thousandSeparator: string = ' ';

  public static round(value: number, nbDecimal?: number): number {
    nbDecimal = nbDecimal !== undefined ? nbDecimal : NumberHelper.nbDecimal;
    if (nbDecimal < 0) {
      throw new Error('nbDecimal must be 0 or positive');
    }
    const zeros = new Array(nbDecimal).fill('0', 0, nbDecimal).join('');
    const factor = parseInt(`1${zeros}`, 10);
    return Math.round(value * factor) / factor;
  }
  
  public static addZeroDecimals(value: number, nbDecimal?: number): string {
    nbDecimal = nbDecimal !== undefined ? nbDecimal : NumberHelper.nbDecimal;
    if (nbDecimal < 0) {
      throw new Error('nbDecimal must be 0 or positive');
    }
    if (value === undefined || value === null) return '';
    if (typeof value !== 'number') return value;
    let stringValue = value.toString();
    let dotIndex = stringValue.indexOf('.');
  
    const zeros = new Array(nbDecimal).fill('0', 0, nbDecimal).join('');
  
    if (dotIndex === -1 && nbDecimal != 0) {
      return `${stringValue}.${zeros}`;
    }
    const diff = stringValue.length - dotIndex;
    
    const zerosToAdd = nbDecimal - diff + 1;
    return `${stringValue}${zeros.substr(0, zerosToAdd)}`;
  }
  
  public static addThousandSeparators(value: number | string, separator?: string): string {
    separator = separator !== undefined ? separator : NumberHelper.thousandSeparator;
    let nStr = `${value}`;
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + separator + '$2');
    }
    return x1 + x2;
  }
  
  public static numString(value: number, nbDecimals = 2, separator: string = ' ') {
    return NumberHelper.addThousandSeparators(
            NumberHelper.addZeroDecimals(
              NumberHelper.round(value, nbDecimals), nbDecimals), separator);
  }
}
