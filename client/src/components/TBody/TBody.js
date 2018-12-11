import React from 'react';

const TBody = props => {
  const { children, styleName } = props;

  return <tbody className={`tbody ${styleName || null}`}>{children}</tbody>;
};

export default TBody;
