import React from 'react';
import { storiesOf } from '@storybook/react';
import Tooltip from '../components/Tooltip';
import { wInfo } from './utils';

const stories = storiesOf('Tooltip', module).addWithJSX(
  'Directional Placement',
  wInfo('Shows the different directions tooltips can open in')(() => {
    const placements = ['top', 'left', 'right', 'bottom'];
    const tooltips = placements.map(placement => (
      <Tooltip text={placement} placement={placement}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '8px',
            border: '2px black solid',
          }}
        >
          {placement}
        </div>
      </Tooltip>
    ));
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100px',
          margin: '0 100px',
        }}
      >
        {tooltips}
      </div>
    );
  }),
);
