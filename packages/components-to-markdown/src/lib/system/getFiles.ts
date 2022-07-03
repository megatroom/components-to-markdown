import { promises as fsPromises } from 'fs';
import * as path from 'path';
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

const getFiles = async (
  basePath: string,
  pattern: string[]
): Promise<string[]> => {
  const files = new Set<string>();
  const matcher = globsToMatcher(pattern);

  for await (const filePath of getFilesRecursively(basePath)) {
    if (matcher(replacePathSepForGlob(filePath))) {
      files.add(filePath);
    }
  }

  return Array.from(files);
};

export default getFiles;
