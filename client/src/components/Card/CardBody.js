import React from 'react';

export const CardBody = ({ children, utilities }) => (
  <div className={`card__body${utilities ? " " + utilities : ""}`}>
    {children}
  </div>
);