"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
var number_1 = require("./number");
var moment = require("moment");
var Parser = /** @class */ (function () {
    function Parser() {
    }
    Parser.valueInObject = function (obj, path) {
        var args = path.split('.');
        return args.reduce(function (obj, level) { return obj && obj[level]; }, obj);
    };
    Parser.parseMetadata = function (key, object) {
        for (var _i = 0, _a = object.metadata || []; _i < _a.length; _i++) {
            var meta = _a[_i];
            if (meta.key === key) {
                return meta.value;
            }
        }
        return '';
    };
    Parser.parseObject = function (parts, object) {
        if (typeof object !== 'object')
            return undefined;
        var replace = undefined;
        // extract value
        if (parts[0] === 'metadata') {
            replace = Parser.parseMetadata(parts[1], object);
            parts.shift();
            parts.shift();
        }
        else {
            replace = Parser.valueInObject(object, parts[0]);
            parts.shift();
        }
        // !{order:allPartsValidated:eq:true:Voici le texte}
        // !{order:allPartsValidated:eq:false:Voici l'autre texte}
        if (parts[0] === 'eq' && parts.length >= 2) {
            replace = Parser.parseEq(replace, parts[1], parts.slice(2).join(':'));
        }
        if (!replace) {
            return replace;
        }
        // apply converter
        if (parts[0] === 'date' && parts[1]) {
            var date = Parser.parseDate(replace);
            replace = date === '' ? '' : date.format(parts[1]);
        }
        if (parts[0] === 'round' && parts[1]) {
            replace = parseFloat(parseFloat(replace).toFixed(parseInt(parts[1], 10))).toString();
        }
        if (parts[0] === 'numString') {
            replace = number_1.NumberHelper.numString(parseFloat(replace));
        }
        if (parts[0] === 'join' && parts[1] && Array.isArray(replace)) {
            replace = replace.join(parts[1]);
        }
        return replace;
    };
    Parser.parseDate = function (text) {
        if (!text) {
            return '';
        }
        var simpleParsing = moment(text);
        if (simpleParsing.isValid()) {
            return simpleParsing;
        }
        var basicParsing = moment(text, 'DD-MM-YYYY');
        if (basicParsing.isValid()) {
            return basicParsing;
        }
        return '';
    };
    Parser.parseEq = function (value, equalsTo, result) {
        var valueToReturn = (equalsTo === 'true' && (value === 'true' || value === true))
            || (equalsTo === 'false' && (value === 'false' || value === false))
            || (equalsTo === 'null' && (value === 'null' || value === null))
            || (equalsTo === 'undefined' && (value === 'undefined' || value === undefined))
            || equalsTo === value
            || (value && value.toString && equalsTo === value.toString())
            ? result
            : undefined;
        return valueToReturn;
    };
    Parser.parseTemplate = function (text, objects) {
        if (typeof text !== 'string' || text.length === 0) {
            return text;
        }
        var matches = text.match(/(#|!!|!){(.*?)}/gm);
        if (!matches) {
            return text;
        }
        for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
            var original = matches_1[_i];
            var specificMatches = original.match(/(#|!!|!){(.*?)}/m);
            var replaceOperator = specificMatches[1];
            var parts = specificMatches[2].split(':');
            var replace = undefined;
            var object = objects[parts[0]];
            parts.shift();
            replace = Parser.parseObject(parts, object);
            // If the original is written with !{...} it means that if the value is not found (undefined)
            // we will remove the entire line
            // But if the original is written with #{} it means that we simply display an empty value (empty string '')
            if (replace === undefined && replaceOperator === '#') {
                replace = ''; // set an empty string => it will trigger the replace
            }
            if (replace === '' && replaceOperator === '!') {
                replace = undefined;
            }
            if ((!replace || replace === '0') && replaceOperator === '!!') {
                replace = undefined;
            }
            if (replace !== undefined) {
                text = text.replace(original, replace);
            }
        }
        // remove all lines still containing a !{}
        text = text.split('\n').filter(function (line) { return !line.includes('!{'); }).join('\n');
        return text;
    };
    return Parser;
}());
exports.Parser = Parser;
