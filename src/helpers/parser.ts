import { NumberHelper } from './number';
import * as moment from 'moment';

interface Metadata {
  key: string;
  value: any;
}

export class Parser {

  private static valueInObject(obj: any, path: string) {
    const args = path.split('.');
    return args.reduce((obj, level) => obj && obj[level], obj);
  }

  private static parseMetadata(key: string, object: {metadata: Metadata[]}): string | '' {
    for (let meta of object.metadata || []) {
      if (meta.key === key) {
        return meta.value;
      }
    }
    return '';
  }

  private static parseObject(parts: string[], object: any): string | undefined {
    if (typeof object !== 'object') return undefined;
    let replace: any | undefined = undefined;
    // extract value
    if (parts[0] === 'metadata') {
      replace = Parser.parseMetadata(parts[1], object);
      parts.shift();
      parts.shift();
    } else {
      replace = Parser.valueInObject(object, parts[0]);
      parts.shift();
    }
    // !{order:allPartsValidated:eq:true:Voici le texte}
    // !{order:allPartsValidated:eq:false:Voici l'autre texte}
    if (parts[0] === 'eq' && parts.length >= 2) {
      replace = Parser.parseEq(replace, parts[1], parts.slice(2).join(':'))
    }
    if (!replace) {
      return replace;
    }
    // apply converter
    if (parts[0] === 'date' && parts[1]) {
      const date = Parser.parseDate(replace);
      replace = date === '' ? '' : date.format(parts[1]);
    }
    if (parts[0] === 'round' && parts[1]) {
      replace = parseFloat(parseFloat(replace).toFixed(parseInt(parts[1], 10))).toString();
    }
    if (parts[0] === 'numString') {
      replace = NumberHelper.numString(parseFloat(replace));
    }
    if (parts[0] === 'join' && parts[1] && Array.isArray(replace)) {
      replace = replace.join(parts[1]);
    }
    return replace;
  }

  private static parseDate(text: string): moment.Moment | '' {
    if (!text) {
      return '';
    }
    const simpleParsing = moment(text);
    if (simpleParsing.isValid()) {
      return simpleParsing;
    }
    const basicParsing = moment(text, 'DD-MM-YYYY');
    if (basicParsing.isValid()) {
      return basicParsing;
    }
    return '';
  }

  private static parseEq(value: any, equalsTo: string, result: string): string | undefined {
    const valueToReturn =  
      (equalsTo === 'true' && (value === 'true' || value === true))
      || (equalsTo === 'false' && (value === 'false' || value === false))
      || (equalsTo === 'null' && (value === 'null' || value === null))
      || (equalsTo === 'undefined' && (value === 'undefined' || value === undefined))
      || equalsTo === value
      || (value && value.toString && equalsTo === value.toString())
      ? result
      : undefined
    return valueToReturn;
  }

  public static parseTemplate(text: string, objects: {[key: string]: any}) {
    if (typeof text !== 'string' || text.length === 0) {
      return text;
    }
    const matches = text.match(/(#|!){(.*?)}/gm);
    if (!matches) {
      return text;
    }
    for (const original of matches) {
      const parts = original.substr(2, original.length - 3).split(':');
      let replace: undefined | string = undefined;
      let object: any = objects[parts[0]];
      parts.shift();
      replace = Parser.parseObject(parts, object);
      // If the original is written with !{...} it means that if the value is not found (undefined)
      // we will remove the entire line
      // But if the original is written with #{} it means that we simply display an empty value (empty string '')
      if (replace === undefined && original.substr(0, 1) === '#') {
        replace = ''; // set an empty string => it will trigger the replace
      }
      if (replace !== undefined) {
        text = text.replace(original, replace);
      }
    }
    // remove all lines still containing a !{}
    text = text.split('\n').filter(line => !line.includes('!{')).join('\n');
    return text;
  }
}
