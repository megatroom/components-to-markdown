import * as path from 'path';

const scriptDir = (dirName: string) => {
  return path.join(dirName, '../');
};

export default scriptDir;
