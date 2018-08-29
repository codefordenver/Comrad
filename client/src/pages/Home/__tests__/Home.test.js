import React from 'react';
import { mount } from 'enzyme';
import Home from '../Home';
import Root from '../../../Root';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <Home />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('has username and password input', () => {
  expect(wrapped.find('input[name="username"]').length).toEqual(1);
  expect(wrapped.find('input[name="password"]').length).toEqual(1);
});

it('has sign in and reset password button', () => {
  expect(wrapped.find('.button--submit').length).toEqual(1);
  expect(wrapped.find('.link').length).toEqual(1);
});

describe('the username field', () => {
  beforeEach(() => {
    wrapped.find('input[name="username"]').simulate('change', {
      target: {
        name: 'username',
        value: 'dzimmerman'
      }
    });
    wrapped.update();
  });

  it('has text when user inputs', () => {
    expect(wrapped.find('input[name="username"]').prop('value')).toEqual('dzimmerman');
  });
});

describe('the password field', () => {
  beforeEach(() => {
    wrapped.find('input[name="password"]').simulate('change', {
      target: {
        name: 'password',
        value: 'comrad'
      }
    });
    wrapped.update();
  });

  it('has text when user inputs', () => {
    expect(wrapped.find('input[name="password"]').prop('value')).toEqual('comrad');
  })
})

