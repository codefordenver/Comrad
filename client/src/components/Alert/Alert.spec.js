import React from 'react';
import { mount } from 'enzyme';
import Alert, { ALERT_CLASS } from './Alert';

let wrapper;

beforeEach(() => {
  wrapper = mount(<Alert />);
});

afterEach(() => {
  wrapper.unmount();
});

describe('<Alert />', () => {
  it('receives class of close when display state updated to close', () => {
    wrapper.setState({ display: false });
    expect(wrapper.find('.alert').hasClass('close')).toEqual(true);
  });

  it('receives class of open when display state updated to open', () => {
    wrapper.setState({ display: true });
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
    expect(wrapper.find('.alert').hasClass(ALERT_CLASS.success)).toEqual(true);
  });

  it('receives class alert--info with type props of info', () => {
    wrapper.setProps({ type: 'info' });
    expect(wrapper.find('.alert').hasClass(ALERT_CLASS.info)).toEqual(true);
  });

  it('receives class alert--danger with type props of danger', () => {
    wrapper.setProps({ type: 'danger' });
    expect(wrapper.find('.alert').hasClass(ALERT_CLASS.danger)).toEqual(true);
  });

  it('receives class alert--warning with type props of warning', () => {
    wrapper.setProps({ type: 'warning' });
    expect(wrapper.find('.alert').hasClass(ALERT_CLASS.warning)).toEqual(true);
  });

  it('updates state when the x is clicked in corner', () => {
    wrapper.find('.alert__times').simulate('click');
    expect(wrapper.state('display')).toEqual(false);
  });
});
