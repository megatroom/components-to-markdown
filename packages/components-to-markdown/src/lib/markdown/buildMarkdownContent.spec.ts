import buildMarkdownContent from './buildMarkdownContent';
import type { ComponentData } from '../typings/ComponentData';
import writeMarkdownFile from './writeMarkdownFile';
import outputFileName from '../hooks/outputFileName';

jest.mock('./writeMarkdownFile');

it('should write markdown file', async () => {
  const renderMarkdown = jest.fn().mockReturnValue('markdown rendered');
  const outputDirectory = './output/dir';
  const outputExtension = 'md';
  const componentData: ComponentData = {
    name: 'ComponentName',
    documentations: [],
  };

  await buildMarkdownContent(
    componentData,
    renderMarkdown,
    outputDirectory,
    outputExtension,
    outputFileName
  );

  expect(renderMarkdown).toHaveBeenCalledTimes(1);
  expect(renderMarkdown).toHaveBeenCalledWith(componentData);

  expect(writeMarkdownFile).toHaveBeenCalledTimes(1);
  expect(writeMarkdownFile).toHaveBeenCalledWith(
    './output/dir',
    'ComponentName.md',
    'markdown rendered'
  );
});
