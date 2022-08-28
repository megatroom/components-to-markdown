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

Path to template file or the name of one of the builtin templates.

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
