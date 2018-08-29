import React from 'react';

export const CardTitle = ({ children, helpers }) => (
  <div className={'card__title ' + (helpers || '')}>
    {children}
  </div>
);