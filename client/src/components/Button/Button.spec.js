import React from 'react';
import Chance from 'chance';
import { mount } from 'enzyme';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Button, { BUTTON_CLASS, BUTTON_TYPE } from './Button';

const chance = new Chance();
const mockFn = jest.fn();

describe('<Button />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Button />);
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it('receives class of button--primary with color props of primary', () => {
    wrapper.setProps({ color: 'primary' });
    expect(wrapper.find('.button').hasClass(BUTTON_CLASS.primary)).toEqual(
      true,
    );
  });

  it('receives class of button--success with color props of success', () => {
    wrapper.setProps({ color: 'success' });
    expect(wrapper.find('.button').hasClass(BUTTON_CLASS.success)).toEqual(
      true,
    );
  });

  it('receives class of button--info with color props of info', () => {
    wrapper.setProps({ color: 'info' });
    expect(wrapper.find('.button').hasClass(BUTTON_CLASS.info)).toEqual(true);
  });

  it('receives class of button--danger with color props of danger', () => {
    wrapper.setProps({ color: 'danger' });
    expect(wrapper.find('.button').hasClass(BUTTON_CLASS.danger)).toEqual(true);
  });

  it('receives class of button--warning with color props of warning', () => {
    wrapper.setProps({ color: 'warning' });
    expect(wrapper.find('.button').hasClass(BUTTON_CLASS.warning)).toEqual(
      true,
    );
  });

  it('receives class of button--link with color props of link', () => {
    wrapper.setProps({ color: 'link' });
    expect(wrapper.find('.button').hasClass(BUTTON_CLASS.link)).toEqual(true);
  });

  it('becomes disabled when the disabled prop is passed', () => {
    wrapper.setProps({ disabled: true });
    expect(wrapper.find('.button').prop('disabled')).toEqual(true);
  });

  it('receives children prop in good order', () => {
    const word = chance.word();
    wrapper.setProps({ children: word });
    expect(wrapper.find('.button').text()).toEqual(word);
  });

  it('performs onClick action in good order', () => {
    wrapper.setProps({ onClick: mockFn });
    wrapper.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('receives className props in good order', () => {
    const className = 'mr-2';
    wrapper.setProps({ className });
    expect(wrapper.find('.button').hasClass(className)).toEqual(true);
  });

  it('receives type prop in good order', () => {
    wrapper.setProps({ type: BUTTON_TYPE.button });
    expect(wrapper.find('.button').prop('type')).toEqual(BUTTON_TYPE.button);
  });
});

describe('<Link />', () => {
  let linkWrapper;

  beforeEach(() => {
    linkWrapper = mount(
      <Router>
        <Route>
          <Button to="/home" />
        </Route>
      </Router>,
    );
  });

  afterEach(() => {
    linkWrapper.unmount();
  });

  it('render <Link /> when passed a to prop', () => {
    expect(linkWrapper.find('Link').exists()).toEqual(true);
  });
});
