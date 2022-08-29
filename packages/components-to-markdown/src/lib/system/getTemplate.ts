import * as path from 'path';
import { statSync } from 'graceful-fs';
import readFile from './readFile';
import { createConfigError, extractErrorMessage } from './_stdout';
import ValidationError from '../errors/ValidationError';
import { BUILTIN_TEMPLATES } from '../config/constants';

const getTemplate = async (
  scriptDirectory: string,
  template: string
): Promise<Buffer> => {
  let templateFile = template;
  let isBuiltin = false;
  let buffer;

  if (!template) {
    throw createConfigError(`You must provide one template.`);
  }

  if (BUILTIN_TEMPLATES.includes(template)) {
    templateFile = path.join(scriptDirectory, `../templates/${template}.hbs`);
    isBuiltin = true;
  }

  try {
    if (!statSync(templateFile).isFile()) {
      throw createConfigError(
        isBuiltin
          ? `Template "${template}" is a built-in template, but the file does not exist.`
          : `Template "${template}" is not a file or does not exist.`
      );
    }

    buffer = await readFile(templateFile);
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }

    throw createConfigError(
      `Could not read template file "${templateFile}".\n\n  Error was: ${extractErrorMessage(
        error
      )}`
    );
  }

  return buffer;
};

export default getTemplate;
