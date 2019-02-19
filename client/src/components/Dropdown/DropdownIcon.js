import React from 'react';

const DropdownIcon = props => {
  let className = "fas"
  if (props.icon) {
    className += " " + props.icon;
  }
  return (
    <div className="dropdown__icon">
      {props.icon && <i className={className} />}
    </div>
  );
};

export { DropdownIcon };
