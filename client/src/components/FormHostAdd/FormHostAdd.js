import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  emailValidate,
  passwordConfirmValidate,
  requiredValidate,
} from '../../utils/validation';
import { userAlertClose, userCreate } from '../../redux/user';

import Alert from '../Alert';
import Button from '../Button';
import Input from '../Input';

class FormHostAdd extends Component {
  submit = (values, dispatch, props) => {
    const { userAlertClose, userCreate, submitCallback } = this.props;
    userCreate(values, submitCallback);
  };

  render() {
    const { props, submit } = this;
    const { cancelCallback, handleSubmit, user } = props;
    const { alert } = user;

    return (
      <div>
        {alert.display && alert.type !== 'success' && (
          <Alert className="mb-1" alertClose={userAlertClose} {...alert} />
        )}
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
          <div className="form-host-add__buttons">
            <Button color="neutral" onClick={cancelCallback}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    );
  }
}

const ReduxFormHostAdd = reduxForm({
  form: 'hostAdd',
})(FormHostAdd);

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(
  mapStateToProps,
  { userAlertClose, userCreate },
)(ReduxFormHostAdd);
