import React from 'react';
import { mount } from 'enzyme';
import DashboardHome from '../DashboardHome';
import Root from '../../../Root';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <DashboardHome />
    </Root>
  )
});

afterEach(() => {
  wrapped.unmount();
});

it('', () => {
  
});