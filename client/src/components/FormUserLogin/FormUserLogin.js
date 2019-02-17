import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { authLogin } from '../../actions';
import { emailValidate, requiredValidate } from '../../utils/validation.js';

import Button from '../Button';
import Input from '../Input';

class FormUserLogin extends Component {
  submit = values => {
    const { authLogin, history } = this.props;
    authLogin(values, () => {
      history.push('/admin');
    });
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;

    return (
      <form onSubmit={handleSubmit(submit)}>
        <p>Login to your account</p>
        <Field
          className="mb-3"
          component={Input}
          label="Email"
          name="email"
          type="text"
          validate={[requiredValidate, emailValidate]}
        />
        <Field
          className="mb-3"
          component={Input}
          label="Password"
          name="password"
          type="password"
          validate={requiredValidate}
        />
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}

const ReduxFormUserLogin = reduxForm({
  form: 'userLogin',
})(FormUserLogin);

export default connect(
  null,
  { authLogin },
)(ReduxFormUserLogin);
