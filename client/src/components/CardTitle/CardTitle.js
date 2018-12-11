import React from 'react';

const CardTitle = props => {
  const { children, styleName } = props;

  return <div className={`card__title ${styleName || ''}`}>{children}</div>;
};

export default CardTitle;
