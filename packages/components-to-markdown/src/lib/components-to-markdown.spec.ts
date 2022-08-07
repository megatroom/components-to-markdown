import { componentsToMarkdown } from './components-to-markdown';
import { ConfigOptions } from './typings/ConfigOptions';

describe('componentsToMarkdown()', () => {
  it('should throw error when sources is undefined', async () => {
    await expect(componentsToMarkdown({} as ConfigOptions)).rejects.toThrow();
  });

  it('should throw error when sources is empty array', async () => {
    await expect(
      componentsToMarkdown({ sources: [] } as any)
    ).rejects.toThrow();
  });
});
