# Components to Markdown

[![CircleCI](https://img.shields.io/circleci/build/github/megatroom/components-to-markdown?label=CircleCI)](https://circleci.com/gh/megatroom/components-to-markdown)
[![codecov](https://codecov.io/gh/megatroom/components-to-markdown/branch/main/graph/badge.svg?token=RCNN1XMSN4)](https://codecov.io/gh/megatroom/components-to-markdown)

Generate markdown documentation of React components.

## Usage

You can use directly as [command line tool](#cli-usage) or [as a library](#library-usage).

### CLI Usage

You can use it directly from NPX:

```bash
npx components-to-markdown --help
```

Example:

```bash
npx components-to-markdown -w ./components-path -o ./output-path
```

See [API documentation](#api) for more details.

### Library Usage

You can install it as a NPM package:

```bash
# with NPM:
npm install components-to-markdown --save-dev

# with Yarn:
yarn add components-to-markdown --dev
```

And import it:

```js
import { componentsToMarkdown } from 'components-to-markdown';

componentsToMarkdown({
  sources: ['./components-path'],
  output: './output-path',
  template: './template-path',
  patterns: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/__tests__/**',
    '!**/*.{test,spec}.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
  ],
});
```

## API

### CLI

```bash
Usage: components-to-markdown [options] <sources...>

Generate markdown documentation of React components.

Arguments:
  sources                       source directories for the React components

Options:
  -V, --version                 output the version number
  -p, --patterns <patterns...>  file patterns to filter (default:
                                ["**/*.{js,jsx,ts,tsx}","!**/__tests__/**","!**/*.{test,spec}.{js,jsx,ts,tsx}","!**/*.d.ts"])
  -t, --template <template>     path to template file (default: "all-detailed")
  -o, --output <output>         path to output markdown files (default: ".")
  -w, --watch                   watch for changes and rebuild automatically (default: false)
  -l, --loglevel <level>        log level (default: "info")
  -h, --help                    display help for command
```

### `componentsToMarkdown()`

```ts
async function componentsToMarkdown(options: ConfigOptions);
```

### `ConfigOptions`

| Property | Type     | Description                                           |
| -------- | -------- | ----------------------------------------------------- |
| sources  | string[] | Source directories for the React components           |
| patterns | string[] | A glob pattern to filter the files in `sources`       |
| output   | string   | Path to output markdown files                         |
| template | string   | Path to template file                                 |
| watch    | boolean  | Whether to watch the files for changes and regenerate |
| loglevel | LogLevel | Log level (debug, info, warn, error)                  |

### `LogLevel`

| Priority | Level  | Description                        |
| -------- | ------ | ---------------------------------- |
| 0        | silent | No logs will be displayed          |
| 1        | error  | Critical errors                    |
| 2        | warn   | Alerts about possible issues       |
| 3        | info   | Default log information            |
| 4        | debug  | Details about file processing      |
| 5        | trace  | Detailed information for each step |
