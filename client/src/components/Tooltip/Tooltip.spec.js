import React from 'react';
import { mount } from 'enzyme';
import Tooltip from './Tooltip';

describe('<Tooltip />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Tooltip placement="top" text="tooltip text">
        <div className="testDiv">Hello</div>
      </Tooltip>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('should not have tooltip--open class before mouseenter', () => {
    expect(wrapper.find('.tooltip--open').exists()).toBe(false);
  });

  test('attaches the tooltip--open class on mouseenter', () => {
    wrapper.simulate('mouseenter');
    expect(wrapper.find('.tooltip--open').exists()).toBe(true);
    wrapper.simulate('mouseleave');
  });
});
