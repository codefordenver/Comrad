import React from 'react'

const LayoutEmpty = props => {
  const { children } = props

  return (
    <div className="layout-empty">
      {children}
    </div>
  )
}

export default LayoutEmpty