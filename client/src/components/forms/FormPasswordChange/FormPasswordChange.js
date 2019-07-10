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
    const { authActions } = this.props;
    return authActions.passwordChange({ ...values });
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;

    return (
      <form className="form-password-change" onSubmit={handleSubmit(submit)}>
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
          validate={requiredValidate}
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  const id = state.auth.doc._id;
  return {
    initialValues: {
      _id: id,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators({ ...authActions }, dispatch),
  };
}

const ReduxFormPasswordChange = reduxForm({
  form: 'passwordChange',
})(FormPasswordChange);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormPasswordChange);
