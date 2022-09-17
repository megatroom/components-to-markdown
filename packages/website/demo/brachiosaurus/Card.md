---
title: Card
---


# Card  {#card}




Cards are surfaces that display content and actions on a single topic.


## Remarks

They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.


## Examples

Basic usage:

```jsx
<Card>
  <CardBody>
    <Heading>
      <h6>Title</h6>
    </Heading>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <div>
      <Button color="primary" variant="link">
        See more
      </Button>
    </div>
  </CardBody>
</Card>
```

With media:

```jsx
<Card>
  <CardMedia image={PlaceholderImage} />
  <CardBody>
    <Heading>
      <h6>Título</h6>
    </Heading>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <div>
      <Button color="primary" variant="link">
        Saiba mais
      </Button>
    </div>
  </CardBody>
</Card>
```


## Properties


### `children` ✳️  {#children}




The content of the card.

```tsx title="Type"
node
```



### `raised`   {#raised}




The elevation of the card.

**Default Value:** `false`

```tsx title="Type"
bool
```



