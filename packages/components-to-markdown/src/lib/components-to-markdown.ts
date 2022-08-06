import { program } from 'commander';
import parseMarkdown from './markdown/parseMarkdown';
import writeMarkdown from './markdown/writeMarkdown';
import parseReactComp from './parses/parseReactComp';
import getAllFiles from './system/getAllFiles';
import getOutputDir from './system/getOutputDir';
import getTemplate from './system/getTemplate';
import { buildLogger } from './system/logger';
import readFile from './system/readFile';
import scriptDir from './system/scriptDir';
import { colorFail, colorSuccess, extractErrorMessage } from './system/_stdout';
import type { ComponentData, ComponentDoc } from './typings/ComponentData';
import type { ConfigOptions } from './typings/ConfigOptions';
import type { Logger } from './typings/Logger';
import { formatComment, parseTSDoc } from './parses/parseTSDoc';
import type { DocumentationObject } from 'react-docgen';

function extractDocDataFromComponentData(
  componentObj: DocumentationObject
): ComponentDoc {
  const descriptionDoc = parseTSDoc(
    formatComment(componentObj.description || '')
  );

  return {
    name: componentObj.displayName || 'Unknown Component',
    ...descriptionDoc,
  };
}

function logSummary(
  logger: Logger,
  totalOfSuccess: number,
  totalOfError: number
) {
  const failedMsg =
    totalOfError > 0
      ? colorFail(`${totalOfError} failed`)
      : `${totalOfError} failed`;
  const successMsg =
    totalOfSuccess > 0
      ? colorSuccess(`${totalOfSuccess} processed`)
      : `${totalOfSuccess} processed`;
  logger.logInfo(
    `Files: ${failedMsg}, ${successMsg}, ${totalOfSuccess + totalOfError} total`
  );
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

export async function componentsToMarkdown(options: ConfigOptions) {
  const logger = buildLogger(options);
  const scriptDirectory = scriptDir(__dirname);
  const outputDirectory = getOutputDir(options.output);
  let files: string[] = [];

  logger.logInfo('Starting components-to-markdown...');

  logger.logStep(1, '📗', 'Loading template...');
  const template = await getTemplate(scriptDirectory, options.template);
  logger.logDebug('Parsing template...');
  const renderMarkdown = parseMarkdown(template);
  logger.logDebug('Template loaded.');

  logger.logStep(2, '📂', 'Discovering files...');
  for (let i = 0; i < options.sources.length; i++) {
    files = files.concat(
      await getAllFiles(logger, options.sources[i], options.patterns)
    );
  }
  logger.logDebug(`Found ${files.length} files on all sources.`);

  logger.logStep(3, '📝', 'Building markdowns...');
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
      totalOfSuccess += 1;
      logger.logDebug(`✔️ ${file} parsed as ${componentData.name}`);
      const markdown = renderMarkdown(componentData);
      writeMarkdown(outputDirectory, componentData.name, markdown);
    }
  }
  logSummary(logger, totalOfSuccess, totalOfError);

  logger.logInfo('✨ Done.');
}

export function cli(argv: string[], version: string) {
  program
    .name('components-to-markdown')
    .description('Generate markdown documentation of React components.')
    .version(version)
    .argument('<sources...>', 'source directories for the React components')
    .option('-p, --patterns <patterns...>', 'file patterns to filter', [
      '**/*.{js,jsx,ts,tsx}',
      '!**/__tests__/**',
      '!**/*.{test,spec}.{js,jsx,ts,tsx}',
      '!**/*.d.ts',
    ])
    .option(
      '-t, --template <template>',
      'path to template file',
      'all-detailed'
    )
    .option('-o, --output <output>', 'path to output markdown files', '.')
    .option('-l, --loglevel <level>', 'log level', 'info')
    .action((sources, options) => {
      componentsToMarkdown({
        ...options,
        sources,
      } as ConfigOptions);
    });

  program.parse(argv);
}
