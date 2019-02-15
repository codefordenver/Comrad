import React from 'react';
import { ReactComponent as PlusSolid } from '../../images/plus-solid.svg';

const DropdownPlus = props => {
  return (
    <div className="dropdown__plus">
      {props.text && <span className="dropdown__plus__text">{props.text}</span>}
      <PlusSolid />
    </div>
  );
};

export { DropdownPlus };
