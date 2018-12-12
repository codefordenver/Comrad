import React from 'react';

const Input = props => {
  const { styleName, ...rest } = props;

  return <input className={`input ${styleName || ''}`} {...rest} />;
};

export default Input;
