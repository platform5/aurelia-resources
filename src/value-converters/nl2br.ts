export class Nl2brValueConverter {
  toView(value: any, breakTag = '<br>') {
    if (!value || typeof value !== 'string') return value;;
    return (value).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
  }
}
