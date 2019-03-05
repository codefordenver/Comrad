import React, { Component } from 'react';

import Button from '../../components/Button';
import FormAuthLogin from '../../components/FormAuthLogin';

class LoginPage extends Component {
  render() {
    const { props } = this;

    return (
      <div className="login-page">
        <p>Login to your account</p>
        <div className="login-page__form">
          <FormAuthLogin {...props} />
        </div>
        <div className="login-page__reset-button">
          <Button to="/reset">Reset Password</Button>
        </div>
        <div className="login-page__new-user">
          <p>
            <b>New to Comrad?</b>
          </p>

          <p>Sign Up for your free account!</p>

          <Button to="/signup" color="primary">
            Sign Up
          </Button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
