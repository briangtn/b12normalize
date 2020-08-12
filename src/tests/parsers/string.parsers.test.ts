import {split, toLowerCase, toUpperCase} from '../../parsers/string.parsers'

describe('String parsers', () => {

  describe('toLowerCase function', () => {
    it('Should return the input value if toLowerCase method does not exist', () => {
      expect(toLowerCase(3)).toBe(3);
    });

    it('Should set the string to lower case', () => {
      expect(toLowerCase('I\'m Not To LoWer')).toBe('i\'m not to lower');
    });
  });

  describe('toUpperCase function', () => {
    it('Should return the input value if toUpperCase method does not exist', () => {
      expect(toUpperCase(3)).toBe(3);
    });

    it('Should set the string to upper case', () => {
      expect(toUpperCase('I\'m Not To UppEr')).toBe('I\'M NOT TO UPPER');
    });
  });

  describe('split function', () => {
    it('Should return the input value if split method does not exist', () => {
      expect(split(3, {})).toBe(3);
    });

    it('Should split at \',\' if no separator given', () => {
      expect(split('Hello  ,  World,!', {})).toStrictEqual(['Hello  ', '  World', '!']);
    });

    it('Should split at \'@\'', () => {
      expect(split('Hello  @  World@!', {separator: '@'})).toStrictEqual(['Hello  ', '  World', '!']);
    });
  })

});