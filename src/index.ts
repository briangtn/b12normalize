import {B12Normalizer} from './B12Normalizer';
import * as StringParsers from './parsers/string.parsers';
import * as ArrayParser from './parsers/array.parsers';

const buildedNormalizer = new B12Normalizer();

buildedNormalizer.addParser('toUpperCase', StringParsers.toUpperCase);
buildedNormalizer.addParser('toLowerCase', StringParsers.toLowerCase);
buildedNormalizer.addParser('split', StringParsers.split);
buildedNormalizer.addParser('replace', StringParsers.replace);
buildedNormalizer.addParser('substring', StringParsers.substring);
buildedNormalizer.addParser('substr', StringParsers.substr);

buildedNormalizer.addParser('splice', ArrayParser.splice);
buildedNormalizer.addParser('pop', ArrayParser.pop);
buildedNormalizer.addParser('shift', ArrayParser.shift);
buildedNormalizer.addParser('unshift', ArrayParser.unshift);
buildedNormalizer.addParser('push', ArrayParser.push);
buildedNormalizer.addParser('join', ArrayParser.join);
buildedNormalizer.addParser('length', ArrayParser.length);
buildedNormalizer.addParser('at', ArrayParser.at);



export default buildedNormalizer;