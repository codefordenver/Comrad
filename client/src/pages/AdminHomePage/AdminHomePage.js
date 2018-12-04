import React, { Component } from 'react'

import Alert from '../../components/Alert'

class AdminHomePage extends Component {
  state = {}

  render() {
    return (
      <div>
        Admin Home Page
        <Alert type="success" title="Success" message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin libero at pharetra bibendum. Morbi gravida lorem eget nunc auctor lobortis. Nulla pulvinar, orci a tincidunt finibus, dolor eros gravida velit, nec eleifend justo nisi vulputate quam." />
      </div>
    )
  }
}

export default AdminHomePage
