import * as path from 'path';
import writeFile from '../system/writeFile';

const writeMarkdown = (
  outputDirectory: string,
  fileName: string,
  componentData: string
) => {
  const filePath = path.join(outputDirectory, `${fileName}.md`);
  writeFile(filePath, componentData);
};

export default writeMarkdown;
