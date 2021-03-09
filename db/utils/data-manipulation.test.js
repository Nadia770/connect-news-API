const { convertToUTC, createRef, formatItems } = require('./data-manipulation');

describe('convertToUTC', () => {
  it('if passed an empty array it returns an empty array', () => {
    expect(convertToUTC([])).toEqual([]);
  });
  it('maintains all other keys and values of the original object', () => {
    const item = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100
      }
    ];
    expect(convertToUTC(item)[0]).toMatchObject({
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      votes: 100
    });
  });
  it('changes the timestamp for one element when passed an array with a single item', () => {
    const item = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const output = convertToUTC(item);
    expect(output[0].created_at).toBeInstanceOf(Date);
  });

  it('changes the timestamp for multiple elements in the array', () => {
    const items = [
      {
        title: 'Student SUES Mitch!',
        topic: 'mitch',
        author: 'rogersop',
        body:
          'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
        created_at: 1163852514171
      },
      {
        title: 'UNCOVERED: catspiracy to bring down democracy',
        topic: 'cats',
        author: 'rogersop',
        body: 'Bastet walks amongst us, and the cats are taking arms!',
        created_at: 1037708514171
      },
      {
        title: 'A',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'Delicious tin of cat food',
        created_at: 911564514171
      },
      {
        title: 'Z',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'I was hungry.',
        created_at: 785420514171
      }
    ];
    const output = convertToUTC(items);
    output.forEach(({ created_at }) => {
      expect(created_at).toBeInstanceOf(Date);
    });
  });
});
describe('Check for manipulations and side effects', () => {
  it('does not mutate the input array', () => {
    const input = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const expected = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100
      }
    ];
    convertToUTC(input);
    expect(input).toEqual(expected);
  });
  it('returned array has a different memory ref', () => {
    const input = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100
      }
    ];
    expect(convertToUTC(input)).not.toBe(input);
  });
});

describe('createRef', () => {
  it('given an array it returns an object', () => {
    const owners = [
      { forename: 'firstname-b', surname: 'lastname-b', age: 30 },
      { forename: 'firstname-c', surname: 'lastname-c', age: 21 },
      { forename: 'firstname-d', surname: 'lastname-d', age: 17 }
    ];
    expect(typeof createRef(owners)).toBe('object');
  });
  it('returns an empty object if passed an empty array as the first argument', () => {
    expect(createRef([], 'name', 'phoneNumber')).toEqual({});
  });
  it('does not mutate the original array', () => {
    const owners = [
      { forename: 'firstname-b', surname: 'lastname-b', age: 30 },
      { forename: 'firstname-c', surname: 'lastname-c', age: 21 },
      { forename: 'firstname-d', surname: 'lastname-d', age: 17 }
    ];
    createRef(owners, 'forename', 'age');
    expect(owners).toEqual([
      { forename: 'firstname-b', surname: 'lastname-b', age: 30 },
      { forename: 'firstname-c', surname: 'lastname-c', age: 21 },
      { forename: 'firstname-d', surname: 'lastname-d', age: 17 }
    ]);
  });
  it('returns an object with a key value pair containing the values of the second and third params', () => {
    const owners = [
      { forename: 'firstname-b', surname: 'lastname-b', age: 30 },
      { forename: 'firstname-c', surname: 'lastname-c', age: 21 },
      { forename: 'firstname-d', surname: 'lastname-d', age: 17 }
    ];
    expect(createRef(owners, 'forename', 'age')).toEqual({
      'firstname-b': 30,
      'firstname-c': 21,
      'firstname-d': 17
    });
  });
});

describe('formatItems', () => {
  describe('Check for mutations', () => {
    it('does not mutate the original object', () => {
      const refObj = {
        'firstname-b': 1,
        'firstname-c': 2,
        'firstname-d': 3
      };
      const shops = [
        { shop_name: 'shop-d', owner: 'firstname-c', slogan: 'slogan-d' },
        { shop_name: 'shop-e', owner: 'firstname-d', slogan: 'slogan-e' },
        { shop_name: 'shop-f', owner: 'firstname-e', slogan: 'slogan-f' }
      ];
      formatItems(shops, refObj, 'owner', 'owner_id', 'shop_name', 'name');

      expect(refObj).toEqual({
        'firstname-b': 1,
        'firstname-c': 2,
        'firstname-d': 3
      });
    });
    it('does not mutate the original array', () => {
      const refObj = {
        'firstname-b': 1,
        'firstname-c': 2,
        'firstname-d': 3
      };
      const shops = [
        { shop_name: 'shop-d', owner: 'firstname-c', slogan: 'slogan-d' },
        { shop_name: 'shop-e', owner: 'firstname-d', slogan: 'slogan-e' },
        { shop_name: 'shop-f', owner: 'firstname-e', slogan: 'slogan-f' }
      ];

      formatItems(shops, refObj, 'owner', 'owner_id', 'shop_name', 'name');
      expect(shops).toEqual([
        { shop_name: 'shop-d', owner: 'firstname-c', slogan: 'slogan-d' },
        { shop_name: 'shop-e', owner: 'firstname-d', slogan: 'slogan-e' },
        { shop_name: 'shop-f', owner: 'firstname-e', slogan: 'slogan-f' }
      ]);
    });
    it('returned array has a different memory ref from the passed array', () => {
      const refObj = {
        'firstname-b': 1,
        'firstname-c': 2,
        'firstname-d': 3
      };
      const shops = [
        { shop_name: 'shop-d', owner: 'firstname-c', slogan: 'slogan-d' },
        { shop_name: 'shop-e', owner: 'firstname-d', slogan: 'slogan-e' },
        { shop_name: 'shop-f', owner: 'firstname-e', slogan: 'slogan-f' }
      ];

      expect(
        formatItems(shops, refObj, 'owner', 'owner_id', 'shop_name', 'name')
      ).not.toBe(shops);
    });
  });

  it('returns an object', () => {
    expect(typeof formatItems([])).toBe('object');
  });

  it('returns a new object with a new property and no old property', () => {
    const refObj = {
      'firstname-b': 1,
      'firstname-c': 2,
      'firstname-d': 3
    };
    const shops = [
      { shop_name: 'shop-d', owner: 'firstname-c', slogan: 'slogan-d' },
      { shop_name: 'shop-e', owner: 'firstname-d', slogan: 'slogan-e' },
      { shop_name: 'shop-f', owner: 'firstname-e', slogan: 'slogan-f' }
    ];

    expect(formatItems(shops, refObj, 'owner', 'owner_id')).toEqual([
      { owner_id: 2, shop_name: 'shop-d', slogan: 'slogan-d' },
      { owner_id: 3, shop_name: 'shop-e', slogan: 'slogan-e' },
      { owner_id: undefined, shop_name: 'shop-f', slogan: 'slogan-f' }
    ]);
  });
  it('returns a new object with a key with updated name', () => {
    const refObj = {
      'firstname-b': 1,
      'firstname-c': 2,
      'firstname-d': 3
    };
    const shops = [
      { shop_name: 'shop-d', owner: 'firstname-c', slogan: 'slogan-d' },
      { shop_name: 'shop-e', owner: 'firstname-d', slogan: 'slogan-e' },
      { shop_name: 'shop-f', owner: 'firstname-e', slogan: 'slogan-f' }
    ];

    expect(
      formatItems(shops, refObj, 'owner', 'owner_id', 'shop_name', 'name')
    ).toEqual([
      { owner_id: 2, name: 'shop-d', slogan: 'slogan-d' },
      { owner_id: 3, name: 'shop-e', slogan: 'slogan-e' },
      { owner_id: undefined, name: 'shop-f', slogan: 'slogan-f' }
    ]);
  });
});
