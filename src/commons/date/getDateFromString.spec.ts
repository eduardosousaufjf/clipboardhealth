import getDateFromString from './getDateFromString';

describe('getDateFromString', () => {
  const date = '2023-02-01T13:00:00.085';
  it('should transform the ISO date into a string in the expected format', () => {
    const transformedDate = getDateFromString(date);
    expect(transformedDate).toBe('2023-2-1');
  });
});
