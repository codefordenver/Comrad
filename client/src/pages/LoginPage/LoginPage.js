import React, { Component, Fragment } from 'react';
import logo from '../../images/kgnu_logo.png';

import Button from '../../components/Button';
import LoginForm from '../../components/LoginForm';
import ResetForm from '../../components/ResetForm';
import SignupForm from '../../components/SignupForm';

class LoginPage extends Component {
  state = {
    display: 'login',
  };

  handleDisplayAction = display => {
    this.setState({
      display,
    });
  };

  renderLoginForm() {
    return (
      <Fragment>
        <p>Login to your account</p>
        <div className="login__form">
          <LoginForm {...this.props} />
        </div>
        <div className="login__reset">
          <Button
            onClick={() => this.handleDisplayAction('reset')}
            color="link"
          >
            Reset Password
          </Button>
        </div>
        <div className="login__new-user">
          <p>
            <b>New to Comrad?</b>
          </p>
          <p>Sign Up for your free account!</p>

          <Button
            onClick={() => this.handleDisplayAction('signup')}
            color="primary"
          >
            Sign Up
          </Button>
        </div>
      </Fragment>
    );
  }

  renderResetForm() {
    return (
      <Fragment>
        <p>Enter Your Email Address</p>
        <div className="login__form">
          <ResetForm />
        </div>
        <div className="login__go-back">
          <Button
            onClick={() => this.handleDisplayAction('login')}
            color="link"
          >
            Go Back
          </Button>
        </div>
      </Fragment>
    );
  }

  renderSignupForm() {
    return (
      <Fragment>
        <p>Enter Information</p>
        <div className="login__form">
          <SignupForm />
        </div>
        <div className="login__go-back">
          <Button
            onClick={() => this.handleDisplayAction('login')}
            color="link"
          >
            Go Back
          </Button>
        </div>
      </Fragment>
    );
  }

  renderDisplay() {
    const { display } = this.state;

    switch (display) {
      case 'login':
        return this.renderLoginForm();
      case 'reset':
        return this.renderResetForm();
      case 'signup':
        return this.renderSignupForm();
      default:
        break;
    }
  }

  render() {
    return (
      <main className="login">
        <section className="login__left" />
        <section className="login__right">
          <div className="login__logos">
            <img className="login__kgnu" src={logo} alt="KGNU" />
          </div>
          {this.renderDisplay()}
        </section>
      </main>
    );
  }
}

export default LoginPage;
