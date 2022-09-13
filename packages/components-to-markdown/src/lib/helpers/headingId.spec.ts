import GithubSlugger = require('github-slugger');
import headingId from './headingId';

it('should return empty string for undefined text', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  expect(headingId()).toEqual('');
});

it('should return heading id', () => {
  expect(headingId('MyComponent')).toEqual('{#mycomponent}');
});

it('should return empty string when GithubSlugger throws an error', () => {
  jest.spyOn(console, 'error').mockImplementation(jest.fn());
  jest.spyOn(GithubSlugger.prototype, 'slug').mockImplementation(() => {
    throw new Error('Error');
  });
  expect(headingId('MyComponent')).toEqual('');
});
