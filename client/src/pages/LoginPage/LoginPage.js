import React, { Component } from 'react';

import Button from '../../components/Button';
// import LoginForm from '../../components/LoginForm';
import FormUserLogin from '../../components/FormUserLogin';

class LoginPage extends Component {
  render() {
    const { props } = this;

    return (
      <div className="login-page">
        <div className="login-page__form">
          {/* <LoginForm {...this.props} /> */}
          <FormUserLogin {...props} />
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
