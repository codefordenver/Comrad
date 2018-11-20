import React from 'react';

export const FormInput = props => {
  const { className, ...rest } = props;

  return (
    <input className={`form__input ${className || ''}`} {...rest}/>
  )
}