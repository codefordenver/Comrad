import React from 'react';
import '../../index.css';

import { storiesOf } from '@storybook/react';
import Button from './Button';

storiesOf('Button', module).add('Button', () => (
  <div>
    <Button color="primary">Click Me</Button>
    <Button color="secondary">Click Me</Button>
    <Button color="primary">Click Me</Button>
  </div>
));
