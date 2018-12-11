import React from 'react';

const CardBody = props => {
  const { children, className } = props;

  return <div className={`card__body ${className || ''}`}>{children}</div>;
};

export default CardBody;
