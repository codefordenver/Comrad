import React from 'react';
import './_Checkbox.scss';

const Checkbox = props => {
  const { className, ...rest } = props;
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        name={props.label}
        className={`check-box ${className || ''}`}
        {...rest}
      />
      <span className="checkmark" />
      <div className="checkbox-label">{props.label}</div>
    </div>
  );
};

export default Checkbox;
