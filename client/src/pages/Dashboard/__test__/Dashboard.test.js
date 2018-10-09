import React from 'react';
import { mount } from 'enzyme';
import Dashboard from '../Dashboard';
import Root from '../../../Root';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <Dashboard />
    </Root>
  )
});

afterEach(() => {
  wrapped.unmount();
});

it('', () => {
  
});