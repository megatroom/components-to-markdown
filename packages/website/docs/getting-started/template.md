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
