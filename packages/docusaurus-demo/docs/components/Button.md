---
title: Button
---

# Button

## Button

@beta 

Buttons allow users to take actions, and make choices, with a single tap.


## Remarks

Buttons communicate actions that users can take. They are typically placed throughout your UI, in places like:
- Dialogs
- Modal windows
- Forms
- Cards
-Toolbars

## Properties


### `children` ✳️

<p>
  <span class="badge badge--primary">Required</span>
  
</p>

The text to display in the button.

```tsx title="Type"
ReactNode
```

```tsx title="Default"
-
```




### `type` 

<p>
  
  
</p>

The button type.
@default 'button'

```tsx title="Type"
'button' | 'submit' | 'reset'
```

```tsx title="Default"
-
```




### `variant` 

<p>
  
  
</p>

The button variant.
@default 'default'

```tsx title="Type"
'default' | 'primary' | 'success' | 'danger'
```

```tsx title="Default"
-
```




### `onClick` 

<p>
  
  
</p>

Button click event handler.

```tsx title="Type"
(event: React.MouseEvent<HTMLButtonElement>) => void
```

```tsx title="Default"
-
```


#### Parameters

| Name | Description |
| ---- | ----------- |
| event | The click event. |


#### Return Value

void

#### Example

```tsx
onClick={() => {
 console.log('Button clicked');
}}
```


