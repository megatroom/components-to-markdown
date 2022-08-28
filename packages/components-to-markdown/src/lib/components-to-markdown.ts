import { program } from 'commander';
import { relative } from 'path';
import parseMarkdown from './markdown/parseTemplate';
import type { RenderMarkdown } from './markdown/parseTemplate';
import getAllFiles from './system/getAllFiles';
import getOutputDir from './system/getOutputDir';
import getTemplate from './system/getTemplate';
import { buildLogger } from './system/logger';
import scriptDir from './system/scriptDir';
import { colorCommand, colorFail, colorSuccess } from './system/_stdout';
import type { ConfigOptions, ConfigValues } from './typings/ConfigOptions';
import type { Logger } from './typings/Logger';
import { watcher } from './system/watcher';
import {
  DEFAULT_LOG_LEVEL,
  DEFAULT_PATTERNS,
  DEFAULT_TEMPLATE,
  DEFAULT_WATCH_MODE,
} from './config/constants';
import buildConfig from './config/buildConfig';
import buildMarkdownContent from './markdown/buildMarkdownContent';
import processFile from './parses/processFile';
import { ProcessedFile } from './typings/ProcessedFile';

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

export async function* processSourceFiles(
  files: string[]
): AsyncIterableIterator<ProcessedFile> {
  for (const file of files) {
    yield processFile(file);
  }
}

async function buildMarkdownFiles(
  config: ConfigValues,
  logger: Logger,
  files: string[],
  renderMarkdown: RenderMarkdown,
  outputDirectory: string
) {
  let totalOfSuccess = 0;
  let totalOfError = 0;

  for await (const processedFile of processSourceFiles(files)) {
    const { error, file, componentData } = processedFile;

    if (error) {
      totalOfError += 1;
      logger.logDebug(`⚠️ ${file} error: ${error}`);
      continue;
    }

    if (componentData) {
      logger.logDebug(`✔️ ${file} parsed as ${componentData.name}`);
      totalOfSuccess += 1;

      buildMarkdownContent(
        componentData,
        renderMarkdown,
        outputDirectory,
        config.outputExtension,
        config.hooks.outputFileName
      );
    }
  }

  return { totalOfSuccess, totalOfError };
}

export async function componentsToMarkdown(options: ConfigOptions) {
  const config = buildConfig(options);
  const logger = buildLogger(config);
  const scriptDirectory = scriptDir(__dirname);
  const outputDirectory = getOutputDir(config.output);
  let files: string[] = [];

  logger.logInfo('Starting components-to-markdown...');

  logger.logStep(1, '📗', 'Loading template...');
  const template = await getTemplate(scriptDirectory, config.template);
  logger.logDebug('Parsing template...');
  const renderMarkdown = parseMarkdown(template, config.helpers);
  logger.logDebug('Template loaded.');

  logger.logStep(2, '📂', 'Discovering files...');
  for (let i = 0; i < config.sources.length; i++) {
    files = files.concat(
      await getAllFiles(logger, config.sources[i], config.patterns)
    );
  }
  logger.logDebug(`Found ${files.length} files on all sources.`);

  logger.logStep(3, '📝', 'Building markdowns...');
  const { totalOfSuccess, totalOfError } = await buildMarkdownFiles(
    config,
    logger,
    files,
    renderMarkdown,
    outputDirectory
  );

  if (config.watch) {
    logger.logStep(4, '🔎', 'Watching for changes');
    logger.logShortcutUsage('q', 'to quit watch mode');

    watcher({
      sources: config.sources,
      pattern: config.patterns,
      scriptDirectory,
      onChange: (filePath, event) => {
        logger.logInfo(
          colorCommand('->'),
          `${event}: ${relative(scriptDirectory, filePath)}`
        );
        buildMarkdownFiles(
          config,
          logger,
          [filePath],
          renderMarkdown,
          outputDirectory
        );
      },
      onExit: () => {
        logger.logInfo('Bye! 👋');
      },
    });
  } else {
    logSummary(logger, totalOfSuccess, totalOfError);
    logger.logInfo('✨ Done.');
  }
}

export function cli(argv: string[], version: string) {
  program
    .name('components-to-markdown')
    .description('Generate markdown documentation of React components.')
    .version(version)
    .argument('<sources...>', 'source directories for the React components')
    .option(
      '-p, --patterns <patterns...>',
      'file patterns to filter',
      DEFAULT_PATTERNS
    )
    .option(
      '-t, --template <template>',
      'path to template file',
      DEFAULT_TEMPLATE
    )
    .option('-o, --output <output>', 'path to output markdown files', '.')
    .option(
      '-w, --watch',
      'watch for changes and rebuild automatically',
      DEFAULT_WATCH_MODE
    )
    .option('-l, --loglevel <level>', 'log level', DEFAULT_LOG_LEVEL)
    .action((sources, options) => {
      componentsToMarkdown({
        ...options,
        sources,
      } as ConfigOptions);
    });

  program.parse(argv);
}
