import { swatches, UxTheme } from '@aurelia-ux/core';

export class ArSelectTheme implements UxTheme {
  public themeKey: string = 'ar-select';

  public overlayBackground: string;
  public listBackground: string;

  public selectedOptionBackground: string;
  public borderBottom: string;
  public borderBottomHover: string;

  public searchBorder: string;
}
