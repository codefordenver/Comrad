import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

export function CardBody({ children, className }) {
  function getClassNames() {
    return classnames('Card__body', className);
  }

  return <div className={getClassNames()}>{children}</div>;
}

CardBody.propTypes = {
  /**
   * Any additional classes to add
   */
  className: PropTypes.string,
};
