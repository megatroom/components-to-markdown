# Contributing

Thanks for being willing to contribute!

**Working on your first Pull Request?** You can learn how from this: [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/).

## Project setup

Requirements:

- Node v16.x.x
- Yarn v1.x.x

Setup steps:

1. Fork and clone this repo;
2. Run `yarn install` to install dependencies;
3. Create a branch for your PR with `git checkout -b your-branch-name`

Keep your `main` branch pointing at the original repository and make pull
requests from branches on your fork. To do this, run:

```bash
git remote add upstream https://github.com/megatroom/components-to-markdown.git
git fetch upstream
git branch --set-upstream-to=upstream/main main
```

This will add the original repository as a "remote" called "upstream," Then
fetch the git information from that remote, then set your local `main` branch
to use the upstream main branch whenever you run `git pull`. Then you can make
all of your pull request branches based on this `main` branch. Whenever you
want to update your version of `main`, do a regular `git pull`.

## Folder Structure

This repository is a [monorepo](https://monorepo.tools/#what-is-a-monorepo) managed by [Nx](https://nx.dev/). All the packages is in `packages/` directory. They are:

- `components-to-markdown`: The main package, with the CLI and the library.
- `example-react-components`: A small example with React components to demonstrate how the generated documentation looks like.
- `website`: The website with the documentation.

### components-to-markdown

The package follows the following source code structure:

- `src/`: The source code.
  - `lib/`: The library code.
    - `config/`: Configuration files.
    - `errors/`: The errors that can be thrown by the package.
    - `markdown/`: The logic to build markdown files.
    - `parses/`: The logic to parse the components.
    - `resolvers/`: The logic to resolve glob patterns.
    - `system/`: The utility functions to work with the system, like read and write files.
    - `typings/`: All the typings used by the package.
    - `components-to-markdown.ts`: The library and CLI entry point.
  - `index.ts`: The entry point for the package.

## Committing and Pushing changes

Please make sure to run the tests and lint before you commit your changes:

```bash
yarn format:check
yarn test:all
```
