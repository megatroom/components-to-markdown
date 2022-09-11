import markdownToJSX from './markdownToJSX';

it('should return empty string for undefined text', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  expect(markdownToJSX()).toEqual('');
});

it('should return empty string for empty text', () => {
  expect(markdownToJSX('')).toEqual('');
});

it('should replace code block', () => {
  expect(markdownToJSX('First `code` and `second`')).toBe(
    'First <code>code</code> and <code>second</code>'
  );
});

it('should replace bold', () => {
  expect(markdownToJSX('My **bold text** and __with underline__.')).toBe(
    'My <strong>bold text</strong> and <strong>with underline</strong>.'
  );
});

it('should replace italic', () => {
  expect(markdownToJSX('My *italic text* and _with underline_.')).toBe(
    'My <em>italic text</em> and <em>with underline</em>.'
  );
});

it('should replace bold and italic', () => {
  expect(markdownToJSX('My **bold text** and *italic text*.')).toBe(
    'My <strong>bold text</strong> and <em>italic text</em>.'
  );
});

it('should replace line break', () => {
  expect(markdownToJSX('First line\nSecond line \n Third line')).toBe(
    'First line<br/>Second line <br/> Third line'
  );
});
