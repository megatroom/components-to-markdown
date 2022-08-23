---
title: Button
---

# Button

## Button  {#button}

<p><span class="badge badge--warning">Beta</span>&nbsp;<span class="badge badge--primary">Public</span>&nbsp;</p>


Buttons allow users to take actions, and make choices, with a single tap.


## Remarks





## Properties


### `children` ✳️  {#children}




The text to display in the button.

```tsx title="Type"
ReactNode
```



### `type`   {#type}




The button type.

```tsx title="Type"
'button' | 'submit' | 'reset'
```

```tsx title="Default Value"
'button'

```


### `variant`   {#variant}




The button variant.

```tsx title="Type"
'default' | 'primary' | 'success' | 'danger'
```

```tsx title="Default Value"
'default'

```


### `onClick`   {#onclick}




Button click event handler.

```tsx title="Type"
(event: React.MouseEvent<HTMLButtonElement>) => void
```


#### Parameters

| Name | Description |
| ---- | ----------- |
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



