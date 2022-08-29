import moduleName from '../hooks/moduleName';
import outputFileName from '../hooks/outputFileName';
import type {
  ConfigHook,
  ConfigOptions,
  ConfigValues,
} from '../typings/ConfigOptions';
import {
  DEFAULT_GROUPED,
  DEFAULT_LOG_LEVEL,
  DEFAULT_OUTPUT_EXTENSION,
  DEFAULT_PATTERNS,
  DEFAULT_TEMPLATE,
  DEFAULT_WATCH_MODE,
} from './constants';

const buildConfig = (options: ConfigOptions): ConfigValues => {
  const {
    loglevel = DEFAULT_LOG_LEVEL,
    template = DEFAULT_TEMPLATE,
    watch = DEFAULT_WATCH_MODE,
    patterns = DEFAULT_PATTERNS,
    outputExtension = DEFAULT_OUTPUT_EXTENSION,
    grouped = DEFAULT_GROUPED,
    helpers = [],
    sources,
    output,
  } = options;

  const hooks: ConfigHook = options.hooks || ({} as ConfigHook);
  hooks.outputFileName = hooks.outputFileName || outputFileName;
  hooks.moduleName = hooks.moduleName || moduleName;

  return {
    sources,
    patterns,
    loglevel,
    template,
    output,
    outputExtension,
    watch,
    hooks,
    helpers,
    grouped,
  };
};

export default buildConfig;
