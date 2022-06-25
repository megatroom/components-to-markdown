import * as path from 'path';
import { promises as fsPromises } from 'fs';
import { realpathSync } from 'graceful-fs';
import verifyDirectoryExists from './verifyDirectoryExists';
import globsToMatcher from '../resolvers/globsToMatcher';
import replacePathSepForGlob from '../resolvers/replacePathSepForGlob';

async function* getFilesRecursively(
  dir: string
): AsyncIterableIterator<string> {
  const files = await fsPromises.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const res = path.resolve(dir, file.name);
    if (file.isDirectory()) {
      yield* getFilesRecursively(res);
    } else {
      yield res;
    }
  }
}

export const getFiles = async (
  basePath: string,
  pattern: string[]
): Promise<string[]> => {
  // const files = [];
  const files = new Set<string>();
  const matcher = globsToMatcher(pattern);

  for await (const filePath of getFilesRecursively(basePath)) {
    // files.push(f);
    if (matcher(replacePathSepForGlob(filePath))) {
      files.add(filePath);
    }
  }

  return Array.from(files);
};

export const normalizeDir = (strDir: string): string => {
  let result = strDir;

  result = path.normalize(result);

  try {
    // try to resolve windows short paths, ignoring errors (permission errors, mostly)
    result = tryRealpath(result);
  } catch {
    // ignored
  }

  verifyDirectoryExists(result, 'rootDir');

  return result;
};

export default function tryRealpath(path: string): string {
  try {
    path = realpathSync.native(path);
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  return path;
}
