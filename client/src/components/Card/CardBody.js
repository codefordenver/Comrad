import React from 'react';
import classnames from 'classnames';

const CardBody = props => {
  const { children, className } = props;

  return <div className={classnames('card__body', className)}>{children}</div>;
};

export { CardBody };
