import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function handleOnClick() {
  console.log('Clicked!');
}

export const DropdownItem = props => {
  const { children, to } = props;

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
