import React from 'react';
import { storiesOf } from '@storybook/react';
import Tooltip from '../components/Tooltip';
import Button from '../components/Button';

const stories = storiesOf('Tooltip', module);
const directions = ['top', 'left', 'right', 'bottom'];
directions.forEach(direction => {
  stories.addWithJSX(direction, () => (
    <div style={{ display: 'flex' }}>
      <Tooltip text={direction} placement={direction}>
        <Button>Hover over me!</Button>
      </Tooltip>
    </div>
  ));
});
