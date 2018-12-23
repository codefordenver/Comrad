import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import { REGEX_ANY_CHARS, REGEX_EMAIL } from '../../utils/validation';

import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import Form from '../../components/Form';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';

class LoginForm extends Component {
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = valid => {
    const { email, password } = this.state;
    const { history, loginUser } = this.props;

    if (valid) {
      loginUser({ email, password }, () => {
        history.push('/dashboard');
      });
    }
  };

  handleCallback = () => {
    const { history } = this.props;
    history.push('/admin');
  };

  render() {
    const { auth, loginUser } = this.props;
    const { errorMessage } = auth;

    return (
      <Form callback={this.handleCallback} submit={loginUser}>
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <FormGroup>
          <Input
            name="email"
            type="text"
            feedback="Please Enter Email Address"
            label="Email  "
            validate={REGEX_EMAIL}
            data-validate="true"
          />
        </FormGroup>

        <FormGroup>
          <Input
            name="password"
            onChange={this.handleInputChange}
            type="password"
            feedback="Please Enter Password"
            label="Password"
            validate={REGEX_ANY_CHARS}
          />
        </FormGroup>

        <Button color="primary" type="submit">
          Sign In
        </Button>
        <Button color="primary" type="button">
          Reset Password
        </Button>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(
  mapStateToProps,
  { loginUser },
)(LoginForm);
