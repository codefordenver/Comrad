```jsx
const REGEX_EMAIL = require('../../utils/validation').REGEX_EMAIL;

const style = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridColumnGap: '3rem',
};

<div style={style}>
  <Input name="first_name" label="First Name" className="mb-3" />
  <Input name="last_name" label="Last Name" className="mb-3" />
  <Input name="email" type="text" label="Email" feedback="Invalid Email Address" validate={REGEX_EMAIL} invalid />
  <Input name="phone_number" label="Phone Number" />
  <Input name="q" label="Search" icon="search" />
  <Input name="user" label="User" icon="user" />
</div>;
```
