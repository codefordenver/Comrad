import React from 'react';

export const FormInvalid = props => {
  const { text } = props;

  return (
    <div className="form__invalid">{text ? text : ''}</div>
  )
}