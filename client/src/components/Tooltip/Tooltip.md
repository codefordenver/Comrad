### Tooltip Placement with Hover

```js
<div
  style={{
    display: 'block',
  }}
>
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-evenly',
    }}
  >
    <Tooltip
      setKey={'example_top'}
      overlay={`Enter Text or Component Here`}
      trigger="hover"
      placement="top"
    >
      <Button>Top</Button>
    </Tooltip>

    <Tooltip
      setKey={'example_right'}
      overlay={`Enter Text or Component Here`}
      trigger="hover"
      placement="right"
    >
      <Button>Right</Button>
    </Tooltip>
  </div>

  <div
    style={{
      marginTop: '10px',
      display: 'flex',
      justifyContent: 'space-evenly',
    }}
  >
    <Tooltip
      setKey={'example_left'}
      overlay={`Enter Text or Component Here`}
      trigger="hover"
      placement="left"
    >
      <Button>Left</Button>
    </Tooltip>

    <Tooltip
      setKey={'example_bottom'}
      overlay={`Enter Text or Component Here`}
      trigger="hover"
      placement="bottom"
    >
      <Button>Bottom</Button>
    </Tooltip>
  </div>
</div>
```

### Tooltip Click Example

```js
<div
  style={{
    display: 'flex',
    justifyContent: 'space-evenly',
  }}
>
  <Tooltip
    setKey={'example_bottom_click'}
    overlay={`Enter Text or Component Here`}
    trigger="click"
    placement="bottom"
  >
    <Button>Bottom</Button>
  </Tooltip>
</div>
```

### Tooltip Using React Component

```js
<div
  style={{
    display: 'flex',
    justifyContent: 'space-evenly',
  }}
>
  {
    (example_component = () => {
      return (
        <div>
          <h1>Example React Component </h1>
          <p>Oh wow that is so cool!</p>
        </div>
      );
    })
  }

  <Tooltip
    setKey={'example_bottom_react'}
    overlay={example_component()}
    trigger="hover"
    placement="bottom"
  >
    <Button>Bottom</Button>
  </Tooltip>
</div>
```
