import * as path from 'path';
import readFile from '../system/readFile';
import writeFile from '../system/writeFile';

type RegexMarker = {
  begin: (componentName: string) => RegExp;
  end: (componentName: string) => RegExp;
  padding: string;
};

const MARKDOWN_PADDING = '\n\n';
const JSX_PADDING = '\n';

const REGEX_MARKERS: RegexMarker[] = [
  {
    begin: () => /^<!-- c2m:begin -->\s*$/gim,
    end: () => /^<!-- c2m:end -->\s*$/gim,
    padding: MARKDOWN_PADDING,
  },
  {
    begin: () => /^(?<tabs>\s*)(<span data-c2m="template:begin" \/>)\s*$/gim,
    end: () => /^(?<tabs>\s*)(<span data-c2m="template:end" \/>)\s*$/gim,
    padding: JSX_PADDING,
  },
  {
    begin: (componentName) =>
      RegExp(`^<!-- c2m:begin:${componentName} -->\\s*$`, 'gim'),
    end: (componentName) =>
      RegExp(`^<!-- c2m:end:${componentName} -->\\s*$`, 'gim'),
    padding: MARKDOWN_PADDING,
  },
  {
    begin: (componentName) =>
      RegExp(
        `^<span data-c2m="template:begin:${componentName}" \\/>\\s*$`,
        'gim'
      ),
    end: (componentName) =>
      RegExp(
        `^<span data-c2m="template:end:${componentName}" \\/>\\s*$`,
        'gim'
      ),
    padding: JSX_PADDING,
  },
];

const getMatchers = (
  existingContent: string,
  componentName: string,
  regexMarker: RegexMarker
): {
  beginMatch: RegExpExecArray;
  endMatch: RegExpExecArray;
} | null => {
  const beginMatch = regexMarker.begin(componentName).exec(existingContent);
  const endMatch = regexMarker.end(componentName).exec(existingContent);

  if ((beginMatch && !endMatch) || (!beginMatch && endMatch)) {
    throw new Error(
      `The number of begin markers is different from end markers.`
    );
  }

  if (beginMatch && endMatch) {
    return { beginMatch, endMatch };
  }

  return null;
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
  let matchers;

  try {
    let existingContent = (await readFile(filePath)).toString('utf-8');

    if (existingContent) {
      for (const regexMark of REGEX_MARKERS) {
        matchers = getMatchers(existingContent, componentName, regexMark);
        if (matchers) {
          hasMark = true;
          const { beginMatch, endMatch } = matchers;
          const beginIndex = beginMatch.index;
          const endIndex = endMatch.index;
          const beforeContent = existingContent.substring(
            0,
            beginIndex + beginMatch[0].length
          );
          const afterContent = existingContent.substring(endIndex);
          const tabs = beginMatch?.groups?.['tabs'] || '';
          const writeContent = resultContent
            .split('\n')
            .map((line) => (line ? tabs + line : line))
            .join('\n');
          existingContent =
            beforeContent +
            regexMark.padding +
            writeContent +
            regexMark.padding +
            afterContent;
        }
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
