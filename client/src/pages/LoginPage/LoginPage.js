import React, { Component } from 'react';
import { connect } from 'react-redux';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import FormAuthLogin from '../../components/FormAuthLogin';

import { authAlertClose } from '../../redux/auth';
import { userAlertClose } from '../../redux/user';

class LoginPage extends Component {
  render() {
    const { props } = this;
    const { auth, authAlertClose, user, userAlertClose } = props;
    const { alert: authAlert } = auth;
    const { alert: userAlert } = user;

    return (
      <div className="login-page">
        {authAlert.display && (
          <Alert className="mb-3" alertClose={authAlertClose} {...authAlert} />
        )}

        {userAlert.display && (
          <Alert className="mb-3" alertClose={userAlertClose} {...userAlert} />
        )}

        <p>Login to your account</p>

        <div className="login-page__form">
          <FormAuthLogin {...props} />
        </div>

        <div className="login-page__reset-button">
          <Button to="/reset">Reset Password</Button>
        </div>

        <div className="login-page__new-user">
          <p>Sign Up To Help Contribute to Comrad</p>

          <Button to="/signup" color="primary">
            Sign Up
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, user }) {
  return {
    auth,
    user,
  };
}

export default connect(
  mapStateToProps,
  { authAlertClose, userAlertClose },
)(LoginPage);
