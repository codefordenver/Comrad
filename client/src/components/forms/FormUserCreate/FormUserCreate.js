import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Button from '../../Button';
import Input from '../../Input';

import { userActions } from '../../../redux/user';

class FormUserCreate extends Component {
  submit = values => {
    const { userActions } = this.props;
    userActions.create(values);
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;

    return (
      <form className="fua" onSubmit={handleSubmit(submit)}>
        <h3 className="fua__headers mb-1">Contact Info</h3>
        <Field
          className="mb-1"
          component={Input}
          label="First Name"
          name="first_name"
          type="text"
        />
        <Field
          className="mb-1"
          component={Input}
          label="Last Name"
          name="last_name"
          type="text"
        />
        <Field
          className="mb-1"
          component={Input}
          label="Email Address"
          name="email"
          type="text"
        />

        <h3 className="fua__headers mb-1">Password</h3>

        <Field
          className="mb-1"
          component={Input}
          label="Password"
          name="password"
          type="password"
        />

        <Field
          className="mb-1"
          component={Input}
          label="Confirm Password"
          name="confirm_password"
          type="password"
        />

        <Button className="btn btn-primary" type="submit">
          Submit
        </Button>
      </form>
    );
  }
}

const ReduxFormUserCreate = reduxForm({
  form: 'userCreate',
})(FormUserCreate);

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators({ ...userActions }, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(ReduxFormUserCreate);
