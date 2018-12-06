import React from 'react'

const THead = props => {
  const { children, styleName } = props

  return (
    <th className={`thead ${styleName || ''}`}>{children}</th>
  )
}

export default THead