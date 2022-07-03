import * as path from 'path';
import { realpathSync } from 'graceful-fs';
import normalizeDir from './normalizeDir';

jest.mock('graceful-fs');

describe('When realpathSync throws an error', () => {
  it('should call path.normalize()', () => {
    const normalize = jest
      .spyOn(path, 'normalize')
      .mockReturnValue('normalized');

    jest.spyOn(realpathSync, 'native').mockImplementation(() => {
      throw new Error();
    });

    expect(normalizeDir('/foo/bar/baz')).toEqual('normalized');

    expect(normalize).toBeCalledWith('/foo/bar/baz');
  });
});

describe('When realpathSync returns a value', () => {
  it('should return the realpathSync value', () => {
    jest.spyOn(path, 'normalize').mockReturnValue('normalized');

    const native = jest.spyOn(realpathSync, 'native').mockReturnValue('native');

    expect(normalizeDir('/foo/bar/baz')).toEqual('native');

    expect(native).toBeCalledWith('normalized');
  });
});
