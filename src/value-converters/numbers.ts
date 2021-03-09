import { NumberHelper } from '../helpers/number';
import { valueConverter } from 'aurelia-framework';

@valueConverter('numString')
export class NumStringValueConverter {
  public toView(value: number): string {
    return NumberHelper.numString(value);
  }
}

@valueConverter('round')
export class RoundValueConverter {
  public toView(value: number): string {
    return NumberHelper.round(value).toString();
  }
}

@valueConverter('addZeroDecimals')
export class AddZeroDecimalValueConverter {
  public toView(value: number): string {
    return NumberHelper.addZeroDecimals(value);
  }
}
