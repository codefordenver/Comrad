import React from 'react'

const ListGroupItem = props => {
  const { children, className } = props;
  
  return (
    <li className={`list-group__item ${className || ''}`}>
      {children || null}
    </li>
  )
}

export default ListGroupItem;