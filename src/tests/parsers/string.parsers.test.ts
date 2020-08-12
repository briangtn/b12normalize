import {replace, split, substr, substring, toLowerCase, toUpperCase} from '../../parsers/string.parsers'

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
  });

  describe('replace function', () => {
    it('Should return the input value if replace method does not exist', () => {
      expect(replace(3, {})).toBe(3);
    });

    it('Should replace \'Hello\' by \'Hi\'', () => {
      expect(replace('Hello World!', {search: 'Hello', replace: 'Hi'})).toBe('Hi World!');
    });
  });

  describe('substr function', () => {
    it('Should return the input value if substr method does not exist', () => {
      expect(substr(3, {})).toBe(3);
    });

    it('Should get 7 characters from index 5', () => {
      expect(substr('Jack Sparrow', {start: 5, length: 7})).toBe('Sparrow');
    });
  });

  describe('substring function', () => {
    it('Should return the input value if substring method does not exist', () => {
      expect(substring(3, {})).toBe(3);
    });

    it('Should get characters 5 to 12', () => {
      expect(substring('Jack Sparrow', {start: 5, end: 12})).toBe('Sparrow');
    });
  });

});