import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Button from '../../Button';
import Input from '../../Input';

import { permissionActions } from '../../../redux/permission';
import { userActions } from '../../../redux/user';

class FormUserAdd extends Component {
  componentDidMount() {
    const { permissionActions } = this.props;
    permissionActions.findAll();
  }

  submit = values => {
    const { history, userActions } = this.props;
    userActions.add(values, () => {
      history.push('/user/search');
    });
  };

  renderPermissionOptions() {
    const { permissionState } = this.props;

    return (
      <>
        {permissionState.docs.map(item => (
          <option key={item._id} id={item._id} value={item.value}>
            {item.text}
          </option>
        ))}
      </>
    );
  }

  render() {
    const { props, submit } = this;
    const { handleSubmit, permissionState } = props;

    return (
      <form className="fua" onSubmit={handleSubmit(submit)}>
        <h3 className="fua__headers mb-2">Contact Info</h3>
        <div className="fua__contact-info">
          <Field
            className="mb-2"
            component={Input}
            label="First Name"
            name="first_name"
            type="text"
          />

          <Field
            className="mb-2"
            component={Input}
            label="Last Name"
            name="last_name"
            type="text"
          />

          <Field
            className="mb-2"
            component={Input}
            label="Email Address"
            name="email"
            type="text"
          />

          <Field
            className="mb-2"
            component="select"
            name="permission"
            label="Permission"
            type="select"
          >
            <option />
            {permissionState.loading ? null : this.renderPermissionOptions()}
          </Field>
        </div>

        <h3 className="fua__headers mb-2">Password</h3>

        <div className="fua__password">
          <Field
            className="mb-2"
            component={Input}
            label="Password"
            name="password"
            type="password"
          />

          <Field
            className="mb-2"
            component={Input}
            label="Confirm Password"
            name="confirm_password"
            type="password"
          />
        </div>

        <Button className="btn btn-primary" type="submit">
          Submit
        </Button>
      </form>
    );
  }
}

const ReduxFormUserAdd = reduxForm({
  form: 'userAdd',
})(FormUserAdd);

function mapStateToProps(state) {
  return {
    permissionState: state.permission,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    permissionActions: bindActionCreators({ ...permissionActions }, dispatch),
    userActions: bindActionCreators({ ...userActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormUserAdd);
