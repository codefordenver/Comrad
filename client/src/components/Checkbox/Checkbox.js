import React from 'react';
import './_Checkbox.scss';

const Checkbox = props => {
  const { className, ...rest } = props;
  const label = 'test box'; //this will be passed in from parent component as props
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        name={label}
        className={`check-box ${className || ''}`}
        {...rest}
      />
      <span className="checkmark" />
      <div className="checkbox-label">{label}</div>
    </div>
  );
};

export default Checkbox;
