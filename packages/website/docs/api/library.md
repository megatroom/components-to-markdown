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

## References

### ConfigOptions

| Property | Type                  | Description                                           |
| -------- | --------------------- | ----------------------------------------------------- |
| sources  | string[]              | Source directories for the React components           |
| patterns | string[]              | A glob pattern to filter the files in `sources`       |
| output   | string                | Path to output markdown files                         |
| template | string                | Path to template file                                 |
| watch    | boolean               | Whether to watch the files for changes and regenerate |
| loglevel | [LogLevel](#loglevel) | Log level (debug, info, warn, error)                  |

### LogLevel

| Priority | Level  | Description                        |
| -------- | ------ | ---------------------------------- |
| 0        | silent | No logs will be displayed          |
| 1        | error  | Critical errors                    |
| 2        | warn   | Alerts about possible issues       |
| 3        | info   | Default log information            |
| 4        | debug  | Details about file processing      |
| 5        | trace  | Detailed information for each step |
