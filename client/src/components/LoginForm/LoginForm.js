import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import { REGEX_ANY_CHARS, REGEX_EMAIL } from '../../utils/validation';

import Button from '../../components/Button';
import Form from '../../components/Form';
import Input from '../../components/Input';

class LoginForm extends Component {
  handleCallback = () => {
    const { history } = this.props;
    history.push('/admin');
  };

  render() {
    const { loginUser } = this.props;

    return (
      <Form callback={this.handleCallback} action={loginUser}>
        <p>Login to your account</p>
        <Input
          name="email"
          type="text"
          label="Email"
          validate={REGEX_EMAIL}
          feedback="Please Enter Email Address"
        />
        <Input
          name="password"
          type="password"
          label="Password"
          validate={REGEX_ANY_CHARS}
          feedback="Please Enter Password"
        />

        <Button color="primary" type="submit">
          Sign In
        </Button>
      </Form>
    );
  }
}

export default connect(
  null,
  { loginUser },
)(LoginForm);
