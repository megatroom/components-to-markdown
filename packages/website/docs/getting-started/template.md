---
sidebar_position: 2
---

# Templates

C2M is fully customizable through the [Handlebars](https://handlebarsjs.com/) template engine.

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
<div class="my-custom-element">
  {{markdownToJSX description}}
</div>
```

The result:

```html title="MyComponent.md"
<div class="my-custom-element">
  MyComponent with <strong>bold</strong> and <em>italic</em> text, and <code>inline code</code>.
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
