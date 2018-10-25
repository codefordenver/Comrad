import React from 'react';

export const FormValid = props => {
  const { text } = props;
  return (
    <div className="form__valid">{text ? text : ''}</div>
  )
}