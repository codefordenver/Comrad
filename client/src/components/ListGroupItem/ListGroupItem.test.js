import React from 'react';
import { shallow } from 'enzyme'
import ListGroupItem from './ListGroupItem'

let wrapped;

beforeEach(() => {
  wrapped = shallow(<ListGroupItem />)
});

afterEach(() => {
  wrapped.unmount();
});

describe('<ListGroupItem />', () => {
  it('exists', () => {
    expect(wrapped.exists()).toBe(true)
  });

  it('has a class of list-group__item', () => {
    expect(wrapped.hasClass('list-group__item')).toBe(true)
  });
})