---
title: Button
---

# Button {#button}

<p><span class="badge badge--warning">Beta</span>&nbsp;<span class="badge badge--primary">Public</span>&nbsp;</p>

Buttons allow users to take actions, and make choices, with a single tap.

## Remarks

Buttons communicate actions that users can take.

They are typically placed throughout your UI, in places like:

- Dialogs
- Modal windows
- Forms
- Cards
  -Toolbars

## Properties

### `children` ✳️ {#children}

The text to display in the button.

```tsx title="Type"
ReactNode;
```

### `type` {#type}

The button type.

**Default Value:** `'button'`

```tsx title="Type"
'button' | 'submit' | 'reset';
```

### `variant` {#variant}

The button variant.

**Since:** 1.1.0

**Default Value:** `'default'`

```tsx title="Type"
'default' | 'primary' | 'success' | 'danger';
```

### `onClick` {#onclick}

Button click event handler.

```tsx title="Type"
(event: React.MouseEvent<HTMLButtonElement>) => void
```

#### Parameters

| Name    | Description      |
| ------- | ---------------- |
| `event` | The click event. |

#### Returns

void

#### Examples

Logging the click event

```tsx
onClick={() => {
 console.log('Button clicked');
}}
```
