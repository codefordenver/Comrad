import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';

import Button from '../../Button';
import ButtonIcon from '../../ButtonIcon';
import Card, { CardBody } from '../../Card';
import Input from '../../Input';
import Select from '../../Select';
import TextArea from '../../TextArea';

import { userActions } from '../../../redux/user';

import {
  emailValidate,
  requiredValidate,
  passwordConfirmValidate,
} from '../../../utils/validation';

class FormUser extends Component {
  renderRoles = ({ fields, meta: { error, submitFailed } }) => {
    return (
      <div className="mb-1-5">
        <ul className="form-user__role-list">
          <li>
            <h3>Roles</h3>
            <ButtonIcon
              icon="plus"
              type="button"
              onClick={e => {
                e.preventDefault();
                fields.push('');
              }}
            />
          </li>
          {fields.map((fieldName, index) => (
            <li key={'field_' + index}>
              <Field
                name={`${fieldName}`}
                component={Select}
                label="Role"
                validate={[requiredValidate]}
                selectOptions={[
                  'Admin',
                  'Full Access',
                  'Show Captain',
                  'DJ',
                  'Underwriting',
                  'Music Library Admin',
                ]}
              />
              {index >= 1 && ( // don't allow deleting the first item
                <ButtonIcon
                  icon="cancel"
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    fields.remove(index);
                  }}
                />
              )}
            </li>
          ))}
        </ul>
        {submitFailed && error && <span>{error}</span>}
      </div>
    );
  };

  render() {
    const { props } = this;
    const { auth, handleSubmit, submitCallback, goBackCallback, mode } = props;

    let isAdmin =
      auth.doc.roles != null && auth.doc.roles.indexOf('Admin') !== -1;

    return (
      <Card>
        <CardBody>
          <form className="form-user" onSubmit={handleSubmit(submitCallback)} autoComplete="off">
            <h3 className="form-user__headers mb-1-5">Contact Info</h3>
            <div className="form-user__contact-info">
              <Field
                className="mb-1-5"
                component={Input}
                label="First Name"
                name="first_name"
                type="text"
                validate={[requiredValidate]}
              />

              <Field
                className="mb-1-5"
                component={Input}
                label="Last Name"
                name="last_name"
                type="text"
                validate={[requiredValidate]}
              />

              <Field
                className="mb-1-5"
                component={Input}
                label="Email Address"
                name="email"
                data-lpignore="true"
                autoComplete="off"
                type="text"
                validate={[emailValidate, requiredValidate]}
              />

              <Field
                className="mb-1-5"
                component={Input}
                label="On-Air Name"
                name="on_air_name"
                type="text"
              />

              <Field
                className="mb-1-5"
                component={TextArea}
                label="Bio"
                name="bio"
              />

              {isAdmin && (<>
                <div>{/* blank table cell */}</div>
                <FieldArray name="roles" component={this.renderRoles} />
              </>)}

              {isAdmin && (
                <Field
                  className="mb-1-5"
                  component={Select}
                  selectOptions={['Active', 'Inactive']}
                  hasBlankOption={false}
                  label="Status"
                  name="status"
                />
              )}
            </div>

            {isAdmin && (
              <div>
                <h3 className="form-user__headers mb-1-5">
                  {mode === 'add' ? 'Password' : 'Change Password'}
                </h3>

                <div className="form-user__password">
                  <Field
                    className="mb-1-5"
                    component={Input}
                    label="Password"
                    name="password"
                    type="password"
                    data-lpignore="true"
                    autoComplete="new-password"
                    validate={
                      mode === 'add'
                        ? [requiredValidate, passwordConfirmValidate]
                        : [passwordConfirmValidate]
                    }
                  />

                  <Field
                    className="mb-1-5"
                    component={Input}
                    label="Confirm Password"
                    name="confirm_password"
                    data-lpignore="true"
                    autoComplete="new-password"
                    type="password"
                    validate={
                      mode === 'add'
                        ? [requiredValidate, passwordConfirmValidate]
                        : [passwordConfirmValidate]
                    }
                  />
                </div>
              </div>
            )}

            <Button className="btn btn-primary mr-1" type="submit">
              Submit
            </Button>
            <Button color="danger" onClick={goBackCallback}>
              Go Back
            </Button>
          </form>
        </CardBody>
      </Card>
    );
  }
}

const ReduxFormUser = reduxForm({
  form: 'userAddEdit',
})(FormUser);

function mapStateToProps(state, ownProps) {
  return {
    auth: state.auth,
    permissionState: state.permission,
    initialValues:
      ownProps.initialValues != null
        ? ownProps.initialValues
        : { roles: [''], status: 'Active' }, // have an array with one value for roles, so there's at least one role required
    mode: ownProps.initialValues != null ? 'edit' : 'add',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators({ ...userActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxFormUser);
