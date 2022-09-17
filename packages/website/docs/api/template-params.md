---
sidebar_position: 3
---

# Template Params

C2M transforms all component data within a file into an object ([ComponentData](#componentdata)) using a structure that makes it easy to use in the template.

## ComponentData

All the file data.

| Property   | Type                            | Description                          |
| ---------- | ------------------------------- | ------------------------------------ |
| name       | string                          | The file name without the extension. |
| components | [ComponentDoc](#componentdoc)[] | All components found in the file.    |

## ComponentDoc

All the component data.

| Property     | Type                                  | Description                                                       |
| ------------ | ------------------------------------- | ----------------------------------------------------------------- |
| name         | string                                | The component name.                                               |
| description  | string                                | The componente description.                                       |
| properties   | [ComponentProp](#componentprop)[]     | The description of the component.                                 |
| isTypeScript | boolean                               | The component contains at least one property with TypeScript type |
| isPropType   | boolean                               | The component contains at least one property with prop-types type |
| hasModifiers | boolean                               | Whenever the modifiers has the value `true`.                      |
| beta         | boolean                               | It has the `@beta` or `@experimental` modifier tag.               |
| alpha        | boolean                               | It has the `@alpha` modifier tag.                                 |
| public       | boolean                               | It has the `@public` modifier tag.                                |
| internal     | boolean                               | It has the `@internal` modifier tag.                              |
| virtual      | boolean                               | It has the `@virtual` modifier tag.                               |
| override     | boolean                               | It has the `@override` modifier tag.                              |
| sealed       | boolean                               | It has the `@sealed` modifier tag.                                |
| deprecated   | [DocDataBlockTag](#docdatablocktag)   | Whether the component has been marked as deprecated.              |
| remarks      | [DocDataBlockTag](#docdatablocktag)   | Detailed remarks section.                                         |
| returns      | [DocDataBlockTag](#docdatablocktag)   | The return value for a function.                                  |
| defaultValue | [DocDataBlockTag](#docdatablocktag)   | The default value for a field or property,                        |
| examples     | [DocDataBlockTag](#docdatablocktag)[] | All the section presented as an example                           |
| params       | [DocDataParam](#docdataparam)[]       | Function parameters.                                              |

## ComponentProp

All the component properties data.

| Property     | Type                                    | Description                                          |
| ------------ | --------------------------------------- | ---------------------------------------------------- |
| name         | string                                  | The property name.                                   |
| type         | [ComponentPropType](#componentproptype) | The property type.                                   |
| required     | boolean                                 | Whenever the property is required.                   |
| requiredText | 'Yes' \| 'No'                           | The `required` property in text format.              |
| description  | string                                  | The componente description.                          |
| hasModifiers | boolean                                 | Whenever the modifiers has the value `true`.         |
| beta         | boolean                                 | It has the `@beta` or `@experimental` modifier tag.  |
| alpha        | boolean                                 | It has the `@alpha` modifier tag.                    |
| public       | boolean                                 | It has the `@public` modifier tag.                   |
| internal     | boolean                                 | It has the `@internal` modifier tag.                 |
| virtual      | boolean                                 | It has the `@virtual` modifier tag.                  |
| override     | boolean                                 | It has the `@override` modifier tag.                 |
| sealed       | boolean                                 | It has the `@sealed` modifier tag.                   |
| deprecated   | [DocDataBlockTag](#docdatablocktag)     | Whether the component has been marked as deprecated. |
| remarks      | [DocDataBlockTag](#docdatablocktag)     | Detailed remarks section.                            |
| returns      | [DocDataBlockTag](#docdatablocktag)     | The return value for a function.                     |
| defaultValue | [DocDataBlockTag](#docdatablocktag)     | The default value for a field or property,           |
| examples     | [DocDataBlockTag](#docdatablocktag)[]   | All the section presented as an example              |
| params       | [DocDataParam](#docdataparam)[]         | Function parameters.                                 |

## ComponentPropType

| Property | Type   | Description    |
| -------- | ------ | -------------- |
| name     | string | The type name. |
| raw      | string | The raw type.  |

## DocDataBlockTag

All text following a block tag, up until the start of the next block tag or modifier tag, is considered to be the block tag's **tag content**. The content may include Markdown elements and inline tags.

| Property | Type   | Description      |
| -------- | ------ | ---------------- |
| content  | string | The tag content. |

## DocDataParam

| Property    | Type   | Description                |
| ----------- | ------ | -------------------------- |
| name        | string | The parameter name.        |
| description | string | The parameter description. |
