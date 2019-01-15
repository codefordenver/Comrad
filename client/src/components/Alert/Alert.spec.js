import React from 'react';
import { mount } from 'enzyme';
import Alert from './Alert';

const wrapper = mount(<Alert />);

describe('<Alert />', () => {
  it('receives class of close when display state updated to close', () => {
    wrapper.setState({ display: 'close' });
    expect(wrapper.find('.alert').hasClass('close')).toEqual(true);
  });

  it('receives class of open when display state updated to open', () => {
    wrapper.setState({ display: 'open' });
    expect(wrapper.find('.alert').hasClass('open')).toEqual(true);
  });

  it('displays header prop in good order', () => {
    wrapper.setProps({ header: 'This is a Header' });
    expect(wrapper.find('.alert__header').text()).toEqual('This is a Header');
  });

  it('displays text prop in good order', () => {
    wrapper.setProps({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    });
    expect(wrapper.find('.alert__message').text()).toEqual(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    );
  });

  it('receives class alert--success with type props of success', () => {
    wrapper.setProps({ type: 'success' });
    expect(wrapper.find('.alert').hasClass('alert--success')).toEqual(true);
  });

  it('prop types success renders svg component with class of "check-circle"', () => {
    wrapper.setProps({ type: 'success' });
    expect(wrapper.find('svg.check-circle')).toHaveLength(1);
  });

  it('prop type info renders svg component with class of "info-circle"', () => {
    wrapper.setProps({ type: 'info' });
    expect(wrapper.find('svg.info-circle')).toHaveLength(1);
  });

  it('prop type danger renders svg component with class of "exclamation-circle"', () => {
    wrapper.setProps({ type: 'danger' });
    expect(wrapper.find('svg.exclamation-circle')).toHaveLength(1);
  });

  it('prop type warning renders svg component with class of "times-circle"', () => {
    wrapper.setProps({ type: 'warning' });
    expect(wrapper.find('svg.times-circle')).toHaveLength(1);
  });

  it('updates state when the x is clicked in corner', () => {
    wrapper.find('.alert__times').simulate('click');
    expect(wrapper.state('display')).toEqual('close');
  });
});
