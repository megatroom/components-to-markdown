---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

# Introduction

## What is it?

**Components to Markdown (C2M)** came up with the need to document the API of components automatically, as is done in [Storybook](https://storybook.js.org/) and [Styleguidist](https://react-styleguidist.js.org/), but that was **independent** and could be inserted anywhere, from the `README.md` of the project to frameworks, such as [Docusaurus](https://docusaurus.io/) for example.

It was designed from the ground up to be **fully customizable**, but keeping **simplicity** in mind. You can start using the default settings and have a complete and beautiful documentation, and then customize as needed.

Let's build amazing documentation?

## Usage

You can use directly as [command line tool](#cli-usage) or [as a library](#library-usage).

### CLI Usage

You can use it directly from NPX:

```bash
npx components-to-markdown --help
```

Use `@latest` after the script to enforce the latest stable release, example:

```bash
npx components-to-markdown@latest --version
```

Example:

```bash
npx components-to-markdown -w -o ./output-path ./components-path
```

See [API documentation](/docs/api/cli) for more details.

### Library Usage

You can install it as a NPM package:

<Tabs>
  <TabItem value="npm" label="npm" default>
    <CodeBlock language="bash">npm install components-to-markdown --save-dev</CodeBlock>
  </TabItem>
  <TabItem value="yarn" label="Yarn">
    <CodeBlock language="bash">yarn add components-to-markdown --dev</CodeBlock>
  </TabItem>
</Tabs>

And import it:

```js title="comp2mark.js"
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

Then just run your script:

```bash
node comp2mark.js
```

See [API documentation](/docs/api/library) for more details.
