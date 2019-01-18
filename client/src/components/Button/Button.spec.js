import React from 'react';
import { mount } from 'enzyme';
import Button from './Button';

const wrapper = mount(<Button />);

describe('<Button />', () => {
  it('works', () => {
    console.log('test');
  });
});
