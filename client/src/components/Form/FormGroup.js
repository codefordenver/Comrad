import React from 'react';

export const FormGroup = ({ children, utilities }) => (
  <div className={`form__group ${utilities ? " " + utilities : ""}`}>
    {children}
  </div>
);