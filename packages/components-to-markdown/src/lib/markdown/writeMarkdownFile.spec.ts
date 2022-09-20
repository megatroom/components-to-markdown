import readFile from '../system/readFile';
import writeFile from '../system/writeFile';
import writeMarkdownFile from './writeMarkdownFile';

jest.mock('../system/readFile');
jest.mock('../system/writeFile');

const mockedReadFile = jest.mocked(readFile);

beforeEach(() => {
  jest.resetAllMocks();
});

describe('writeMarkdownFile()', () => {
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

  describe('With Simple Mark', () => {
    it('should replace simple mark', async () => {
      const outputDirectory = 'outputDirectory';
      const fileName = 'fileName';
      const componentName = 'componentName';
      const content = 'First Line\nSecond Line\nThird Line';

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

      await writeMarkdownFile(
        outputDirectory,
        fileName,
        componentName,
        content
      );

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
  });

  describe('With Simple JSX Mark', () => {
    it('should replace single mark', async () => {
      const outputDirectory = 'outputDirectory';
      const fileName = 'fileName';
      const componentName = 'componentName';
      const content = 'First Line\nSecond Line\nThird Line';

      mockedReadFile.mockResolvedValue(
        Buffer.from(
          `AAAA
<span data-c2m="template:begin" />
XXXXXX
YYYYY
<span data-c2m="template:end" />
`,
          'utf8'
        )
      );

      await writeMarkdownFile(
        outputDirectory,
        fileName,
        componentName,
        content
      );

      expect(readFile).toHaveBeenCalledTimes(1);
      expect(readFile).toHaveBeenCalledWith(`${outputDirectory}/${fileName}`);

      expect(writeFile).toHaveBeenCalledTimes(1);
      expect(writeFile).toHaveBeenCalledWith(
        `${outputDirectory}/${fileName}`,
        `AAAA
<span data-c2m="template:begin" />
First Line
Second Line
Third Line
<span data-c2m="template:end" />
`
      );
    });

    it('should replace component inside indented mark', async () => {
      const outputDirectory = 'outputDirectory';
      const fileName = 'fileName';
      const componentName = 'ComponentName';
      const content = 'First Line\n\nSecond Line\n\nThird Line';

      mockedReadFile.mockResolvedValue(
        Buffer.from(
          `AAAA
<div className="container">
  <div className="component-doc-block">
    <span data-c2m="template:begin" />
    <span data-c2m="template:end" />
  </div>
</div>
END
`,
          'utf8'
        )
      );

      await writeMarkdownFile(
        outputDirectory,
        fileName,
        componentName,
        content
      );

      expect(readFile).toHaveBeenCalledTimes(1);
      expect(readFile).toHaveBeenCalledWith(`${outputDirectory}/${fileName}`);

      expect(writeFile).toHaveBeenCalledTimes(1);
      expect(writeFile).toHaveBeenCalledWith(
        `${outputDirectory}/${fileName}`,
        `AAAA
<div className="container">
  <div className="component-doc-block">
    <span data-c2m="template:begin" />
    First Line

    Second Line

    Third Line
    <span data-c2m="template:end" />
  </div>
</div>
END
`
      );
    });
  });

  describe('With Component Mark', () => {
    it('should replace component mark', async () => {
      const outputDirectory = 'outputDirectory';
      const fileName = 'fileName';
      const componentName = 'ComponentName';
      const content = 'First Line\nSecond Line\nThird Line';

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

      await writeMarkdownFile(
        outputDirectory,
        fileName,
        componentName,
        content
      );

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

    it('should be case insensitive with component name', async () => {
      const outputDirectory = 'outputDirectory';
      const fileName = 'fileName';
      const componentName = 'ComponentName';
      const content = 'First Line\nSecond Line\nThird Line';

      mockedReadFile.mockResolvedValue(
        Buffer.from(
          `AAAA
<!-- c2m:begin:componentname -->
XXXXXX
YYYYY
<!-- c2m:end:componentname -->
`,
          'utf8'
        )
      );

      await writeMarkdownFile(
        outputDirectory,
        fileName,
        componentName,
        content
      );

      expect(readFile).toHaveBeenCalledTimes(1);
      expect(readFile).toHaveBeenCalledWith(`${outputDirectory}/${fileName}`);

      expect(writeFile).toHaveBeenCalledTimes(1);
      expect(writeFile).toHaveBeenCalledWith(
        `${outputDirectory}/${fileName}`,
        `AAAA
<!-- c2m:begin:componentname -->

First Line
Second Line
Third Line

<!-- c2m:end:componentname -->
`
      );
    });
  });

  describe('With Component JSX Mark', () => {
    it('should replace component jsx mark', async () => {
      const outputDirectory = 'outputDirectory';
      const fileName = 'fileName';
      const componentName = 'ComponentName';
      const content = 'First Line\nSecond Line\nThird Line';

      mockedReadFile.mockResolvedValue(
        Buffer.from(
          `AAAA
<span data-c2m="template:begin:ComponentName" />
XXXXXX
YYYYY
<span data-c2m="template:end:ComponentName" />
`,
          'utf8'
        )
      );

      await writeMarkdownFile(
        outputDirectory,
        fileName,
        componentName,
        content
      );

      expect(readFile).toHaveBeenCalledTimes(1);
      expect(readFile).toHaveBeenCalledWith(`${outputDirectory}/${fileName}`);

      expect(writeFile).toHaveBeenCalledTimes(1);
      expect(writeFile).toHaveBeenCalledWith(
        `${outputDirectory}/${fileName}`,
        `AAAA
<span data-c2m="template:begin:ComponentName" />
First Line
Second Line
Third Line
<span data-c2m="template:end:ComponentName" />
`
      );
    });
  });
});
