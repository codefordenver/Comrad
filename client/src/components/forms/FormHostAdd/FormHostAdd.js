import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  emailValidate,
  passwordConfirmValidate,
  requiredValidate,
} from '../../../utils/validation';
import { userActions } from '../../../redux/user';

import Button from '../../Button';
import Input from '../../Input';

class FormHostAdd extends Component {
  submit = (values, dispatch, props) => {
    const { userActions, submitCallback } = this.props;
    userActions.add(values, submitCallback, true);
  };

  render() {
    const { props, submit } = this;
    const { cancelCallback, handleSubmit } = props;

    return (
      <div>
        <form className="form-host-add" onSubmit={handleSubmit(submit)}>
          <Field
            className="mb-3"
            component={Input}
            label="First Name"
            name="first_name"
            autoFocus
            validate={requiredValidate}
          />

          <Field
            className="mb-3"
            component={Input}
            label="Last Name"
            name="last_name"
            validate={requiredValidate}
          />
          <Field
            className="mb-3"
            component={Input}
            label="On-Air Name (optional)"
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
            autoComplete="new-password"
            validate={requiredValidate}
          />

          <Field
            className="mb-3"
            component={Input}
            label="Confirm Password"
            name="confirm_password"
            type="password"
            autoComplete="new-password"
            validate={[requiredValidate, passwordConfirmValidate]}
          />

          <div className="form-host-add__buttons">
            <Button type="submit">Submit</Button>
            <Button color="neutral" onClick={cancelCallback}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const ReduxFormHostAdd = reduxForm({
  form: 'hostAdd',
})(FormHostAdd);

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators({ ...userActions }, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(ReduxFormHostAdd);
