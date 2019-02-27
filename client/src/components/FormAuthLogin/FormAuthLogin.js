import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { authLogin } from '../../redux/auth';
import { emailValidate, requiredValidate } from '../../utils/validation.js';

import Alert from '../Alert';
import Button from '../Button';
import Input from '../Input';

class FormAuthLogin extends Component {
  submit = values => {
    const { authLogin, history } = this.props;
    authLogin(values, () => {
      history.push('/admin');
    });
  };

  render() {
    const { props, submit } = this;
    const { auth, handleSubmit } = props;
    const { alert } = auth;
    const { display } = alert;

    return (
      <form onSubmit={handleSubmit(submit)}>
        {display && <Alert {...alert} />}
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

const ReduxFormAuthLogin = reduxForm({
  form: 'authLogin',
})(FormAuthLogin);

function mapStateToProps(state) {
  const auth = state.auth;

  return {
    auth,
  };
}

export default connect(
  mapStateToProps,
  { authLogin },
)(ReduxFormAuthLogin);
