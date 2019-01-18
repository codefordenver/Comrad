import React from 'react';

const Feedback = props => {
  const { children, className = '' } = props;

  return <div className={`feedback ${className}`}>{children}</div>;
};

export default Feedback;
