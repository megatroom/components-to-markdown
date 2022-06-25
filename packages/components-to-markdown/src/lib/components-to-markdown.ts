import { program } from 'commander';
import { getFiles, normalizeDir } from './system/files';
import type { ConfigOptions } from './typings/ConfigOptions';

export async function componentsToMarkdown(options: ConfigOptions) {
  console.log('bacon options', { options });

  const sourceDir = normalizeDir(options.source[0]);

  console.log('bacon sourceDir', sourceDir);

  const files = await getFiles(sourceDir, options.pattern);

  console.log('bacon files', files);
}

export function cli(argv: string[]) {
  program
    .option('-s, --source <files...>', 'Source file with React components')
    .option('-p, --pattern <pattern...>', 'File patterns to filter');

  program.parse(argv);

  const options = program.opts();

  componentsToMarkdown(options as ConfigOptions);
}
