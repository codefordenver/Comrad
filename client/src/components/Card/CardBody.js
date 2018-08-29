import React from 'react';

export const CardBody = ({ children, helpers }) => (
  <div className={helpers ? 'card__body ' + helpers : 'card__body'}>
    {children}
  </div>
);