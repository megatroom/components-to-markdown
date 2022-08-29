import type { ConfigHook } from '../typings/ConfigOptions';
import { parse } from 'path';

const moduleName: ConfigHook['moduleName'] = (filePath) => {
  return parse(filePath).name;
};

export default moduleName;
