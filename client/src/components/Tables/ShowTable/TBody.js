import React from 'react';

export const TBody = props => {
  return (
    <tbody className="table__body">
      {props.rows.map(row => (
        <tr className="table__row" key={row.id}>
          <td className="table__cell">{row.name}</td>
          <td className="table__cell">{row.time}</td>
          <td className="table__cell">Show Builder</td>
          <td className="table__cell">Edit Show Details</td>
        </tr>
      ))}
    </tbody>
  )
}
