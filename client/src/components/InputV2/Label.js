import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

export function Label({
  active,
  children,
  dirty,
  error,
  initial,
  touched,
  dirtyOverride,
}) {
  function getClassNames() {
    const isActive = active || (initial && 'active');
    const isDirty = dirty || (dirtyOverride && 'dirty');
    const isTouchedAndError = touched && error && 'error';

    return classnames('Input__label', isActive, isDirty, isTouchedAndError);
  }

  return <div className={getClassNames()}>{children}</div>;
}

Label.propTypes = {
  children: PropTypes.string,
};
