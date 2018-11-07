import React, { Component } from 'react'

class Unauthorized extends Component {
  render() {
    return (
      <div className="unauthorized">
      <div className="unauthorized__wrapper">
        <h1 className="unauthorized__h1">401: Unauthorized Access</h1>
        // The unauthorized__placeholder should be replaced by the alert
        // component from Issue #218 when ready 
        <div className="unauthorized__placeholder">
        Alert button with unauthorized text goes here
        </div>
        </div>
      </div>
    )
  }
}

export default Unauthorized
