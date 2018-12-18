import React from 'react';

const Feedback = props => {
  const { children, styleName = '' } = props;

  return <div className={`feedback ${styleName}`}>{children}</div>;
};

export default Feedback;
