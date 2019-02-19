import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import { emailValidate, requiredValidate } from '../../utils/validation.js';
import { authPasswordReset } from '../../actions';

import Alert from '../Alert';
import Button from '../Button';
import Input from '../Input';

class FormPasswordReset extends Component {
  submit = values => {
    const { authPasswordReset } = this.props;
    authPasswordReset(values);
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
          label="Email"
          name="email"
          type="text"
          validate={[requiredValidate, emailValidate]}
        />
        <Button type="submit">Submit</Button>
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

const ReduxFormPasswordReset = reduxForm({
  form: 'passwordReset',
})(FormPasswordReset);

export default connect(
  mapStateToProps,
  { authPasswordReset },
)(ReduxFormPasswordReset);
