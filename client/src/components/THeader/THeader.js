import React from 'react'

const THeader = props => {
  const { children, styleName } = props

  return (
    <thead className={`theader ${styleName || ''}`}>{children}</thead>
  )
}

export default THeader