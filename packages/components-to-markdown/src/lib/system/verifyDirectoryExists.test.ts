import { statSync } from 'graceful-fs';
import verifyDirectoryExists from './verifyDirectoryExists';

jest.mock('graceful-fs');

class NoEntryError extends Error {
  code: string;
  constructor(message?: string) {
    super(message);
    this.code = 'ENOENT';
  }
}

it('should validate a valid directory path', () => {
  (statSync as any).mockImplementation(() => ({
    isDirectory: () => true,
  }));

  verifyDirectoryExists('/foo/bar/baz', 'key');

  expect(statSync).toBeCalledWith('/foo/bar/baz');
});

it('should throw an error if path is a file', () => {
  (statSync as any).mockImplementation(() => ({
    isDirectory: () => false,
  }));

  expect(() => {
    verifyDirectoryExists('foo-bar', 'key');
  }).toThrow();

  expect(statSync).toBeCalledWith('/foo/bar/baz');
});

it('should handle ENOENT error', () => {
  (statSync as any).mockImplementation(() => {
    throw new NoEntryError();
  });

  expect(() => {
    verifyDirectoryExists('foo-bar', 'key');
  }).toThrow();
});

it('should handle unknown error', () => {
  (statSync as any).mockImplementation(() => {
    throw new Error();
  });

  expect(() => {
    verifyDirectoryExists('foo-bar', 'key');
  }).toThrow();
});
