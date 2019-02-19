import React from 'react';

const DropdownPlus = props => {
  return (
    <div className="dropdown__plus">
      {props.text && <span className="dropdown__plus__text">{props.text}</span>}
      <i class="fas fa-plus" />
    </div>
  );
};

export { DropdownPlus };
