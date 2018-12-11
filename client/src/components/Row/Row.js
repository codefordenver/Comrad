import React from 'react';

const Row = props => {
  const { children } = props;

  return <div className="row">{children}</div>;
};

export default Row;
