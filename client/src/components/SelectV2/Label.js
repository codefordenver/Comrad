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
    const isActive = (active || initial) && 'active';
    const isDirty = (dirty || dirtyOverride) && 'dirty';
    const isTouchedOrError = touched && error && 'error';

    return classnames('Select__label', isActive, isDirty, isTouchedOrError);
  }

  return <div className={getClassNames()}>{children}</div>;
}

Label.propTypes = {
  children: PropTypes.string,
};
