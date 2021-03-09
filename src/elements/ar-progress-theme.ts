import { swatches, UxTheme } from '@aurelia-ux/core';

export class ArProgressTheme implements UxTheme {
  public themeKey: string = 'ar-progress';

  public color: string;
  public fontSize: string;

  public fineColor: string;
  public largeColor: string;
  public textColor: string;
  public fineStrokeWidth: number;
  public largeStrokeWidth: number;

  public lineWidth: string;
  public lineBorderColor: string;
  public lineBackground: string;
  public lineBackgroundTextColor: string;
  public lineForegroundTextColor: string;
  public lineTextAlign: string;
}
