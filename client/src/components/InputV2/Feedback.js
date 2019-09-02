import React from 'react';

import classnames from 'classnames';

export function Feedback({ children, className, type }) {
  function getClassNames() {
    return classnames('Input__feedback', className, type);
  }

  return <div className={getClassNames()}>{children}</div>;
}
