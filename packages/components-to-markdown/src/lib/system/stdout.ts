import chalk = require('chalk');
import ValidationError from '../errors/ValidationError';

export const BULLET: string = chalk.bold('\u25cf ');
const ERROR = `${BULLET}Validation Error`;

export const DOCUMENTATION_NOTE = `  ${chalk.bold('Documentation:')}
  https://github.com/megatroom/components-to-markdown#readme
`;

export const createConfigError = (message: string) =>
  new ValidationError(ERROR, `  ${message}`, DOCUMENTATION_NOTE);

export const bold = (str: string) => chalk.bold(str);
