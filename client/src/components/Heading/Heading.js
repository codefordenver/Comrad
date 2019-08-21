import React, { createElement } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { config } from './config.js';

export function Heading({ children, className, size }) {
  function getElement() {
    return config.element[size];
  }

  function getClassNames() {
    return classnames('Heading', config.style.size[size], className);
  }

  return createElement(getElement(), { className: getClassNames() }, children);
}

Heading.propTypes = {
  children: PropTypes.string,
  /**
   * Any additional classes to add
   */
  className: PropTypes.string,
  /**
   * Determines the size of the component
   */
  size: PropTypes.number,
};

Heading.defaultProps = {
  size: 1,
};
