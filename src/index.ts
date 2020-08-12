import {B12Normalizer} from './B12Normalizer';
import * as StringParsers from './parsers/string.parsers';

const buildedNormalizer = new B12Normalizer();

buildedNormalizer.addParser('toUpperCase', StringParsers.toUpperCase);
buildedNormalizer.addParser('toLowerCase', StringParsers.toLowerCase);
buildedNormalizer.addParser('split', StringParsers.split);
buildedNormalizer.addParser('replace', StringParsers.replace);
buildedNormalizer.addParser('substring', StringParsers.substring);
buildedNormalizer.addParser('substr', StringParsers.substr);

export default buildedNormalizer;