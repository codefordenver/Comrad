import React from 'react';

const Invalid = props => {
  const { children, styleName } = props;

  return <div className={`invalid ${styleName || null}`}>{children}</div>;
};

export default Invalid;
