import React from 'react';

export const FormGroup = props => {
  const { children, className } = props
  return (
  <div className={`form__group ${className ? className : ''}`}>
    {children}
  </div>
);
}