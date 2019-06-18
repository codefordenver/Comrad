import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import { emailValidate, requiredValidate } from '../../../utils/validation.js';

import Button from '../../Button';
import Input from '../../Input';

import { authActions } from '../../../redux/auth';

class FormPasswordReset extends Component {
  submit = values => {
    const { authActions, history } = this.props;

    return authActions.passwordReset(values, () => {
      history.push('/');
    });
  };

  render() {
    const { props, submit } = this;
    const { className, handleSubmit } = props;

    return (
      <form className={classnames(className)} onSubmit={handleSubmit(submit)}>
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

const ReduxFormPasswordReset = reduxForm({
  form: 'passwordReset',
})(FormPasswordReset);

function mapStateToProps({ auth }) {
  return {
    authState: auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators({ ...authActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormPasswordReset);
