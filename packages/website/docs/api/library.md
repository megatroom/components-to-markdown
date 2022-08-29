---
sidebar_position: 2
---

# Library Usage

```ts title="Import"
import { componentsToMarkdown } from 'components-to-markdown';
```

```ts title="Main function"
async function componentsToMarkdown(options: ConfigOptions);
```

## ConfigOptions

### `sources`

```ts title="Type"
string[]
```

Source directories for the React components.

### `patterns`

```ts title="Type"
string[]
```

```ts title="Default"
[
  "**/*.{js,jsx,ts,tsx}",
  "!**/__tests__/**",
  "!**/*.{test,spec}.{js,jsx,ts,tsx}",
  "!**/*.d.ts"
]
```

A glob pattern to filter the files in `sources` .

### `output`

```ts title="Type"
string
```

Path to output markdown files.

### `template`

```ts title="Type"
string
```

```ts title="Default"
'brachiosaurus'
```

Path to template file or the name of one of the built-in templates.

### `watch`

```ts title="Type"
boolean
```

```ts title="Default"
false
```

Whether to watch the files for changes and regenerate.

### `loglevel`

```ts title="Type"
LogLevel
```

```ts title="Default"
'info'
```

Log level. See [LogLevel](#loglevel-1) for more information.

### `grouped`

```ts title="Type"
boolean
```

```ts title="Default"
false
```

Components in the same file will be grouped in the same output file.

### `outputExtension`

```ts title="Type"
string
```

```ts title="Default"
'md'
```

Extension of output files.

### `hooks`

```ts title="Type"
ConfigHook
```

Functions to customize the result. See [ConfigHook](#confighook) for more information.

### `helpers`

```ts title="Type"
TemplateHelper
```

```ts title="Default"
[]
```

Custom template helpers. See [TemplateHelper](#templatehelper) for more information.

## LogLevel

```ts
type LogLevel = 'silent' | 'error' | 'warn' | 'info' | 'debug' | 'trace';
```

| Priority | Level  | Description                        |
| -------- | ------ | ---------------------------------- |
| 0        | silent | No logs will be displayed          |
| 1        | error  | Critical errors                    |
| 2        | warn   | Alerts about possible issues       |
| 3        | info   | Default log information            |
| 4        | debug  | Details about file processing      |
| 5        | trace  | Detailed information for each step |

## ConfigHook

### `outputFileName`

```ts
(fileName: string, fileExtension: string) => string
```

Used to format the name of output files.

```js title="Example"
function outputFileName(fileName, fileExtension) {
  return `${fileName}.${fileExtension}`;
}
```

It is possible to define directories to be concatenated with output dir. For example:

```js
const groups = {
  Button: 'Inputs',
  Select: 'Inputs',
  Alert: 'Feedback',
  Snackbar: 'Feedback',
}

/**
 * Result:
 * "Inputs/Button.md"
 * "Inputs/Select.md"
 * "Feedback/Alert.md"
 * "Feedback/Snackbar.md"
 */
function outputFileName(fileName, fileExtension) {
  return `${groups[filename]}/${fileName}.${fileExtension}`;
}
```

### `moduleName`

```ts
(filePath: string, metadata: ModuleNameMetadata) => string;
```

Used to extract the module name. This function will populate the [ComponentData.name](/docs/api/template-params#componentdata) property.

This name will be use as the output file name if [grouped](/docs/api/library#grouped) is `true`.

```js title="Example"
import { parse } from 'path';

function moduleName(filePath) {
  return parse(filePath).name;
}
```

## TemplateHelper

```ts
import type { HelperDelegate } from 'handlebars';

interface TemplateHelper {
  name: string;
  helper: HelperDelegate;
}
```
