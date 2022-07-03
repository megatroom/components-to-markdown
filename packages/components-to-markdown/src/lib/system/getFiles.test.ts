import { Dirent, promises as fsPromises } from 'fs';
import getFiles from './getFiles';

const buildFileMock = (name: string): Dirent => ({
  name,
  isDirectory: () => false,
  isFile: () => true,
  isBlockDevice: () => false,
  isCharacterDevice: () => false,
  isSymbolicLink: () => false,
  isFIFO: () => false,
  isSocket: () => false,
});

const strFiles = [
  '/foo/bar/README.md',
  '/foo/bar/global.d.ts',
  '/foo/bar/src/index.ts',
  '/foo/bar/src/index.test.ts',
  '/foo/bar/src/user/getUser.ts',
  '/foo/bar/src/user/getUser.test.ts',
  '/foo/bar/src/components/Button/Button.tsx',
  '/foo/bar/src/components/Alert/Alert.tsx',
];
const files = strFiles.map(buildFileMock);

it('should return all files', async () => {
  const readdir = jest
    .spyOn(fsPromises, 'readdir')
    .mockResolvedValue(files as Dirent[]);

  expect(await getFiles('/foo/bar', ['**/*.*'])).toEqual(strFiles);

  expect(readdir).toHaveBeenCalledWith('/foo/bar', { withFileTypes: true });
});

describe('With mock files', () => {
  beforeAll(() => {
    jest.spyOn(fsPromises, 'readdir').mockResolvedValue(files);
  });

  it('should return all typescript files', async () => {
    expect(await getFiles('/foo/bar', ['**/*.ts'])).toEqual([
      '/foo/bar/global.d.ts',
      '/foo/bar/src/index.ts',
      '/foo/bar/src/index.test.ts',
      '/foo/bar/src/user/getUser.ts',
      '/foo/bar/src/user/getUser.test.ts',
    ]);
  });

  it('should return typescript files excluding *.d.ts', async () => {
    expect(await getFiles('/foo/bar', ['**/*.ts', '!**/*.d.ts'])).toEqual([
      '/foo/bar/src/index.ts',
      '/foo/bar/src/index.test.ts',
      '/foo/bar/src/user/getUser.ts',
      '/foo/bar/src/user/getUser.test.ts',
    ]);
  });

  it('should return only test file', async () => {
    expect(await getFiles('/foo/bar', ['**/*.test.ts'])).toEqual([
      '/foo/bar/src/index.test.ts',
      '/foo/bar/src/user/getUser.test.ts',
    ]);
  });

  it('should return the markdown file', async () => {
    expect(await getFiles('/foo/bar', ['**/*.md'])).toEqual([
      '/foo/bar/README.md',
    ]);
  });

  it('should return ts and tsx files with single pattern', async () => {
    expect(await getFiles('/foo/bar', ['**/*.{ts,tsx}'])).toEqual([
      '/foo/bar/global.d.ts',
      '/foo/bar/src/index.ts',
      '/foo/bar/src/index.test.ts',
      '/foo/bar/src/user/getUser.ts',
      '/foo/bar/src/user/getUser.test.ts',
      '/foo/bar/src/components/Button/Button.tsx',
      '/foo/bar/src/components/Alert/Alert.tsx',
    ]);
  });

  it('should return ts and tsx files with two patterns', async () => {
    expect(await getFiles('/foo/bar', ['**/*.ts', '**/*.tsx'])).toEqual([
      '/foo/bar/global.d.ts',
      '/foo/bar/src/index.ts',
      '/foo/bar/src/index.test.ts',
      '/foo/bar/src/user/getUser.ts',
      '/foo/bar/src/user/getUser.test.ts',
      '/foo/bar/src/components/Button/Button.tsx',
      '/foo/bar/src/components/Alert/Alert.tsx',
    ]);
  });

  it('should filter components dir', async () => {
    expect(await getFiles('/foo/bar', ['**/components/**/*.*'])).toEqual([
      '/foo/bar/src/components/Button/Button.tsx',
      '/foo/bar/src/components/Alert/Alert.tsx',
    ]);
  });

  it('should filter Button.tsx file', async () => {
    expect(await getFiles('/foo/bar', ['**/Button.*'])).toEqual([
      '/foo/bar/src/components/Button/Button.tsx',
    ]);
  });

  it('should return empty array for no file found', async () => {
    expect(await getFiles('/foo/bar', ['**/*.js'])).toHaveLength(0);
  });
});
