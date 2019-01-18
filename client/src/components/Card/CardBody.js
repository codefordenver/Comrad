import React from 'react';

const CardBody = props => {
  const { children } = props;

  return <div className="card__body">{children}</div>;
};

export { CardBody };
