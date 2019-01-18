import React from 'react';

const Label = props => {
  const { children, className = '', ...rest } = props;

  return (
    <label className={`label ${className}`} {...rest}>
      {children}
    </label>
  );
};

export default Label;
