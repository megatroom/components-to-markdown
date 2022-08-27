import { ConfigHook } from '../typings/ConfigOptions';

const outputFileName: ConfigHook['outputFileName'] = (
  fileName,
  fileExtension
) => {
  return `${fileName}.${fileExtension}`;
};

export default outputFileName;
