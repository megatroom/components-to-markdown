import { program } from 'commander';
import getFiles from './system/getFiles';
import normalizeDir from './system/normalizeDir';
import verifyDirectoryExists from './system/verifyDirectoryExists';
import { createConfigError } from './system/_stdout';
import type { ConfigOptions } from './typings/ConfigOptions';

async function getAllFiles(
  source: string,
  patterns: string[]
): Promise<string[]> {
  const sourceDir = normalizeDir(source);

  verifyDirectoryExists(sourceDir, 'sourceDir');

  return await getFiles(sourceDir, patterns);
}

export async function componentsToMarkdown(options: ConfigOptions) {
  let files: string[] = [];

  if (!options.sources || options.sources.length === 0) {
    throw createConfigError(`You must specify at least one source directory.`);
  }

  for (let i = 0; i < options.sources.length; i++) {
    files = files.concat(
      await getAllFiles(options.sources[i], options.patterns)
    );
  }

  console.log('bacon files', files);
}

export function cli(argv: string[], version: string) {
  program
    .name('components-to-markdown')
    .description('Generate markdown documentation of React components.')
    .version(version)
    .argument('<sources...>', 'source directories for the React components')
    .option('-p, --patterns <patterns...>', 'file patterns to filter', [
      '**/*.{js,jsx,ts,tsx}',
    ])
    .action((sources, options) => {
      componentsToMarkdown({
        ...options,
        sources,
      } as ConfigOptions);
    });

  program.parse();
}
