import {B12Normalizer, ParserFunction, ParserList} from '../B12Normalizer';
import buildedNormalizer from '../index';

describe('B12Normalizer', () => {

  describe('constructor', () => {
    it('Should define an empty parsers list if there is no argument provided', () => {
      const normalizer = new B12Normalizer();

      expect(normalizer.parsers.size).toBe(0);
    });

    it('Should define a custom parsers list', () => {
      const parsers: ParserList = new Map<string, ParserFunction>();

      parsers.set('plusOne', (value: any) => value + 1);
      parsers.set('minusOne', (value: any) => value - 1);
      const normalizer = new B12Normalizer(parsers);

      expect(normalizer.parsers.size).toBe(2);
      expect(normalizer.parsers.get('plusOne')!(2)).toBe(3);
      expect(normalizer.parsers.get('minusOne')!(3)).toBe(2);
    });
  });

  describe('addParser method', () => {

    it('Should add a parser successfully', () => {
      const normalizer = new B12Normalizer();

      expect(normalizer.parsers.size).toBe(0);

      normalizer.addParser('returnTest', () => 'test');

      expect(normalizer.parsers.size).toBe(1);
      expect(normalizer.parsers.get('returnTest')!('osf')).toBe('test');
    });

    it('Should fail to add parser if the parser is already added', () => {
      const normalizer = new B12Normalizer();

      expect(normalizer.parsers.size).toBe(0);

      normalizer.addParser('returnTest', () => 'test');
      expect(normalizer.parsers.size).toBe(1);
      expect(normalizer.parsers.get('returnTest')!('osf')).toBe('test');

      try {
        normalizer.addParser('returnTest', (value: any) => value + 'test');
      } catch (e) {
        expect(e.message).toBe('Parser already exist');
      }
    });

  });

  describe('setParser method', () => {
    it('Should create a parser', () => {
      const normalizer = new B12Normalizer();

      expect(normalizer.parsers.size).toBe(0);

      normalizer.setParser('returnTest', () => 'test');
      expect(normalizer.parsers.size).toBe(1);
      expect(normalizer.parsers.get('returnTest')!('osf')).toBe('test');
    });

    it('Should replace an existing parser', () => {
      const normalizer = new B12Normalizer();

      normalizer.setParser('returnTest', () => 'test');

      normalizer.setParser('returnTest', (value: any) => (value + 'test'));
      expect(normalizer.parsers.size).toBe(1);
      expect(normalizer.parsers.get('returnTest')!('osf')).toBe('osftest');
    });
  });

  describe('removeParser method', () => {
    it('Should remove the parser', () => {
      const normalizer = new B12Normalizer();

      expect(normalizer.parsers.size).toBe(0);

      normalizer.setParser('returnTest', () => 'test');
      expect(normalizer.parsers.size).toBe(1);
      expect(normalizer.parsers.get('returnTest')!('osf')).toBe('test');

      normalizer.removeParser('returnTest');
      expect(normalizer.parsers.size).toBe(0);
    });
  });

  describe('normalize method', () => {
    it('Should do nothing if there is no rules', () => {
      const result = buildedNormalizer.normalize({username: 'jack', password: 'j4ck'}, {});

      expect(result).toStrictEqual({username: 'jack', password: 'j4ck'});
    })

    it('Should normalize a simple flat object with execution time defined parser', () => {
      const result = buildedNormalizer.normalize({username: 'jack', password: 'j4ck'}, {username: (value: string) => {
        return value + 's';
      }});

      expect(result).toStrictEqual({username: 'jacks', password: 'j4ck'});
    });

    it('Should does not edit the input reference', () => {
      const value = {username: 'jack', password: 'j4ck'};
      const result = buildedNormalizer.normalize(value, {username: (value: string) => {
          return value + 's';
        }});

      expect(result).toStrictEqual({username: 'jacks', password: 'j4ck'});
      expect(value).toStrictEqual({username: 'jack', password: 'j4ck'});
    });

    it('Should normalize a simple flat object with predefined parser', () => {
      const result = buildedNormalizer.normalize({username: 'jack', password: 'j4ck'}, {password: 'toUpperCase'});

      expect(result).toStrictEqual({username: 'jack', password: 'J4CK'});
    });

    it('Should fail to normalize with invalid parser', () => {
      try {
        buildedNormalizer.normalize({username: 'jack', password: 'j4ck'}, {password: 'invalidParser'});
      } catch (e) {
        expect(e.message).toBe(`Parser 'invalidParser' not found`)
      }
    })

    it('Should normalize a simple flat object with multiple type of parsers', () => {
      const result = buildedNormalizer.normalize({
        username: 'jack',
        password: 'j4ck',
        email   : 'Jack@SparrowCompany.com'
      }, {
        username: (value: any) => (value + 's'),
        password: 'toUpperCase',
        email   : 'toLowerCase'
      });

      expect(result).toStrictEqual({username: 'jacks', password: 'J4CK', email: 'jack@sparrowcompany.com'});
    });

    it('Should normalize complex object with multiple type of parsers', () => {
      const result = buildedNormalizer.normalize({
        username: 'jack',
        password: 'j4ck',
        email   : 'Jack@SparrowCompany.com',
        bio     : 'I\'m J4ck Sparrow$And I want to buy a new boat$:)',
        vehicles: [
          {
            type: 'Boat',
            name: 'Black Pearl',
          },
          {
            type: 'Car',
            name: 'Ferrari',
          }
        ]
      }, {
        username: (value: any) => (value + 's'),
        password: 'toUpperCase',
        bio     : {parser: 'split', arguments: {separator: '$'}},
        email   : ['toLowerCase', (value: any) => {
          return 'email: ' + value;
        }],
        vehicles: {
          name: (value: any) => {
            return 'The ' + value;
          }
        }
      });

      expect(result).toStrictEqual({
        username: 'jacks',
        password: 'J4CK',
        email   : 'email: jack@sparrowcompany.com',
        bio     : ['I\'m J4ck Sparrow', 'And I want to buy a new boat', ':)'],
        vehicles: [
          {
            type: 'Boat',
            name: 'The Black Pearl',
          },
          {
            type: 'Car',
            name: 'The Ferrari',
          }
        ]
      });
    });

    it('Should normalize an array of object', () => {
      const result = buildedNormalizer.normalize([
        {
          username: 'Jack',
          password: 'j4ck'
        },
        {
          username: 'Admin',
          password: 'pass'
        }
      ], {
        username: (value: any) => (value + 's'),
        password: 'toUpperCase'
      });

      expect(result).toStrictEqual([
        {
          username: 'Jacks',
          password: 'J4CK'
        },
        {
          username: 'Admins',
          password: 'PASS'
        }
      ]);
    });

    it('Should normalize an array of array of object', () => {
      const result = buildedNormalizer.normalize([
        [
          {
            username: 'Jack',
            password: 'j4ck'
          },
          {
            username: 'Admin',
            password: 'pass'
          }
        ],
        [
          {
            username: 'user',
            password: 'user'
          }
        ]
      ], {
        username: (value: any) => (value + 's'),
        password: 'toUpperCase'
      });

      expect(result).toStrictEqual([
        [
          {
            username: 'Jacks',
            password: 'J4CK'
          },
          {
            username: 'Admins',
            password: 'PASS'
          }
        ],
        [
          {
            username: 'users',
            password: 'USER',
          }
        ]
      ]);
    });
  });
});