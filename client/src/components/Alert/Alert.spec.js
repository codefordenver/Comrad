import React from 'react';
import Chance from 'chance';
import { mount } from 'enzyme';
import { randArrItem } from '../../utils/lib';

import Alert, { ALERT_CLASS, ALERT_TYPES, ALERT_ICON } from './Alert';

const chance = new Chance();
const randMessage = chance.sentence({ words: 20 });
const randWord = chance.word();
const randType = randArrItem(ALERT_TYPES);

const setup = propOverrides => {
  const props = Object.assign(
    {
      type: randType,
    },
    propOverrides,
  );

  const wrapper = mount(<Alert {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('<Alert />', () => {
  it('displays message prop in good order', () => {
    const { wrapper } = setup({ message: randMessage });

    expect(wrapper.find('.alert__message').text()).toEqual(randMessage);
  });

  it('displays header prop in good order', () => {
    const { wrapper } = setup({ header: randWord });

    expect(wrapper.find('.alert__header').text()).toEqual(randWord);
  });

  it('applys correct class in good order', () => {
    const { wrapper } = setup();

    expect(wrapper.find('.alert').hasClass(ALERT_CLASS[randType])).toEqual(
      true,
    );
  });

  it('displays icon element in good order', () => {
    const { wrapper } = setup();

    expect(wrapper.find('.alert__icon').contains(ALERT_ICON[randType])).toEqual(
      true,
    );
  });
});
