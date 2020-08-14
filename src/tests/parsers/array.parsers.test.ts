import {at, join, length, pop, push, shift, splice, unshift} from '../../parsers/array.parsers';

describe('Array parsers', () => {

  describe('splice function', () => {
    it('Should return the input value if splice method does not exist', () => {
      expect(splice(4, {})).toBe(4);
    });

    it('Should splice from position 0 if there is no pos argument given', () => {
      const arr = ['a', 'b', 'c', 'd'];
      const arrCopy = JSON.parse(JSON.stringify(arr));

      arrCopy.splice(0, 2);

      expect(splice(arr, {length: 2})).toStrictEqual(arrCopy);
    });

    it('Should splice 1 element if there is no length argument given', () => {
      const arr = ['a', 'b', 'c', 'd'];
      const arrCopy = JSON.parse(JSON.stringify(arr));

      arrCopy.splice(1, 1);

      expect(splice(arr, {pos: 1})).toStrictEqual(arrCopy);
    });

    it('Should splice 3 element from position 2', () => {
      const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
      const arrCopy = JSON.parse(JSON.stringify(arr));

      arrCopy.splice(2, 3);

      expect(splice(arr, {pos: 2, length: 3})).toStrictEqual(arrCopy);
    });
  });

  describe('pop function', () => {
    it('Should return the input value if pop method does not exist', () => {
      expect(pop(1)).toBe(1);
    });

    it('Should remove the last element of the array', () => {
      const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
      const arrCopy = JSON.parse(JSON.stringify(arr));

      arrCopy.pop();

      expect(pop(arr)).toStrictEqual(arrCopy);
    });
  });

  describe('shift function', () => {
    it('Should return the input value if shift method does not exist', () => {
      expect(shift(1)).toBe(1);
    });

    it('Should remove the first element of the array', () => {
      const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
      const arrCopy = JSON.parse(JSON.stringify(arr));

      arrCopy.shift();

      expect(shift(arr)).toStrictEqual(arrCopy);
    });
  });

  describe('unshift function', () => {
    it('Should return the input value if unshift method does not exist', () => {
      expect(unshift(1, {})).toBe(1);
    });

    it('Should add element at the beginning of the array', () => {
      const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
      const arrCopy = JSON.parse(JSON.stringify(arr));

      arrCopy.unshift('Hello');

      expect(unshift(arr, {value: 'Hello'})).toStrictEqual(arrCopy);
    });
  });

  describe('push function', () => {
    it('Should return the input value if push method does not exist', () => {
      expect(push(1, {})).toBe(1);
    });

    it('Should add element at the end of the array', () => {
      const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
      const arrCopy = JSON.parse(JSON.stringify(arr));

      arrCopy.push('Hello');

      expect(push(arr, {value: 'Hello'})).toStrictEqual(arrCopy);
    });
  });

  describe('join function', () => {
    it('Should return an empty string if join method does not exist', () => {
      expect(join(1, {})).toBe('');
    });

    it('Should join array as a string with the separator', () => {
      const arr = ['Hello', 'World', '!', 'grrr'];
      const str = arr.join(' - ');

      expect(join(['Hello', 'World', '!', 'grrr'], {separator: ' - '})).toBe(str);
    });
  });

  describe('length function', () => {
    it('Should return 0 if length does not exist', () => {
      expect(length(1)).toBe(0);
    });

    it('Should return the length of the array', () => {
      const arr = ['a', 'b', 'c', 'd'];

      expect(length(arr)).toBe(4);
    });
  });

  describe('at function', () => {
    it('Should return the element at index', () => {
      const arr = ['a', 'b', 'c', 'd'];

      expect(at(arr, {index: 1})).toBe('b');
    });

    it('Should return elements at indexes', () => {
      const arr = ['a', 'b', 'c', 'd'];

      expect(at(arr, {index: [1, 3]})).toStrictEqual(['b', 'd']);
    });
  });

});