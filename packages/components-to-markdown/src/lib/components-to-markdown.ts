import { program } from 'commander';
import getFiles from './system/getFiles';
import normalizeDir from './system/normalizeDir';
import verifyDirectoryExists from './system/verifyDirectoryExists';
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

  for (let i = 0; i < options.sources.length; i++) {
    files = files.concat(
      await getAllFiles(options.sources[i], options.patterns)
    );
  }

  console.log('bacon files', files);
}

export function cli(argv: string[]) {
  program
    .option(
      '-s, --sources <directories...>',
      'Source directories for the React components'
    )
    .option(
      '-p, --patterns <pattern...>',
      'File patterns to filter',
      '**/*.{js,jsx,ts,tsx}'
    );

  program.parse(argv);

  const options = program.opts();

  componentsToMarkdown(options as ConfigOptions);
}
