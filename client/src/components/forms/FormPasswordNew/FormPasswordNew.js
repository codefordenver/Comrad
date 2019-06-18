import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';

import {
  passwordsMatchValidate,
  requiredValidate,
} from '../../../utils/validation';
import { authActions } from '../../../redux';
import queryString from 'query-string';

import Button from '../../Button';
import Input from '../../Input';

class FormPasswordNew extends Component {
  componentDidMount() {
    const { location, history } = this.props;

    if (!location || !queryString.parse(location.search).rt) {
      history.push('/');
    }
  }

  submit = values => {
    const { authActions, history, location } = this.props;

    const resetToken = queryString.parse(location.search).rt;

    return authActions.passwordNew({ resetToken, ...values }, () => {
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
          label="New Password"
          name="passNew"
          type="password"
          validate={requiredValidate}
        />

        <Field
          className="mb-3"
          component={Input}
          label="Confirm"
          name="passConfirm"
          type="password"
          validate={[requiredValidate, passwordsMatchValidate]}
        />

        <Button type="submit">Change Password</Button>
      </form>
    );
  }
}

const ReduxFormPasswordNew = reduxForm({
  form: 'passwordNew',
})(FormPasswordNew);

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
)(ReduxFormPasswordNew);
