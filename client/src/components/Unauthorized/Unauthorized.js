import React, { Component } from 'react'

class Unauthorized extends Component {
  render() {
    return (
      <div>
        <h1>401: Unauthorized Access</h1>
        <div>
        Alert button with unauthorized text goes here
        </div>
      </div>
    )
  }
}

export default Unauthorized
