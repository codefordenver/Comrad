import React from 'react';

const Card = props => {
  const { children, styleName } = props

  return (
  <div className={`card ${styleName || ''}`}>
    {children}
  </div>
  )
}

export default Card