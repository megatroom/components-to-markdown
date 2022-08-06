import chalk = require('chalk');
import ValidationError from '../errors/ValidationError';

export const BULLET: string = chalk.bold('\u25cf ');
const ERROR = `${BULLET}Validation Error`;

export const DOCUMENTATION_NOTE = `  ${chalk.bold('Documentation:')}
  https://github.com/megatroom/components-to-markdown#readme
`;

export const createConfigError = (message: string) =>
  new ValidationError(ERROR, `  ${message}`, DOCUMENTATION_NOTE);

export const extractErrorMessage = (error: unknown) => {
  let message = 'Unknown Error';

  if (error instanceof Error) message = error.message;

  return message;
};

export const bold = (str: string) => chalk.bold(str);

export const colorSuccess = (str: string) => chalk.green(str);
export const colorFail = (str: string) => chalk.red(str);
export const colorCounter = (str: string) => chalk.dim(str);
export const colorLogLevel = (str: string) => chalk.magenta(str);
