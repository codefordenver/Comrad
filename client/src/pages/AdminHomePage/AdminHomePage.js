import React, { Component } from 'react'

import Alert from '../../components/Alert'

class AdminHomePage extends Component {
  state = {}

  render() {
    return (
      <div>
        Admin Page
        <Alert type="warning">
          This is where the children will go
        </Alert>
      </div>
    )
  }
}

export default AdminHomePage
