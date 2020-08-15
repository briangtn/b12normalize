import {parse, stringify} from "../../parsers/json.parsers";

describe('JSON parsers', () => {
  describe('stringify function', () => {
    it('Should stringify the object', () => {
      const object = {a: 'Hello', b: {name: 'Jean'}};
      const expected = JSON.stringify(object);

      expect(stringify(object)).toBe(expected);
    });
  });

  describe('parse function', () => {
    it('Should parse the string', () => {
      const expected = {a: 'Hello', b: {name: 'Jean'}};
      const str = JSON.stringify(expected);

      expect(parse(str)).toStrictEqual(expected);
    })
  });
})