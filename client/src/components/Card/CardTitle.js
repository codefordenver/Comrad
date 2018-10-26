import React from 'react'

export const CardTitle = props => {
  const { text, className } = props

  return (
    <div className={`card__title ${className ? className : ''}`}>
      {text ? text : ''}
    </div>
  )
}
