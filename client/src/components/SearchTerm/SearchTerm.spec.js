import React from 'react';
import { mount } from 'enzyme';
import Chance from 'chance';
import SearchTerm from './SearchTerm';

const chance = new Chance();
const wrapper = mount(<SearchTerm />);

describe('<SearchTerm />', () => {
  it('displays q prop in good order', () => {
    const sentence = chance.sentence({ words: 10 });
    wrapper.setProps({ q: sentence });
    expect(wrapper.find('.search-term__term').text()).toEqual(sentence);
  });
});
