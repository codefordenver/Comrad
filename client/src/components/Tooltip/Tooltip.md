### Tooltip Placement with Hover

```js
<div
  style={{
    display: 'block',
  }}
>
  <div
    style={{
      margin: '1em',
      display: 'flex',
      justifyContent: 'space-evenly',
    }}
  >
    <Tooltip
      overlay={`Enter Text or Component Here`}
      trigger="hover"
      placement="top"
    >
      <Button>Top</Button>
    </Tooltip>

    <Tooltip
      overlay={`Enter Text or Component Here`}
      trigger="hover"
      placement="right"
    >
      <Button>Right</Button>
    </Tooltip>
  </div>

  <div
    style={{
      margin: '1em',
      display: 'flex',
      justifyContent: 'space-evenly',
    }}
  >
    <Tooltip
      overlay={`Enter Text or Component Here`}
      trigger="hover"
      placement="left"
    >
      <Button>Left</Button>
    </Tooltip>

    <Tooltip
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
    (example_jsx_component = () => {
      const COOL = 'cool';

      return (
        <div>
          <h2>Example JSX Component </h2>
          <p>{`Oh wow that is so ${COOL}!`}</p>
        </div>
      );
    })
  }

  <Tooltip
    overlay={example_jsx_component()}
    trigger="hover"
    placement="bottom"
  >
    <Button>Bottom</Button>
  </Tooltip>
</div>
```
