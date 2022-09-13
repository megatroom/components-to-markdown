import * as path from 'path';
import readFile from '../system/readFile';
import writeFile from '../system/writeFile';

const BEGIN_SIMPLE_MARK = '[c2m]: # (begin)\n';
const END_SIMPLE_MARK = '[c2m]: # (end)\n';

const writeOnSimpleMark = (
  beginMark: string,
  endMark: string,
  fileContent: string,
  writeContent: string
): string => {
  const beginIndex = fileContent.indexOf(beginMark);
  const endIndex = fileContent.indexOf(endMark);
  if (beginIndex > -1 && endIndex > -1) {
    const beforeContent = fileContent.substring(
      0,
      beginIndex + beginMark.length
    );
    const afterContent = fileContent.substring(endIndex);
    return beforeContent + '\n' + writeContent + '\n' + afterContent;
  }

  return fileContent;
};

const writeMarkdownFile = async (
  outputDirectory: string,
  fileName: string,
  componentName: string,
  content: string
) => {
  const filePath = path.join(outputDirectory, fileName);
  let resultContent = content;

  try {
    let existingContent = (await readFile(filePath)).toString('utf-8');
    if (existingContent) {
      existingContent = writeOnSimpleMark(
        BEGIN_SIMPLE_MARK,
        END_SIMPLE_MARK,
        existingContent,
        content
      );
      existingContent = writeOnSimpleMark(
        `[c2m]: # (begin:${componentName})\n`,
        `[c2m]: # (end:${componentName})\n`,
        existingContent,
        content
      );
      resultContent = existingContent;
    }
  } catch (error) {
    // Do nothing
  }

  await writeFile(filePath, resultContent);
};

export default writeMarkdownFile;
