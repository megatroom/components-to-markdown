import normalizeDir from './normalizeDir';
import verifyDirectoryExists from './verifyDirectoryExists';

const getOutputDir = (output: string) => {
  const outputDir = normalizeDir(output);

  verifyDirectoryExists(outputDir, 'output');

  return outputDir;
};

export default getOutputDir;
