import {B12Normalizer} from './B12Normalizer';
import * as StringParsers from './parsers/string.parsers';

const buildedNormalizer = new B12Normalizer();

buildedNormalizer.addParser('toUpperCase', StringParsers.toUpperCase);
buildedNormalizer.addParser('toLowerCase', StringParsers.toLowerCase);

export default buildedNormalizer;