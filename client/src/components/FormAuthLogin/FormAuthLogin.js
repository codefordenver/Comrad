import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { authAlertClose, authLogin } from '../../redux/auth';
import { emailValidate, requiredValidate } from '../../utils/validation.js';

import Alert from '../Alert';
import Button from '../Button';
import Input from '../Input';

class FormAuthLogin extends Component {
  submit = values => {
    const { authLogin, history } = this.props;

    return authLogin(values, () => {
      history.push('/admin');
    });
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit, submitting } = props;

    return (
      <form onSubmit={handleSubmit(submit)}>
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
        <Button submitting={submitting} type="submit">
          Submit
        </Button>
      </form>
    );
  }
}

const ReduxFormAuthLogin = reduxForm({
  form: 'authLogin',
})(FormAuthLogin);

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(
  mapStateToProps,
  { authAlertClose, authLogin },
)(ReduxFormAuthLogin);
