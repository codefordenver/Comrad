import React, { Component } from 'react';

import Button from '../../components/Button';
import FormPasswordReset from '../../components/FormPasswordReset';

class PasswordResetPage extends Component {
  render() {
    return (
      <div className="password-reset-page">
        <p>Enter Email Address</p>
        <FormPasswordReset className="mb-3" />
        <Button to="/">Go Back</Button>
      </div>
    );
  }
}

export default PasswordResetPage;
