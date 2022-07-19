export type LogLevel = 'silent' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

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
   */
  loglevel: LogLevel;
  /**
   * Path to the template file.
   */
  template: string;
  /**
   * Path to the output markdown files.
   */
  output: string;
}
