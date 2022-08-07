import { readFile as fsReadFile } from 'graceful-fs';

const readFile = (filePath: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      fsReadFile(
        filePath,
        function (err: NodeJS.ErrnoException | null, data: Buffer) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

export default readFile;
