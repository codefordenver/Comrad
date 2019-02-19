import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import { requiredValidate } from '../../utils/validation';
import { authPasswordNew } from '../../actions';

import Alert from '../Alert';
import Button from '../Button';
import Input from '../Input';

class FormPasswordNew extends Component {
  submit = values => {
    const { authPasswordNew, match } = this.props;
    const { token } = match.params;
    const { confirmPassword, newPassword } = values;

    authPasswordNew({ confirmPassword, newPassword, token });
  };

  render() {
    const { props, submit } = this;
    const { alert, className, handleSubmit } = props;
    const { display } = alert;

    return (
      <form className={classnames(className)} onSubmit={handleSubmit(submit)}>
        {display && <Alert {...alert} />}
        <Field
          className="mb-3"
          component={Input}
          label="New Password"
          name="newPassword"
          type="password"
          validate={requiredValidate}
        />
        <Field
          className="mb-3"
          component={Input}
          label="Confirm"
          name="confirmPassword"
          type="password"
          validate={requiredValidate}
        />
        <Button type="submit">Change Password</Button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state.auth;

  return {
    alert,
  };
}

const ReduxFormPasswordNew = reduxForm({
  form: 'passwordNew',
})(FormPasswordNew);

export default connect(
  mapStateToProps,
  { authPasswordNew },
)(ReduxFormPasswordNew);
