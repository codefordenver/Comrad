import React, { Component } from 'react';
import Alert from '../../components/Alerts/Alert';

class AdminPage extends Component {
  state = {};

  render() {
    return (
      <div className="admin__page">
        Admin Page

        <Alert alertType="warning" title="Warning">Warning Will Robinson, Warning!</Alert>

        <Alert alertType="error" title="Error">Satan will eat your brain!!</Alert>

        <Alert alertType="success" title="Success">You've learn now to spell "error", congrats!</Alert>

        <Alert alertType="info" title="Information">Ipsom lerom blah blah blah</Alert>


      </div>

    )
  }
}

export default AdminPage;