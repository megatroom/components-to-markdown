import { Dirent, promises as fsPromises } from 'fs';
import getFiles from './getFiles';

const buildFileMock = (name: string, isDirectory = false): Dirent => ({
  name,
  isDirectory: () => isDirectory,
  isFile: () => !isDirectory,
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
const files = strFiles.map((fileName) => buildFileMock(fileName));

it('should return all files', async () => {
  const readdir = jest
    .spyOn(fsPromises, 'readdir')
    .mockResolvedValue(files as Dirent[]);

  expect(await getFiles('/foo/bar', ['**/*.*'])).toEqual(strFiles);

  expect(readdir).toHaveBeenCalledWith('/foo/bar', { withFileTypes: true });

  readdir.mockRestore();
});

describe('With mock files', () => {
  beforeAll(() => {
    jest.spyOn(fsPromises, 'readdir').mockResolvedValue(files);
  });

  afterAll(() => {
    jest.restoreAllMocks();
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

it('should get files recursively', async () => {
  const readdir = jest
    .spyOn(fsPromises, 'readdir')
    .mockResolvedValueOnce([
      buildFileMock('index.ts'),
      buildFileMock('src', true),
    ] as Dirent[])
    .mockResolvedValueOnce([
      buildFileMock('index.ts'),
      buildFileMock('index.test.ts'),
      buildFileMock('user', true),
    ] as Dirent[])
    .mockResolvedValueOnce([
      buildFileMock('getUser.ts'),
      buildFileMock('getUser.test.ts'),
    ] as Dirent[]);

  expect(await getFiles('/foo/bar', ['**/*.*'])).toEqual([
    '/foo/bar/index.ts',
    '/foo/bar/src/index.ts',
    '/foo/bar/src/index.test.ts',
    '/foo/bar/src/user/getUser.ts',
    '/foo/bar/src/user/getUser.test.ts',
  ]);

  const options = {
    withFileTypes: true,
  };

  expect(readdir).toHaveBeenNthCalledWith(1, '/foo/bar', options);
  expect(readdir).toHaveBeenNthCalledWith(2, '/foo/bar/src', options);
  expect(readdir).toHaveBeenNthCalledWith(3, '/foo/bar/src/user', options);
});
