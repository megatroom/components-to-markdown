import * as path from 'path';
import { realpathSync } from 'graceful-fs';

function tryRealpath(path: string): string {
  try {
    return realpathSync.native(path);
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  return path;
}

/**
 * Normalizes a directory path.
 * @param strDir The directory path to normalize
 * @returns The normalized directory path
 */
const normalizeDir = (strDir: string): string => {
  let result = path.normalize(strDir);

  try {
    // try to resolve windows short paths
    result = tryRealpath(result);
  } catch {
    // ignoring errors (permission errors, mostly)
  }

  return result;
};

export default normalizeDir;
