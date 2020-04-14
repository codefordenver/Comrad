import React, { Component } from 'react';

import Button from '../../components/Button';
import FormPasswordReset from '../../components/forms/FormPasswordReset';

class PasswordResetPage extends Component {
  render() {
    const { props } = this;

    return (
      <div className="password-reset-page">
        <p>Enter Email Address</p>

        <FormPasswordReset className="mb-3" {...props} />

        <Button to="/" color="link">
          Go Back
        </Button>
      </div>
    );
  }
}

export default PasswordResetPage;
