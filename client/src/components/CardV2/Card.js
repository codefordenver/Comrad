import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { CardBody } from './CardBody';

export function Card({ children, className }) {
  function getClassNames() {
    return classnames('Card', className);
  }

  return <div className={getClassNames()}>{children}</div>;
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

Card.Body = CardBody;
