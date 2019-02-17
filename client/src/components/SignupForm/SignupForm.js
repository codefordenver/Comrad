import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userAdd } from '../../actions';
// import { REGEX_ANY_CHARS, REGEX_EMAIL } from '../../utils/validation';

import Alert from '../Alert';
import Button from '../Button';
import Form from '../Form';
import Input from '../Input';

class SignupForm extends Component {
  handleCallback = () => {
    console.log('Test');
  };

  render() {
    const { handleCallback, props } = this;
    const { userAdd } = props;

    return (
      <Form callback={handleCallback} action={userAdd}>
        <Alert />
        <p>Enter you Information Below</p>
        <Input name="first_name" type="text" label="First Name" />
        <Input name="last_name" type="text" label="Last Name" />
        <Input
          name="email"
          type="email"
          label="Email Address"
          // validate={REGEX_EMAIL}
          feedback="Please Enter Email Address"
        />
        <Input
          name="password"
          type="password"
          label="Password"
          // validate={REGEX_ANY_CHARS}
          feedback="Please Enter Password"
        />
        <Input
          name="confirm_password"
          type="password"
          label="Confirm Password"
          // validate={REGEX_ANY_CHARS}
          feedback="Please Confirm Password"
        />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default connect(
  null,
  { userAdd },
)(SignupForm);
