import { statSync } from 'graceful-fs';

import ValidationError from '../errors/ValidationError';
import { createConfigError, bold } from './stdout';

export default function verifyDirectoryExists(path: string, key: string) {
  try {
    const rootStat = statSync(path);

    if (!rootStat.isDirectory()) {
      throw createConfigError(
        `${bold(path)} in the ${bold(key)} option is not a directory.`
      );
    }
  } catch (err: any) {
    if (err instanceof ValidationError) {
      throw err;
    }

    if (err.code === 'ENOENT') {
      throw createConfigError(
        `Directory ${bold(path)} in the ${bold(key)} option was not found.`
      );
    }

    // Not sure in which cases `statSync` can throw,
    // so let's just show the underlying error to the user
    throw createConfigError(
      `Got an error trying to find ${bold(path)} in the ${bold(
        key
      )} option.\n\n  Error was: ${err.message}`
    );
  }
}
