### Tooltip Placement

```js
<div style={{
  display: 'flex',
  justifyContent: 'space-evenly'
}}>
  <Tooltip placement="top" text="Top">
    <Button>Top</Button>
  </Tooltip>
  <Tooltip placement="right" text="Right">
    <Button>Right</Button>
  </Tooltip>
  <Tooltip placement="bottom" text="Bottom">
    <Button>Bottom</Button>
  </Tooltip>
  <Tooltip placement="left" text="Left">
    <Button>Left</Button>
  </Tooltip>
</div>
```

### Tooltip with Heading

```js
<div style={{
  display: 'flex',
  justifyCOntent: 'space-evenly'
}}>
  <Tooltip placement="top" text="This is the text prop" heading="This is the heading prop">
    <Button>Hello</Button>
  </Tooltip>
</div>
```