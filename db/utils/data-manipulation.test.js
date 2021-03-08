const { convertToUTC } = require('./data-manipulation');

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
