import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { requiredValidate } from '../../../utils/validation';
import { hostGroupActions } from '../../../redux/hostGroup';

import DropdownHost from '../../DropdownHost';
import Button from '../../Button';
import ButtonIcon from '../../ButtonIcon';
import Input from '../../Input';

class FormHostGroupEdit extends Component {
  state = {
    hostsSelectedInDropdown: [],
  };

  submit = (values, dispatch, props) => {
    const { hostGroup, hostGroupActions, submitCallback } = this.props;
    hostGroupActions.update(hostGroup.doc._id, values, function(value) {
      submitCallback(value);
    });
  };

  handleHostSelect = (host, index) => {
    let { hostsSelectedInDropdown } = this.state;
    hostsSelectedInDropdown[index] = host;
    this.setState({
      hostsSelectedInDropdown: hostsSelectedInDropdown,
    });
  };

  renderUsers = ({ fields, meta: { error, submitFailed } }) => {
    const { hostsSelectedInDropdown } = this.state;
    const { hostGroup } = this.props;
    let self = this;
    return (
      <div>
        <ul className="form-host-group-edit__host-list">
          <li>
            <h3>Hosts</h3>
            <ButtonIcon
              icon="plus"
              type="button"
              onClick={e => {
                e.preventDefault();
                hostsSelectedInDropdown.push(null);
                self.setState({ hostsSelectedInDropdown });
                fields.push(null);
              }}
            />
          </li>
          {fields.map((fieldName, index) => (
            <li key={'field_' + index}>
              <Field
                key={'field-' + index + '-' + fields.get(index)}
                name={`${fieldName}`}
                type="text"
                component={DropdownHost}
                hostFieldClass={false}
                onHostSelect={selectedValue =>
                  this.handleHostSelect(selectedValue, index)
                }
                showAddNewHostOption={false}
                showNewGroupOfHostsOption={false}
                label="Host"
                host={
                  hostsSelectedInDropdown.filter(
                    obj => obj != null && obj._id === fields.get(index),
                  )[0] ||
                  hostGroup.doc.users.filter(
                    obj => obj._id === fields.get(index),
                  )[0]
                }
              />
              <ButtonIcon
                icon="cancel"
                type="button"
                onClick={e => {
                  e.preventDefault();
                  hostsSelectedInDropdown.splice(index, 1);
                  self.setState({ hostsSelectedInDropdown });
                  fields.remove(index);
                }}
              />
            </li>
          ))}
        </ul>
        {submitFailed && error && <span className="input__error">{error}</span>}
      </div>
    );
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;

    return (
      <div>
        <form className="form-host-group-edit" onSubmit={handleSubmit(submit)} autocomplete="off">
          <Field
            component={Input}
            label="On-Air Name"
            name="on_air_name"
            autoFocus
            validate={requiredValidate}
          />
          <FieldArray
            name="users"
            component={this.renderUsers}
            validate={requiredValidate}
          />
          <div className="form-host-group-edit__buttons">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    );
  }
}

const ReduxFormHostGroupEdit = reduxForm({
  form: 'hostGroupEdit',
})(FormHostGroupEdit);

function mapDispatchToProps(dispatch) {
  return {
    hostGroupActions: bindActionCreators({ ...hostGroupActions }, dispatch),
  };
}

function mapStateToProps({ hostGroup }) {
  let initialValues = {
    ...hostGroup.doc,
    users: hostGroup.doc.users.map(hg => hg._id),
  };
  return {
    hostGroup,
    initialValues,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormHostGroupEdit);
