---
title: Overview
sidebar_position: 1
---

# 🦕 Brachiosaurus

Brachiosaurus is the **default template** used when none is defined.

C2M was created with the need to use Docusaurus to create documentation for React libraries, but there was no tool that automatically generated the components API in a satisfactory and easy-to-use way.

So the first template to be created was Brachiosaurus, which is named after a dinosaur in honor of Docusaurus itself, which is customized to use its native features.

:::note

The layout of this Docusaurus website is using the `classic` theme without any customization, you will see the documentation as it will look in a project started from scratch.

:::

You can use this template for projects other than Docusaurus, but maybe some functionality is missing, but it won't generate any errors.

Generated documentation:

- [Action](/demo/brachiosaurus/demonstration/Action)
- [Button](/demo/brachiosaurus/demonstration/Button)
- [Card](/demo/brachiosaurus/demonstration/Card)
- [CardBody](/demo/brachiosaurus/demonstration/CardBody)
- [CardMedia](/demo/brachiosaurus/demonstration/CardMedia)
- [CardMediaDescription](/demo/brachiosaurus/demonstration/CardMediaDescription)

## References

- [Template source file](https://github.com/megatroom/components-to-markdown/blob/main/packages/components-to-markdown/templates/brachiosaurus.hbs)
- Source code of the components:
  - [Components with TypeScript](https://github.com/megatroom/components-to-markdown/tree/main/packages/example-react-components/src/lib)
  - [Components with PropTypes](https://github.com/megatroom/components-to-markdown/tree/main/packages/example-prop-types/src/lib)

## How to generate this doc?

For learning purposes, below is the step used to generate the component documentation using this template.

At the root of the [repository](https://github.com/megatroom/components-to-markdown), just run the following command:

```bash
npx components-to-markdown@latest \
  --output packages/website/demo/brachiosaurus/demonstration \
  --loglevel debug \
  packages/example-react-components/src/lib packages/example-prop-types/src/lib
```

Change the output directory to an empty one if you want to see the file being created from scratch.

The `packages/example-*` are example projects that have components that will be documented.
