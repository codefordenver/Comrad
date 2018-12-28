import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userAdd } from '../../actions';
import { REGEX_ANY_CHARS, REGEX_EMAIL } from '../../utils/validation';

import Alert from '../Alert';
import Button from '../Button';
import Form from '../Form';
import FormGroup from '../FormGroup';
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
        <FormGroup>
          <Input name="first_name" type="text" label="First Name" />
        </FormGroup>
        <FormGroup>
          <Input name="last_name" type="text" label="Last Name" />
        </FormGroup>
        <FormGroup>
          <Input
            name="email"
            type="email"
            label="Email Address"
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
        <FormGroup>
          <Input
            name="confirm_password"
            type="password"
            label="Confirm Password"
            validate={REGEX_ANY_CHARS}
            feedback="Please Confirm Password"
          />
        </FormGroup>
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
