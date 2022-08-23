# Introduction

## What is it?

TODO...

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
