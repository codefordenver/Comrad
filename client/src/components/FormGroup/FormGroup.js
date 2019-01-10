import React from 'react';

const FormGroup = props => {
  const { children, styleName } = props;

  return <div className={`form__group ${styleName || ''}`}>{children}</div>;
};

export default FormGroup;
