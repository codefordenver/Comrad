import React, { Component } from 'react';
import { connect } from 'react-redux';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import FormAuthLogin from '../../components/FormAuthLogin';

import { authAlertClose } from '../../redux/auth';

class LoginPage extends Component {
  render() {
    const { props } = this;
    const { auth, authAlertClose } = props;
    const { alert } = auth;
    const { display } = alert;

    console.log(this.props);

    return (
      <div className="login-page">
        {display && (
          <Alert className="mb-3" alertClose={authAlertClose} {...alert} />
        )}
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

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(
  mapStateToProps,
  { authAlertClose },
)(LoginPage);
