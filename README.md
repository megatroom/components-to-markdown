<div align="center">
<h1>Components to Markdown</h1>

<a href="https://www.emojione.com/emoji/1f410">
  <img
    height="124"
    width="200"
    alt="goat"
    src="https://raw.githubusercontent.com/megatroom/components-to-markdown/main/packages/website/static/img/c2m-logo.png"
  />
</a>

<p>Highly customizable open source tool for generating component documentation.</p>

<br />

[**Read The Docs**](http://components-to-markdown.vercel.app) |
[Explore the Demo](https://components-to-markdown.vercel.app/demo/introduction)

<br />
</div>

<hr />

[![CircleCI](https://img.shields.io/circleci/build/github/megatroom/components-to-markdown?label=CircleCI)](https://circleci.com/gh/megatroom/components-to-markdown)
[![codecov](https://codecov.io/gh/megatroom/components-to-markdown/branch/main/graph/badge.svg?token=RCNN1XMSN4)](https://codecov.io/gh/megatroom/components-to-markdown)

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
npx components-to-markdown@latest -w -o ./output-path ./components-path
```

See [API documentation](https://components-to-markdown.vercel.app/docs/api/cli) for more details.

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
// comp2mark.js

import { componentsToMarkdown } from 'components-to-markdown';

componentsToMarkdown({
  sources: ['./components-path'],
  output: './output-path',
});
```

Then just run your script:

```bash
node comp2mark.js
```

See [API documentation](https://components-to-markdown.vercel.app/docs/api/library) for more details.

## License

[MIT](https://github.com/megatroom/components-to-markdown/blob/main/LICENSE)
