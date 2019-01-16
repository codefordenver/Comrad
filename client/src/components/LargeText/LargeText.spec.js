import React from 'react';
import { mount } from 'enzyme';
import Chance from 'chance';
import LargeText from './LargeText';

const chance = new Chance();
const wrapper = mount(<LargeText />);

describe('<LargeText />', () => {
  it('displays children prop in good order', () => {
    const sentence = chance.sentence({ words: 10 });
    wrapper.setProps({ children: sentence });
    expect(wrapper.find('.large-text').text()).toEqual(sentence);
  });
});
