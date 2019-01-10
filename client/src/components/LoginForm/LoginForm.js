import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import { REGEX_ANY_CHARS, REGEX_EMAIL } from '../../utils/validation';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Form from '../../components/Form';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';

class LoginForm extends Component {
  handleCallback = () => {
    const { history } = this.props;
    history.push('/admin');
  };

  render() {
    const { loginUser } = this.props;

    return (
      <Form callback={this.handleCallback} action={loginUser} kw>
        <Alert />
        <p>Login to your account</p>
        <FormGroup>
          <Input
            name="email"
            type="text"
            label="Email"
            validate={REGEX_EMAIL}
            feedback="Please Enter Email Address"
          />
        </FormGroup>

        <FormGroup>
          <Input
            name="password"
            type="password"
            label="Password"
            validate={REGEX_ANY_CHARS}
            feedback="Please Enter Password"
          />
        </FormGroup>

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
