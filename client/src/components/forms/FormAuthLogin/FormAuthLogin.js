import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { authActions } from '../../../redux/auth';
import { emailValidate, requiredValidate } from '../../../utils/validation.js';

import Button from '../../Button';
import Input from '../../Input';

class FormAuthLogin extends Component {
  submit = values => {
    const { authActions, history } = this.props;

    return authActions.login(values, () => {
      history.push('/dashboard');
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

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators({ ...authActions }, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(ReduxFormAuthLogin);
