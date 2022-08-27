export type LogLevel = 'silent' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

export interface ConfigHook {
  /**
   * Format the output file name.
   */
  outputFileName: (fileName: string, fileExtension: string) => string;
}

export interface ConfigOptions {
  /**
   * List of directories with components files.
   */
  sources: string[];
  /**
   * File patterns to filter.
   */
  patterns: string[];
  /**
   * Change the level of logging.
   *
   * @defaultValue `'info'`
   */
  loglevel?: LogLevel;
  /**
   * Path to the template file.
   */
  template: string;
  /**
   * Path to the output markdown files.
   */
  output: string;
  /**
   * Output file extension.
   *
   * @defaultValue `'md'`
   */
  outputExtension?: string;
  /**
   * Watch for changes and rebuild automatically.
   *
   * @defaultValue `false`
   */
  watch?: boolean;
  /**
   * Hooks to change the default behavior.
   */
  hooks?: ConfigHook;
}

/**
 * ConfigOptions with default values.
 */
export type ConfigValues = Required<ConfigOptions>;
