import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  passwordsMatchValidate,
  requiredValidate,
} from '../../../utils/validation';
import Button from '../../Button';
import Input from '../../Input';
import { bindActionCreators } from 'redux';
import { authActions } from '../../../redux';

class FormPasswordChange extends Component {
  submit = values => {
    return authActions.passwordNew({ ...values });
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;

    return (
      <form className="form-password-change">
        <Field
          component={Input}
          label="New Password"
          name="new_password"
          type="password"
          autoFocus
          validate={requiredValidate}
        />
        <Field
          component={Input}
          label="Confirm Password"
          name="confirm_password"
          type="password"
          autoFocus
          validate={[passwordsMatchValidate, requiredValidate]}
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    authState: auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators({ ...authActions }, dispatch),
  };
}

const ReduxFormPasswordChange = reduxForm({
  form: 'passwordChange',
})(FormPasswordChange);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormPasswordChange);
