import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { authActions } from '../../../redux/auth';
import { alertTypes } from '../../../redux/alert';
import { emailValidate, requiredValidate } from '../../../utils/validation.js';

import Button from '../../Button';
import Input from '../../Input';

class FormAuthLogin extends Component {
  componentDidMount() {
    const { location, loginExpired } = this.props;
    let params = new URLSearchParams(location.search);
    if (params.get('reauthenticate') !== null) {
      loginExpired();
    }
  }

  submit = values => {
    const { authActions, history, location } = this.props;

    return authActions.login(values, () => {
      let params = new URLSearchParams(location.search);
      if (params.get('returnUrl')) {
        history.push(params.get('returnUrl'));
      } else {
        history.push('/dashboard');
      }
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
          autoComplete="current-password"
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
    loginExpired: () =>
      dispatch({
        type: alertTypes.ACTIVE,
        payload: {
          header: 'Error',
          body: 'Your session has expired. Please log in again.',
          type: 'danger',
        },
      }),
  };
}

export default connect(null, mapDispatchToProps)(ReduxFormAuthLogin);
