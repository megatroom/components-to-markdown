---
title: Code
sidebar_position: 2
---

# Code contributions

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

- [components-to-markdown](#components-to-markdown): The main package, with the CLI and the library.
- `example-react-components`: A small example with React components to demonstrate how the generated documentation looks like.
- `website`: The website with the documentation.

### components-to-markdown

The package follows the following source code structure:

- `src/`: The source code.
  - `lib/`: The library code.
    - `__tests__/`: Test helpers.
    - `config/`: Configuration files.
    - `errors/`: The errors that can be thrown by the package.
    - `helpers/`: Template helper functions.
    - `hooks/`: Default hooks.
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

## Releases

This project uses [Auto](https://intuit.github.io/auto/) to automate changelog and release generation.

The version is identified according to the label with the prefix `version:` informed in the Pull Request (PR). These labels are described in the table below:

| Label                  | Type  | Changelog Title       | Description                                                                |
| ---------------------- | ----- | --------------------- | -------------------------------------------------------------------------- |
| `version:major`        | major | 💥 Breaking Change    | Increment the major version                                                |
| `version:minor`        | minor | 🚀 Enhancement        | Increment the minor version                                                |
| `version:patch`        | patch | 🐛 Bug Fix            | Increment the patch version                                                |
| `version:performance`  | patch | 🏎 Performance         | Improve performance of an existing feature                                 |
| `version:internal`     | none  | 🏠 Internal           | Changes only affect the internal API and it doesn't generate a new version |
| `version:docs`         | none  | 📝 Documentation      | Changes only affect the documentation                                      |
| `version:dependencies` | none  | 🔩 Dependency Updates | Update one or more dependencies version                                    |

The `major`, `minor` and `patch` label types are to identify which version increment will be made according to the [semver](https://semver.org/) pattern. In case of multiple Pull Requests accumulated to generate the version, the highest hierarchy will be used for the new version.

The release is generated if a PR that contains a version label is merged with the `main` branch.
