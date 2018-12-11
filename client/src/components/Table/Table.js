import React from 'react'

const Table = props => {
  const { children, styleName } = props

  return <table className={`table ${styleName || ''}`}>{children}</table>
}

export default Table
