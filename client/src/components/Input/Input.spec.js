import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/input';
import * as types from '../../actions/types';
import fetchMock from 'fetch-mock';
import { mount } from 'enzyme';

import Input from './Input';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let wrapper;

beforeEach(() => {
  wrapper = mount(<Input />);
  console.log(wrapper);
});

afterEach(() => {
  wrapper.unmount();
});

describe('<Alert />', () => {
  it('works', () => {
    console.log('Write Code');
  });
});
