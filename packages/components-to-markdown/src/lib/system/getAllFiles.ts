import type { Logger } from '../typings/Logger';
import getFiles from './getFiles';
import normalizeDir from './normalizeDir';
import verifyDirectoryExists from './verifyDirectoryExists';

const getAllFiles = async (
  logger: Logger,
  source: string,
  patterns: string[]
): Promise<string[]> => {
  const sourceDir = normalizeDir(source);

  verifyDirectoryExists(sourceDir, 'source');

  logger.logTrace(`Getting files from ${sourceDir}...`);

  const files = await getFiles(sourceDir, patterns);

  if (logger.isTrace()) {
    files.forEach((file) => logger.logTrace(file));
  }

  return files;
};

export default getAllFiles;
