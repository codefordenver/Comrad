import React from 'react'

export const THead = props => {
  return (
    <thead className="table__header">
      <tr>
        {props.columns.map(column => (
          <th className="table__header__cell" key={column.key}>{column.name}</th>
        ))}
      </tr>
    </thead>
  )
}
