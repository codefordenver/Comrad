import React from 'react';

const Checkbox = props => {
  const { className, ...rest } = props;

  return <input className={`check-box ${className || ''}`} {...rest} />;
};

export default Checkbox;
