import React from 'react';
import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';
import { wInfo } from './utils';

import { ButtonStory } from '../components/Button/Button.stories';

storiesOf('Button', module).add(
  'Colors',
  wInfo(`
    Button Component

    ~~~js
      <Button
        color="primary"
        type="button"
        onClick={handleOnClick}
      />
        Click Me
      </Button>
    ~~~
  `)(ButtonStory),
);
