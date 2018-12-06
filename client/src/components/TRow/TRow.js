import React from 'react'

const TRow = props => {
  const { children, styleName, ...rest } = props

  return (
    <tr className={`trow ${styleName || ''}`} {...rest}>{children}</tr>
  )
}

export default TRow