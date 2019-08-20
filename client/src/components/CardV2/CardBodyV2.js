import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

function CardBody({ children, className }) {
  return <div className={classnames('card__body', className)}>{children}</div>;
}

export default CardBody;
