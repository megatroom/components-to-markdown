import buildMarkdownContent from './buildMarkdownContent';
import type { ComponentData, ComponentDoc } from '../typings/ComponentData';
import writeMarkdownFile from './writeMarkdownFile';
import outputFileName from '../hooks/outputFileName';

jest.mock('./writeMarkdownFile');

const defaultComponentData: ComponentDoc = {
  name: '',
  properties: [],
  description: '',
  params: [],
  hasModifiers: false,
  beta: false,
  alpha: false,
  public: false,
  internal: false,
  virtual: false,
  override: false,
  sealed: false,
};

afterEach(() => {
  jest.resetAllMocks();
});

it('should write markdown file', async () => {
  const renderMarkdown = jest.fn().mockReturnValue('markdown rendered');
  const outputDirectory = './output/dir';
  const outputExtension = 'md';
  const grouped = false;
  const componentData: ComponentData = {
    name: 'ModuleName',
    documentations: [{}],
    components: [{ ...defaultComponentData, name: 'ComponentName' }],
  };

  await buildMarkdownContent(
    componentData,
    renderMarkdown,
    outputDirectory,
    outputExtension,
    grouped,
    outputFileName
  );

  expect(renderMarkdown).toHaveBeenCalledTimes(1);
  expect(renderMarkdown).toHaveBeenCalledWith({
    ...componentData,
    name: 'ComponentName',
  });

  expect(writeMarkdownFile).toHaveBeenCalledTimes(1);
  expect(writeMarkdownFile).toHaveBeenCalledWith(
    './output/dir',
    'ComponentName.md',
    'ComponentName',
    'markdown rendered'
  );
});

it('should write one file for each component', async () => {
  const renderMarkdown = jest.fn().mockReturnValue('markdown rendered');
  const outputDirectory = './output/dir';
  const outputExtension = 'md';
  const grouped = false;
  const componentData: ComponentData = {
    name: 'ModuleName',
    documentations: [],
    components: [
      { ...defaultComponentData, name: 'ComponentName1' },
      { ...defaultComponentData, name: 'ComponentName2' },
    ],
  };

  await buildMarkdownContent(
    componentData,
    renderMarkdown,
    outputDirectory,
    outputExtension,
    grouped,
    outputFileName
  );

  expect(renderMarkdown).toHaveBeenCalledTimes(2);
  expect(renderMarkdown).toHaveBeenNthCalledWith(1, {
    name: 'ComponentName1',
    documentations: [],
    components: [{ ...defaultComponentData, name: 'ComponentName1' }],
  });
  expect(renderMarkdown).toHaveBeenNthCalledWith(2, {
    name: 'ComponentName2',
    documentations: [],
    components: [{ ...defaultComponentData, name: 'ComponentName2' }],
  });

  expect(writeMarkdownFile).toHaveBeenCalledTimes(2);
  expect(writeMarkdownFile).toHaveBeenNthCalledWith(
    1,
    './output/dir',
    'ComponentName1.md',
    'ComponentName1',
    'markdown rendered'
  );
  expect(writeMarkdownFile).toHaveBeenNthCalledWith(
    2,
    './output/dir',
    'ComponentName2.md',
    'ComponentName2',
    'markdown rendered'
  );
});

describe('With grouped = true', () => {
  it('should write all components in a single file', async () => {
    const renderMarkdown = jest.fn().mockReturnValue('markdown rendered');
    const outputDirectory = './output/dir';
    const outputExtension = 'md';
    const grouped = true;
    const componentData: ComponentData = {
      name: 'ModuleName',
      documentations: [],
      components: [
        { ...defaultComponentData, name: 'ComponentName1' },
        { ...defaultComponentData, name: 'ComponentName2' },
      ],
    };

    await buildMarkdownContent(
      componentData,
      renderMarkdown,
      outputDirectory,
      outputExtension,
      grouped,
      outputFileName
    );

    expect(renderMarkdown).toHaveBeenCalledTimes(1);
    expect(renderMarkdown).toHaveBeenCalledWith(componentData);

    expect(writeMarkdownFile).toHaveBeenCalledTimes(1);
    expect(writeMarkdownFile).toHaveBeenNthCalledWith(
      1,
      './output/dir',
      'ModuleName.md',
      'ModuleName',
      'markdown rendered'
    );
  });
});
