import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  emailValidate,
  passwordConfirmValidate,
  requiredValidate,
} from '../../utils/validation';
import { userAdd } from '../../redux/user';

import Button from '../Button';
import Input from '../Input';

class FormHostAdd extends Component {
  submit = (values, dispatch, props) => {
    const { userAdd, submitCallback } = this.props;
    userAdd(values, submitCallback);
  };

  render() {
    const { props, submit } = this;
    const { cancelCallback, handleSubmit } = props;

    return (
      <form className="form-host-add" onSubmit={handleSubmit(submit)}>
        <Field
          component={Input}
          label="First Name"
          name="first_name"
          autoFocus
          validate={requiredValidate}
        />
        <Field
          component={Input}
          label="Last Name"
          name="last_name"
          validate={requiredValidate}
        />
        <Field
          component={Input}
          label="Custom On-Air Name (optional)"
          name="on_air_name"
        />
        <Field
          className="mb-3"
          component={Input}
          label="Email Address"
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
        <Field
          className="mb-3"
          component={Input}
          label="Confirm Password"
          name="confirm_password"
          type="password"
          validate={[requiredValidate, passwordConfirmValidate]}
        />
        <div>
          <Button color="neutral" onClick={cancelCallback}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    );
  }
}

const ReduxFormHostAdd = reduxForm({
  form: 'hostAdd',
})(FormHostAdd);

export default connect(
  null,
  { userAdd },
)(ReduxFormHostAdd);
