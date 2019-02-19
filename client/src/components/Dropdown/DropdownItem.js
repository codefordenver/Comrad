import React from 'react';
import { Link } from 'react-router-dom';

export const DropdownItem = props => {
  const { children, to, handleOnClick } = props;

  if (to) {
    return (
      <Link className="dropdown__item" to={to}>
        {children}
      </Link>
    );
  }

  return (
    <div className="dropdown__item" onClick={handleOnClick}>
      {children}
    </div>
  );
};
