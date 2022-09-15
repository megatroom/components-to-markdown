import * as path from 'path';
import readFile from '../system/readFile';
import writeFile from '../system/writeFile';

const BEGIN_SIMPLE_MARK = '<!-- c2m:begin -->\n';
const END_SIMPLE_MARK = '<!-- c2m:end -->\n';

const getComponentMarkBegin = (componentName: string) =>
  `<!-- c2m:begin:${componentName} -->\n`;
const getComponentMarkEnd = (componentName: string) =>
  `<!-- c2m:end:${componentName} -->\n`;

const hasPartialMark = (
  fileContent: string,
  beginMark: string,
  endMark: string
) => {
  const beginIndex = fileContent.indexOf(beginMark);
  const endIndex = fileContent.indexOf(endMark);
  return beginIndex > -1 && endIndex > -1;
};

const writeOnSimpleMark = (
  beginMark: string,
  endMark: string,
  fileContent: string,
  writeContent: string
): string => {
  const beginIndex = fileContent.indexOf(beginMark);
  const endIndex = fileContent.indexOf(endMark);
  const beforeContent = fileContent.substring(0, beginIndex + beginMark.length);
  const afterContent = fileContent.substring(endIndex);
  return beforeContent + '\n' + writeContent + '\n' + afterContent;
};

const writeMarkdownFile = async (
  outputDirectory: string,
  fileName: string,
  componentName: string,
  content: string
) => {
  const filePath = path.join(outputDirectory, fileName);
  let resultContent = content;
  let hasMark = false;

  try {
    let existingContent = (await readFile(filePath)).toString('utf-8');
    if (existingContent) {
      if (hasPartialMark(existingContent, BEGIN_SIMPLE_MARK, END_SIMPLE_MARK)) {
        hasMark = true;
        existingContent = writeOnSimpleMark(
          BEGIN_SIMPLE_MARK,
          END_SIMPLE_MARK,
          existingContent,
          content
        );
      }

      const componentMarkBegin = getComponentMarkBegin(componentName);
      const componentMarkEnd = getComponentMarkEnd(componentName);
      if (
        hasPartialMark(existingContent, componentMarkBegin, componentMarkEnd)
      ) {
        hasMark = true;
        existingContent = writeOnSimpleMark(
          componentMarkBegin,
          componentMarkEnd,
          existingContent,
          content
        );
      }

      if (hasMark) {
        resultContent = existingContent;
      }
    }
  } catch (error) {
    // Do nothing
  }

  await writeFile(filePath, resultContent);
};

export default writeMarkdownFile;
