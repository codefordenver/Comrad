import React from 'react';
import PropTypes from 'prop-types';

const CardBody = props => {
  const { children } = props;

  return <div className="card__body">{children}</div>;
};

export { CardBody };
