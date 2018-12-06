import React from 'react'

const Label = props => {
  const { children, styleName } = props

  return <label className={`label ${styleName || ''}`}>{children}</label>
}

export default Label