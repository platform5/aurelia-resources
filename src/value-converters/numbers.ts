import { NumberHelper } from '../helpers/number';
import { valueConverter } from 'aurelia-framework';

@valueConverter('numString')
export class NumStringValueConverter {
  public toView(value: number, nbDecimals?: number, separator?: string ): string {
    if (typeof value !== 'number') {
      return value;
    }
    return NumberHelper.numString(value, nbDecimals, separator);
  }
}

@valueConverter('round')
export class RoundValueConverter {
  public toView(value: number, nbDecimal?: number): string {
    if (typeof value !== 'number') {
      return value;
    }
    return NumberHelper.round(value, nbDecimal).toString();
  }
}

@valueConverter('addZeroDecimals')
export class AddZeroDecimalValueConverter {
  public toView(value: number, nbDecimal?: number): string {
    if (typeof value !== 'number') {
      return value;
    }
    return NumberHelper.addZeroDecimals(value, nbDecimal);
  }
}
