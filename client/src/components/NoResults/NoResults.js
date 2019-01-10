import React from 'react';

const NoResults = props => {
  const { children } = props;

  return <div className="no-results">{children}</div>;
};

export default NoResults;
