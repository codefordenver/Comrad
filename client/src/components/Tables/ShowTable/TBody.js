import React from 'react';

export const TBody = props => {
  return (
    <tbody>
      {props.rows.map(row => (
        <tr key={row.id}>
          <td>{row.name}</td>
          <td>{row.time}</td>
          <td>Show Builder</td>
          <td>Edit Show Details</td>
        </tr>
      ))}
    </tbody>
  )
}
