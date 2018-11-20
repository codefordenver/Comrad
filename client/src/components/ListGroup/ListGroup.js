import React from 'react'

const ListGroup = props => {
  const { children, className } = props

  return (
    <ul className={`list-group ${className || null}`}>
      {children || null}
    </ul>
  )
}

export default ListGroup;