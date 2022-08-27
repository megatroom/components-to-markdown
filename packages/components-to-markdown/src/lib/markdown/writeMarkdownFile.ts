import * as path from 'path';
import writeFile from '../system/writeFile';

const writeMarkdownFile = (
  outputDirectory: string,
  fileName: string,
  componentData: string
) => {
  const filePath = path.join(outputDirectory, fileName);
  writeFile(filePath, componentData);
};

export default writeMarkdownFile;
