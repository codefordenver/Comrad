import React from 'react';

const Card = props => {
  const { children } = props;

  return <div className="card">{children}</div>;
};

export default Card;
