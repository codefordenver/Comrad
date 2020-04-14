import React, { Component } from 'react';

import Button from '../../components/Button';
import FormAuthLogin from '../../components/forms/FormAuthLogin';

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
          <Button to="/reset" color="link">
            Reset Password
          </Button>
        </div>

        {process.env.REACT_APP_SHOW_DEVELOPMENT_SIGN_UP === 'true' && (
          <div className="login-page__new-user">
            <p>Sign Up To Help Contribute to Comrad</p>

            <Button to="/signup" color="primary">
              Sign Up
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default LoginPage;
