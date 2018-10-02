import React from 'react'

export const THead = props => {
  return (
    <thead>
      <tr>
        {props.columns.map(column => (
          <th key={column.key}>{column.name}</th>
        ))}
        <th />
        <th />
      </tr>
    </thead>
  )
}
