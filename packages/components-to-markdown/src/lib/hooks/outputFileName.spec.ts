import outputFileName from './outputFileName';

it('should format file name', () => {
  expect(outputFileName('MyComponent', 'md')).toBe('MyComponent.md');
});
