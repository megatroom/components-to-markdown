import globsToMatcher from './globsToMatcher';

it('should return empty array for empty pattern', () => {
  const matcher = globsToMatcher([]);

  expect(matcher('')).toBeFalsy();
  expect(matcher('abc')).toBeFalsy();
});
