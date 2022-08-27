import type { DocumentationObject, PropDescriptor } from 'react-docgen';
import { formatComment, parseTSDoc } from '../parses/parseTSDoc';
import parseReactComp from '../parses/parseReactComp';
import { extractErrorMessage } from '../system/_stdout';
import readFile from '../system/readFile';
import type {
  ComponentData,
  ComponentDoc,
  ComponentProp,
} from '../typings/ComponentData';
import type { ConfigHook } from '../typings/ConfigOptions';
import type { Logger } from '../typings/Logger';
import type { RenderMarkdown } from './parseTemplate';
import writeMarkdownFile from './writeMarkdownFile';

function extractPropFromComponent(
  name: string,
  prop: PropDescriptor
): ComponentProp {
  const descriptionDoc = parseTSDoc(formatComment(prop.description || ''));
  descriptionDoc.description = descriptionDoc.description.replace(
    /\n\n/g,
    '\n'
  );

  return {
    ...descriptionDoc,
    name,
    required: prop.required || false,
    requiredText: prop.required ? 'Yes' : 'No',
    type: {
      name: prop.tsType?.name,
      raw: prop.tsType?.raw || prop.tsType?.name || 'unknown',
    },
  };
}

function extractDocDataFromComponentData(
  componentObj: DocumentationObject
): ComponentDoc {
  const descriptionDoc = parseTSDoc(
    formatComment(componentObj.description || '')
  );

  return {
    name: componentObj.displayName || 'Unknown Component',
    properties: Object.entries(componentObj.props || []).map(([name, prop]) =>
      extractPropFromComponent(name, prop)
    ),
    ...descriptionDoc,
  };
}

interface ProcessedFile {
  file: string;
  error?: string;
  componentData?: ComponentData;
}

async function* processFiles(
  files: string[]
): AsyncIterableIterator<ProcessedFile> {
  for (const file of files) {
    try {
      const content = await readFile(file);
      const componentData = parseReactComp(file, content);

      componentData.components = componentData.documentations.map(
        (data: DocumentationObject) => extractDocDataFromComponentData(data)
      );

      yield { file, componentData };
    } catch (error) {
      yield { file, error: extractErrorMessage(error) };
    }
  }
}

export default async function buildMarkdownContent(
  logger: Logger,
  files: string[],
  renderMarkdown: RenderMarkdown,
  outputDirectory: string,
  outputExtension: string,
  outputFileName: ConfigHook['outputFileName']
) {
  let totalOfSuccess = 0,
    totalOfError = 0;

  for await (const processedFile of processFiles(files)) {
    const { error, file, componentData } = processedFile;

    if (error) {
      totalOfError += 1;
      logger.logDebug(`⚠️ ${file} error: ${error}`);
      continue;
    }

    if (componentData) {
      logger.logDebug(`✔️ ${file} parsed as ${componentData.name}`);
      totalOfSuccess += 1;

      const markdown = renderMarkdown(componentData);
      const outputFile = outputFileName(componentData.name, outputExtension);

      writeMarkdownFile(outputDirectory, outputFile, markdown);
    }
  }

  return { totalOfSuccess, totalOfError };
}
