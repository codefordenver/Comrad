import React from 'react';

export const FormCheckBox = props => {
  const { className, ...rest } = props;

  return (
    <input className={`form__check-box ${className ? className : ''}`} {...rest} />
  )
}