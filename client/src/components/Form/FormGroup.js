import React from 'react';

export const FormGroup = ({ children, helpers }) => (
  <div className={helpers ? 'form__group ' + helpers : 'form__group'}>
    {children}
  </div>
);