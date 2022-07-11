import { program } from 'commander';
import parseMarkdown from './markdown/parseMarkdown';
import parseReactComp from './parses/parseReactComp';
import getFiles from './system/getFiles';
import getTemplate from './system/getTemplate';
import { buildLogger } from './system/logger';
import normalizeDir from './system/normalizeDir';
import readFile from './system/readFile';
import scriptDir from './system/scriptDir';
import verifyDirectoryExists from './system/verifyDirectoryExists';
import { extractErrorMessage } from './system/_stdout';
import type { ConfigOptions } from './typings/ConfigOptions';
import type { Logger } from './typings/Logger';

async function getAllFiles(
  logger: Logger,
  source: string,
  patterns: string[]
): Promise<string[]> {
  const sourceDir = normalizeDir(source);

  verifyDirectoryExists(sourceDir, 'sourceDir');

  logger.logTrace(`Getting files from ${sourceDir}...`);

  const files = await getFiles(sourceDir, patterns);

  if (logger.isTrace()) {
    files.forEach((file) => logger.logTrace(file));
  }

  return files;
}

export async function componentsToMarkdown(options: ConfigOptions) {
  const logger = buildLogger(options);
  const scriptDirectory = scriptDir(__dirname);
  let files: string[] = [];

  logger.logDebug('Starting components-to-markdown...');
  logger.logDebug('Discovering files...');

  for (let i = 0; i < options.sources.length; i++) {
    files = files.concat(
      await getAllFiles(logger, options.sources[i], options.patterns)
    );
  }

  logger.logDebug(`Found ${files.length} files on all sources.`);

  logger.logDebug('Loading template....');
  const template = await getTemplate(scriptDirectory, options.template);
  logger.logDebug('Parsing template...');
  const renderMarkdown = parseMarkdown(template);
  logger.logDebug('Template loaded.');

  logger.logDebug('Parsing files...');

  for (let i = 0; i < files.length; i++) {
    readFile(files[i])
      .then((content) => {
        try {
          const component = parseReactComp(content);
          logger.logTrace(`✔️ ${files[i]} parsed `);

          const markdown = renderMarkdown('teste', component);

          console.log({ markdown });
        } catch (error) {
          logger.logTrace(
            `⚠️ ${files[i]} error: ${extractErrorMessage(error)}`
          );
        }
      })
      .catch((err) => {
        logger.logError(err);
        process.exit(1);
      });
  }
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
    .option('-l, --loglevel <level>', 'log level', 'info')
    .action((sources, options) => {
      componentsToMarkdown({
        ...options,
        sources,
      } as ConfigOptions);
    });

  program.parse(argv);
}
