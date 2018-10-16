import React, { Component } from 'react'

class ShowTable extends Component {
  renderBody() {
    return (
      <tbody>
        {this.props.rows.map(row => (
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.time}</td>
            <td>
              <a href="#">Show Builder</a>
            </td>
            <td>
              <a href="#">Edit Show Details</a>
            </td>
          </tr>
        ))}
      </tbody>
    )
  }
  render() {
    return (
      <table className="table">
        {this.renderBody()}
      </table>
    )
  }
}

export default ShowTable;