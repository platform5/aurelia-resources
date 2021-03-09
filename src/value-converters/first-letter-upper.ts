export class FirstLetterUpperValueConverter {
  public toView(value: string): string {
    if (typeof value !== 'string') {
      return value;
    }
    if (value.length < 1) {
      return value;
    }
    return value.substr(0, 1).toUpperCase() + value.substr(1);
  }
}