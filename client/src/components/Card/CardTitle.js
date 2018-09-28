import React from 'react';

export const CardTitle = ({ children, utilities }) => (
  <div className={`card__title${utilities ? " " + utilities : ""}`}>
    {children}
  </div>
);