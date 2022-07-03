import chalk = require('chalk');

export default class ValidationError extends Error {
  override name: string;
  override message: string;

  constructor(name: string, message: string, comment?: string | null) {
    super();
    comment = comment ? `\n\n${comment}` : '\n';
    this.name = '';
    this.message = chalk.red(`${chalk.bold(name)}:\n\n${message}${comment}`);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Error.captureStackTrace(this, () => {});
  }
}
