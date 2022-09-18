import readFile from '../system/readFile';
import writeFile from '../system/writeFile';
import writeMarkdownFile from './writeMarkdownFile';

jest.mock('../system/readFile');
jest.mock('../system/writeFile');

const mockedReadFile = jest.mocked(readFile);

beforeEach(() => {
  jest.resetAllMocks();
});

it('should call readFile() and writeFile()', async () => {
  const outputDirectory = 'outputDirectory';
  const fileName = 'fileName';
  const componentName = 'componentName';
  const content = 'content';

  await writeMarkdownFile(outputDirectory, fileName, componentName, content);

  expect(readFile).toHaveBeenCalledTimes(1);
  expect(readFile).toHaveBeenCalledWith(`${outputDirectory}/${fileName}`);

  expect(writeFile).toHaveBeenCalledTimes(1);
  expect(writeFile).toHaveBeenCalledWith(
    `${outputDirectory}/${fileName}`,
    content
  );
});

it('should replace all file if it exists but has no mark', async () => {
  const outputDirectory = 'outputDirectory';
  const fileName = 'fileName';
  const componentName = 'componentName';
  const content = 'content';

  mockedReadFile.mockResolvedValue(Buffer.from('existingContent', 'utf8'));

  await writeMarkdownFile(outputDirectory, fileName, componentName, content);

  expect(readFile).toHaveBeenCalledTimes(1);
  expect(readFile).toHaveBeenCalledWith(`${outputDirectory}/${fileName}`);

  expect(writeFile).toHaveBeenCalledTimes(1);
  expect(writeFile).toHaveBeenCalledWith(
    `${outputDirectory}/${fileName}`,
    content
  );
});

it('should replace simple mark', async () => {
  const outputDirectory = 'outputDirectory';
  const fileName = 'fileName';
  const componentName = 'componentName';
  const content = 'First Line\nSecond Line\nThird Line\n';

  mockedReadFile.mockResolvedValue(
    Buffer.from(
      `AAAA
<!-- c2m:begin -->
XXXXXX
YYYYY
<!-- c2m:end -->
`,
      'utf8'
    )
  );

  await writeMarkdownFile(outputDirectory, fileName, componentName, content);

  expect(readFile).toHaveBeenCalledTimes(1);
  expect(readFile).toHaveBeenCalledWith(`${outputDirectory}/${fileName}`);

  expect(writeFile).toHaveBeenCalledTimes(1);
  expect(writeFile).toHaveBeenCalledWith(
    `${outputDirectory}/${fileName}`,
    `AAAA
<!-- c2m:begin -->

First Line
Second Line
Third Line

<!-- c2m:end -->
`
  );
});

it('should replace component mark', async () => {
  const outputDirectory = 'outputDirectory';
  const fileName = 'fileName';
  const componentName = 'ComponentName';
  const content = 'First Line\nSecond Line\nThird Line\n';

  mockedReadFile.mockResolvedValue(
    Buffer.from(
      `AAAA
<!-- c2m:begin:ComponentName -->
XXXXXX
YYYYY
<!-- c2m:end:ComponentName -->
`,
      'utf8'
    )
  );

  await writeMarkdownFile(outputDirectory, fileName, componentName, content);

  expect(readFile).toHaveBeenCalledTimes(1);
  expect(readFile).toHaveBeenCalledWith(`${outputDirectory}/${fileName}`);

  expect(writeFile).toHaveBeenCalledTimes(1);
  expect(writeFile).toHaveBeenCalledWith(
    `${outputDirectory}/${fileName}`,
    `AAAA
<!-- c2m:begin:ComponentName -->

First Line
Second Line
Third Line

<!-- c2m:end:ComponentName -->
`
  );
});
