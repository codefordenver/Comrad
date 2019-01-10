import React from 'react';
import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';
import Root from '../components/Root';

import { InputStory } from '../components/Input/Input.stories';

storiesOf('Form', module)
  .addDecorator(story => <Root>{story()}</Root>)
  .addWithJSX('Input', withInfo(`This is for Form Inputs`)(InputStory));
