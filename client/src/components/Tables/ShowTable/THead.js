import React from 'react'

export const THead = props => {
  return (
    <thead>
      <tr>
        {props.columns.map(column => (
          <th className="table__header" key={column.key}>{column.name}</th>
        ))}
      </tr>
    </thead>
  )
}
