# Testing

## Front End

### Tools

Jest is used by Facebook to test all JavaScript code including React applications. One of Jest's philosophies is to provide an integrated "zero-configuration" experience. We observed that when engineers are provided with ready-to-use tools, they end up writing more tests, which in turn results in more stable and healthy code bases.

Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output. You can also manipulate, traverse, and in some ways simulate runtime given the output.Enzyme's API is meant to be intuitive and flexible by mimicking jQuery's API for DOM manipulation and traversal.

### Resources

[Jest](https://jestjs.io/) <br>
[Enzyme](https://airbnb.io/enzyme/)

### Running a Test

```
$ cd client/
$ npm run test
```

### Building a Test

File Name : `ComponentName.spec.js`

```jsx
// Import libraries
import React from 'react';
import Chance from 'chance';
import { mount } from 'enzyme';
import { randArrItem } from '../../utils/lib';

// Import component and any additional objects that could be used to help with testing
import Alert, { ALERT_CLASS, ALERT_TYPES, ALERT_ICON } from './Alert';

// I personally like chance to randomize the data, increase chances of catching outliers
const chance = new Chance();
const randMessage = chance.sentence({ words: 20 });
const randWord = chance.word();
const randType = randArrItem(ALERT_TYPES);

// Below is the setup funtion for building the React component
const setup = propOverrides => {
  // Setup props to be used. Have the requeired props to be a default value and the override will cover any additional props
  const props = Object.assign(
    {
      type: randType,
    },
    propOverrides,
  );

  // Create wrapper with props
  const wrapper = mount(<Alert {...props} />);

  // Return props, wrapper and any additional data. Could be functions if needed
  return {
    props,
    wrapper,
  };
};

// Start with describe statement and have the actual component as the message
// it statements can vary, just depends on the component you are working on
describe('<Alert />', () => {
  it('displays message prop in good order', () => {
    const { wrapper } = setup({ message: randMessage });

    expect(wrapper.find('.alert__message').text()).toEqual(randMessage);
  });

  it('displays header prop in good order', () => {
    const { wrapper } = setup({ header: randWord });

    expect(wrapper.find('.alert__header').text()).toEqual(randWord);
  });

  it('applys correct class in good order', () => {
    const { wrapper } = setup();

    expect(wrapper.find('.alert').hasClass(ALERT_CLASS[randType])).toEqual(
      true,
    );
  });

  it('displays icon element in good order', () => {
    const { wrapper } = setup();

    expect(wrapper.find('.alert__icon').contains(ALERT_ICON[randType])).toEqual(
      true,
    );
  });
});
```

## Back End

*Needs Documentation*
