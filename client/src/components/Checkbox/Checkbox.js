import React from 'react';

const Checkbox = props => {
  const { styleName, ...rest } = props;

  return (
    <input className={`check-box ${styleName || ''}`} {...rest} />
  )
}

export default Checkbox