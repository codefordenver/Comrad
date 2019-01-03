import React from 'react';
import '../../index.css';

import { storiesOf } from '@storybook/react';
import Button from './Button';

export const ButtonStory = () => (
  <div style={{ margin: '0 2.5rem 2rem' }}>
    <Button color="primary">Primary</Button>
    <Button color="secondary">Secondary</Button>
  </div>
);
