import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/Button';
import FormAuthLogin from '../../components/forms/FormAuthLogin';

class LoginPage extends Component {
  componentDidUpdate() {
    const { auth, history } = this.props;
    if (auth.loggedIn === true) {
      console.log('logged in, redirecting to dashboard');
      history.push('/dashboard');
    }
  }

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

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(
  mapStateToProps,
  null,
)(LoginPage);
