import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import {
  passwordsMatchValidate,
  requiredValidate,
} from '../../utils/validation';
import { authPasswordNew } from '../../actions';
import queryString from 'query-string';

import Alert from '../Alert';
import Button from '../Button';
import Input from '../Input';

class FormPasswordNew extends Component {
  componentDidMount() {
    const { location, history } = this.props;
    const { search } = location;

    if (!location || !queryString.parse(search).rt) {
      history.push('/');
    }
  }

  submit = values => {
    const { authPasswordNew, history, location } = this.props;
    const { search } = location;

    const resetToken = queryString.parse(search).rt;

    authPasswordNew({ resetToken, ...values }, () => {
      history.push('/');
    });
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
          name="passwordNew"
          type="password"
          validate={requiredValidate}
        />
        <Field
          className="mb-3"
          component={Input}
          label="Confirm"
          name="passwordConfirm"
          type="password"
          validate={[requiredValidate, passwordsMatchValidate]}
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
