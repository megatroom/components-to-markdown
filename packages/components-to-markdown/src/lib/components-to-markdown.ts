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
import {
  colorCounter,
  colorSuccess,
  extractErrorMessage,
} from './system/_stdout';
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

async function* processFiles(
  logger: Logger,
  files: string[]
): AsyncIterableIterator<ComponentData> {
  for (const file of files) {
    try {
      const content = await readFile(file);
      const componentData = parseReactComp(file, content);

      componentData.components = componentData.documentations.map(
        (data: DocumentationObject) => extractDocDataFromComponentData(data)
      );

      logger.logTrace(`✔️ ${file} parsed as ${componentData.name}`);

      yield componentData;
    } catch (error) {
      logger.logTrace(`⚠️ ${file} error: ${extractErrorMessage(error)}`);
    }
  }
}

const countStep = (step: number) => colorCounter(`[${step}/3]`);

export async function componentsToMarkdown(options: ConfigOptions) {
  const logger = buildLogger(options);
  const scriptDirectory = scriptDir(__dirname);
  const outputDirectory = getOutputDir(options.output);
  let files: string[] = [];

  logger.logInfo('Starting components-to-markdown...');

  logger.logInfo(`${countStep(1)} Loading template....`);
  const template = await getTemplate(scriptDirectory, options.template);
  logger.logDebug('- Parsing template...');
  const renderMarkdown = parseMarkdown(template);
  logger.logDebug('- Template loaded.');

  logger.logInfo(`${countStep(2)} Discovering files...`);
  for (let i = 0; i < options.sources.length; i++) {
    files = files.concat(
      await getAllFiles(logger, options.sources[i], options.patterns)
    );
  }
  logger.logDebug(`- Found ${files.length} files on all sources.`);

  logger.logInfo(`${countStep(3)} Parsing files...`);
  for await (const componentData of processFiles(logger, files)) {
    const markdown = renderMarkdown(componentData);
    writeMarkdown(outputDirectory, componentData.name, markdown);
  }

  logger.logInfo(colorSuccess('Finished successfully.'));
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
