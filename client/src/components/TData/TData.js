import React from 'react'

const TData = props => {
  const { children, styleName } = props

  return (
    <td className={`tdata ${styleName || ''}`}>{children}</td>
  )
}

export default TData