---
sidebar_position: 1
---

# CLI Usage

The `components-to-markdown` command line runner has a number of useful options. You can use `npx` to run it directly from the terminal to view all available options:

```bash
npx components-to-markdown --help
```

## Usage

```bash
components-to-markdown [options] <sources...>
```

The `<sources...>` is a list of paths to directories or files to be processed.

## Options

### `--patterns <patterns...>`

Alias: `-p`.

Default:

```bash
[
  "**/*.{js,jsx,ts,tsx}",
  "!**/__tests__/**",
  "!**/*.{test,spec}.{js,jsx,ts,tsx}",
  "!**/*.d.ts"
]
```

File patterns to filter.

### `--template <template>`

Alias: `-t`.

Default: `"brachiosaurus"`.

Path to template file.

### `--output <output>`

Alias: `-o`.

Default: `"."`.

Path to output markdown files.

### `--watch`

Alias: `-w`.

Default: `false`.

Watch for changes and rebuild automatically.

### `--loglevel <level>`

Alias: `-l`.

Default: `"info"`.

Logging level.

### `--version`

Alias: `-V`.

Output the version number.

### `--help`

Alias: `-h`.

Display help for command.
