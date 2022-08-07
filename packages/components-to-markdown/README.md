# components-to-markdown

This library was generated with [Nx](https://nx.dev).

## Building

Run `yarn nx build components-to-markdown` to build the library.

## Running unit tests

Run `yarn nx test components-to-markdown` to execute the unit tests via [Jest](https://jestjs.io).

## Publishing

```bash
yarn nx publish components-to-markdown --tag=latest --ver=???
```

## Locally run the CLI

You can build, install and run the CLI locally:

```bash
yarn nx build components-to-markdown
cd dist/packages/components-to-markdown/
yarn
./bin/components-to-markdown --help
```

You can use the example project to generate markdown documentation:

```bash
./bin/components-to-markdown ../../../packages/example-react-components/src
```

You can use the `loglevel` option to control the verbosity of the output.
