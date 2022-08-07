import { writeFile as fsWriteFile } from 'graceful-fs';

const writeFile = (filePath: string, data: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      fsWriteFile(
        filePath,
        data,
        { encoding: 'utf8' },
        function (err: NodeJS.ErrnoException | null) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

export default writeFile;
