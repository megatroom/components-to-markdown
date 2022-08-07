import * as chokidar from 'chokidar';
import { resolve } from 'path';
import globsToMatcher from '../resolvers/globsToMatcher';
import replacePathSepForGlob from '../resolvers/replacePathSepForGlob';
import { Watcher } from '../typings/Watcher';

const KEYS = {
  CONTROL_C: '\u0003',
  CONTROL_D: '\u0004',
};

export const watcher = ({
  sources,
  pattern,
  scriptDirectory,
  onChange,
  onExit,
}: Watcher) => {
  const matcher = globsToMatcher(pattern);

  const watcher = chokidar.watch(sources, {
    ignoreInitial: true,
    persistent: true,
  });

  watcher.on('all', (event, filePath) => {
    const absolutePath = resolve(scriptDirectory, filePath);

    if (
      ['change', 'rename', 'add'].includes(event) &&
      matcher(replacePathSepForGlob(absolutePath))
    ) {
      onChange(filePath, event);
    }
  });

  const onKeypress = (key: string) => {
    if (key === KEYS.CONTROL_C || key === KEYS.CONTROL_D || key === 'q') {
      watcher.close().then(() => {
        onExit();
        if (typeof stdin.setRawMode === 'function') {
          stdin.setRawMode(false);
        }
        process.exit(0);
      });
    }
  };

  const stdin: NodeJS.ReadStream = process.stdin;
  if (typeof stdin.setRawMode === 'function') {
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', onKeypress);
  }
};
