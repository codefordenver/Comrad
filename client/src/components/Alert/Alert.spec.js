import React from 'react';
import { mount } from 'enzyme';
import Alert from './Alert';
import Root from '../Root';

let wrapped;

beforeAll(() => {
  wrapped = mount(
    <Root>
      <Alert />
    </Root>,
  );
});

afterAll(() => {
  wrapped.unmount();
});

describe('<Alert />', () => {
  it('receives header props in good order', () => {
    console.log('Received');
  });
});
