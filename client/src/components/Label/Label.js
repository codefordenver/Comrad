import React from 'react';

const Label = props => {
  const { children, styleName = '', ...rest } = props;

  return (
    <label className={`label ${styleName}`} {...rest}>
      {children}
    </label>
  );
};

export default Label;
