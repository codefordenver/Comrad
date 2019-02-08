import React from 'react';
import { mount } from 'enzyme';
import Tooltip from './Tooltip';

describe('<Tooltip />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Tooltip placement="top" text="tooltip text">
        <div>Hello</div>
      </Tooltip>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('should not have tooltip__open class before mouseenter', () => {
    expect(wrapper.find('.tooltip__text')).toHaveLength(0);
  });

  test('attaches the tooltip__open class on mouseenter', () => {
    wrapper.simulate('mouseenter');
    expect(wrapper.find('.tooltip__open')).toHaveLength(1);
    wrapper.simulate('mouseleave');
  });
});
