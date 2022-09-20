---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BrowserWindow from '@site/src/components/BrowserWindow';

# Partial Output

The default behavior of C2M is to create or replace the output file when generating documentation. But **it's possible to update only a part of an existing file**.

## Markers

You can use two kind of markers:

- [Simple Marker](#simple-marker) - when the relation between the component and the output file is one-to-one.
- [Component Marker](#component-marker) - when the output file will be updated with two or more components.

:::info

If the file exists and has no markers, the entire file will be replaced with the auto-generated content.

:::

:::note

It's necessary to have an empty line before and after the markers to ensure that C2M will find them.

Do **not** put the start and end markers on the same line.

:::

### Simple Marker

For example, if you have a file with the following content:

```markdown title="Button.md"
# Button

This is a fixed text in the `Button.md` file.

Now the auto-generated content with the `Button.tsx` component documentation:

<!-- c2m:begin -->
<!-- c2m:end -->

Here continues with the fixed content.
```

C2M will locate the `<!-- c2m:begin -->` and `<!-- c2m:end -->` markers and fill the content with auto-generated documentation.

If you want to use the markers together with HTML/JSX tags, use it like this:

```markdown title="Button.md"
# Button

This is a fixed text in the `Button.md` file.

Now the auto-generated content with the `Button.tsx` component documentation:

<div className="container">
  <div className="component-doc-block">
    <span data-c2m="template:begin" />
    <span data-c2m="template:end" />
  </div>
</div>

Here continues with the fixed content.
```

C2M will locate the `<span data-c2m="template:begin" />` and `<span data-c2m="template:end" />` markers and fill the content with auto-generated documentation.

:::caution

Make sure you have a good interoperability between markdown and HTML/JSX.

If you are using Docusaurus, see [its documentation on this](https://docusaurus.io/docs/markdown-features/react#markdown-and-jsx-interoperability).

:::

### Component Marker

For example, if you have a file `components.md` with the following content:

```markdown title="components.md"
# Components

This is a fixed text in the `components.md` file.

## Button

Below is the documentation for the `<Button />` component:

<!-- c2m:begin:Button -->
<!-- c2m:end:Button -->

## Card

Below is the documentation for the `<Card />` component:

<!-- c2m:begin:Card -->
<!-- c2m:end:Card -->

## Other topic

Here continues with the fixed content.
```

C2M will locate the `<!-- c2m:begin:{component-name} -->` and `<!-- c2m:end:{component-name} -->` markers and fill the content with the `{component-name}` auto-generated documentation.

Just like simple markers, you can use it inside HTML/JSX with `<span data-c2m="template:begin:{component-name}" />` and `<span data-c2m="template:end:{component-name}" />` markers.

:::info

By default C2M generates a file for each module or component, to change this behavior use the [`outputFileName` hook](/docs/api/library#outputfilename) so that it uses the same output file.

:::

## Using tabs to separate documentation

If you want to separate the documentation of your components, you can use tabs:

```markdown title="Button.md"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Button

This is a fixed text in the `Button.md` file.

<Tabs>
  <TabItem value="code" label="Code" default>
    <h2>Properties</h2>
    <span data-c2m="template:begin" />
    <span data-c2m="template:end" />
  </TabItem>
  <TabItem value="examples" label="Examples">
    Component examples go here...
  </TabItem>
  <TabItem value="usage" label="Usage">
    Component usage go here...
  </TabItem>
</Tabs>
```

:::note

The `Tab` and `TabItem` components are from the [Docusaurus](https://docusaurus.io/) framework, but you can use any other component.

:::

Using [Stegosaurus](/demo/stegosaurus/overview) template, the result will be:

<BrowserWindow>
  <h1>Button</h1>
  <p>This is a fixed text in the <code>Button.md</code> file.</p>
  <Tabs>
    <TabItem value="code" label="Code" default>
      <h2>Properties</h2>
      <span data-c2m="template:begin" />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>children</b><span title="required" style={{ color: 'var(--ifm-color-danger)' }}>*</span>
            </td>
            <td>The text to display in the button.<br/><code>ReactNode</code></td>
            <td>-</td>
          </tr>
          <tr>
            <td>
              <b>type</b>
            </td>
            <td>The button type.<br/><code>&#x27;button&#x27; | &#x27;submit&#x27; | &#x27;reset&#x27;</code></td>
            <td><code>'button'</code></td>
          </tr>
          <tr>
            <td>
              <b>variant</b>
            </td>
            <td><strong>Since:</strong> 1.1.0<br/>The button variant.<br/><code>&#x27;default&#x27; | &#x27;primary&#x27; | &#x27;success&#x27; | &#x27;danger&#x27;</code></td>
            <td><code>'default'</code></td>
          </tr>
          <tr>
            <td>
              <b>onClick</b>
            </td>
            <td>Button click event handler.<br/><code>(event: React.MouseEvent&lt;HTMLButtonElement&gt;) &#x3D;&gt; void</code><br/><code>event</code> The click event.</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
      <span data-c2m="template:end" />
    </TabItem>
    <TabItem value="examples" label="Examples">
      Component examples go here...
    </TabItem>
    <TabItem value="usage" label="Usage">
      Component usage go here...
    </TabItem>

  </Tabs>
</BrowserWindow>
