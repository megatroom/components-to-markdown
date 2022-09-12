---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Templates

C2M is fully customizable through the [Handlebars](https://handlebarsjs.com/) template engine.

You can see the list of [all available templates here](/demo/introduction), or you can generate your own template, see below how to do it.

## How to create a custom template

First thing to do is create the file, let's say the name is `my-template.hbs`.

You can copy one of the available templates, which are in [this directory](https://github.com/megatroom/components-to-markdown/tree/main/packages/components-to-markdown/templates), and change it the way you want. Or you can start one from scratch, the limit is your imagination.

The new template has to follow the [Handlebars](https://handlebarsjs.com/guide/#language-features) formatting. See the topics below to understand the native features of C2M.

After the template is ready, just define the path to your template:

<Tabs>
  <TabItem value="cli" label="CLI Usage" default>

```bash {3}
npx components-to-markdown@latest -w
  -o ./output-path \
  --template ./my-template.hbs \
  ./components-path
```

  </TabItem>
  <TabItem value="api" label="Library Usage">

```js
import { componentsToMarkdown } from 'components-to-markdown';

componentsToMarkdown({
  sources: ['./components-path'],
  output: './output-path',
  // highlight-next-line
  template: './my-template.hbs',
});
```

  </TabItem>
</Tabs>

## Parameters

All information collected from the components is loaded and normalized in parameters so that they can be used easily and structured in the template. See all parameters in the [API documentation](/docs/api/template-params).

## Helpers

In the template, you can use:

- All the [Handlebars built-in helpers](https://handlebarsjs.com/guide/builtin-helpers.html);
- Our [built-in helpers](#built-in-helpers);
- Your [custom helpers](#custom-helpers).

## Built-in Helpers

### headingId

In Docusaurus, each heading has an ID that can be automatically generated or explicitly specified. The `headingId` helper generates an [explicit heading id](https://docusaurus.io/docs/markdown-features/toc#heading-ids) from the heading text.

Example:

```handlebars title="template.hbs"
## {{name}} {{headingId name}}
```

The result:

```markdown title="hello.md"
## MyComponent {#mycomponent}
```

### markdownToJSX

The `markdownToJSX` helper converts a markdown string to JSX. It's useful when you want to include some text, like a component description for example, inside JSX (or HTML) elements.

All markdown supports HTML, MDX in addition to HTML also supports JSX. However, you can't mix the two within the same block, so this helper will help to keep only one language in case you want to use HTML or MDX with a markdown formatted input.

Example:

```js title="Component doc"
/**
 * MyComponent with **bold** and *italic* text, and `inline code`.
 */
function MyComponent() {
```

```handlebars title="template.hbs"
<div class='my-custom-element'>
  {{markdownToJSX description}}
</div>
```

The result:

```html title="MyComponent.md"
<div class="my-custom-element">
  MyComponent with <strong>bold</strong> and <em>italic</em> text, and
  <code>inline code</code>.
</div>
```

## Custom helpers

You can define your own helpers using the [helpers](/docs/api/library#helpers) property of the configuration. For example:

```js
import { componentsToMarkdown } from 'components-to-markdown';

componentsToMarkdown({
  helpers: [
    {
      name: 'myCustomHelper',
      helper: function (text) {
        return `${text.toUpperCase()}!`;
      },
    },
  ],
});
```

In the template use it as a normal helper:

```handlebars title="template.hbs"
## {{myCustomHelper 'MyComponent'}}
```

The result would be:

```md title="MyComponent.md"
## MYCOMPONENT!
```

## Hooks

C2M also provides a feature called [hook](/docs/api/library#hooks), which are functions you can define to change its default behavior.
