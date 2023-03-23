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

class FormHostGroupAdd extends Component {
  state = {
    hostsSelectedInDropdown: [],
  };

  submit = (values, dispatch, props) => {
    const { hostGroupActions, submitCallback } = this.props;
    hostGroupActions.add(
      values,
      function(value) {
        hostGroupActions.clear();
        submitCallback(value);
      },
      true,
    );
  };

  useExistingHostGroup = hostGroup => {
    const { submitCallback, hostGroupActions } = this.props;
    hostGroupActions.clear();
    submitCallback(hostGroup);
  };

  handleHostSelect = (host, index) => {
    let { hostsSelectedInDropdown } = this.state;
    const { hostGroupActions } = this.props;
    hostsSelectedInDropdown[index] = host;
    this.setState({
      hostsSelectedInDropdown: hostsSelectedInDropdown,
    });
    hostGroupActions.findByHosts(hostsSelectedInDropdown);
  };

  renderUsers = ({ fields, meta: { error, submitFailed } }) => {
    const { hostsSelectedInDropdown } = this.state;
    const { hostGroupActions } = this.props;
    let self = this;
    return (
      <div>
        <ul className="form-host-group-add__host-list">
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
                  hostGroupActions.findByHosts(hostsSelectedInDropdown);
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
    const { props, submit, useExistingHostGroup } = this;
    const { cancelCallback, handleSubmit, hostGroup } = props;

    let existingHostGroups = [];
    hostGroup.docsByHosts.forEach((hg, idx) => {
      existingHostGroups.push(
        <div key={'existing-group-' + idx}>
          <i>{hg.on_air_name}</i>{' '}
          <span
            onClick={function() {
              useExistingHostGroup(hg);
            }}
          >
            Use this group
          </span>
        </div>,
      );
    });

    return (
      <div>
        <form className="form-host-group-add" onSubmit={handleSubmit(submit)} autoComplete="off">
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
          <div>
            {!hostGroup.loadingByHosts && hostGroup.docsByHosts.length > 0 && (
              <div className="form-host-group-add__existing-hosts">
                <div>
                  The following groups already exist with the same set of DJs:
                </div>
                {existingHostGroups}
              </div>
            )}
          </div>
          <div className="form-host-group-add__buttons">
            <Button type="submit" disabled={hostGroup.loadingByHosts}>
              Submit
            </Button>
            <Button color="neutral" onClick={cancelCallback}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const ReduxFormHostGroupAdd = reduxForm({
  form: 'hostGroupAdd',
})(FormHostGroupAdd);

function mapDispatchToProps(dispatch) {
  return {
    hostGroupActions: bindActionCreators({ ...hostGroupActions }, dispatch),
  };
}

function mapStateToProps({ hostGroup }) {
  return { hostGroup };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormHostGroupAdd);
