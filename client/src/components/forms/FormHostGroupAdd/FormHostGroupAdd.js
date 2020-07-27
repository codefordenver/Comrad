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
import Loading from '../../Loading';

class FormHostGroupAdd extends Component {
  state = {
    hostsSelectedInDropdown: [],
  };

  submit = (values, dispatch, props) => {
    const { hostGroupActions, submitCallback } = this.props;
    console.log(values);
    hostGroupActions.add(values, submitCallback, true);
  };

  handleHostSelect = host => {
    let { hostsSelectedInDropdown } = this.state;
    const { hostGroupActions } = this.props;
    hostsSelectedInDropdown.push(host);
    this.setState({
      hostsSelectedInDropdown: hostsSelectedInDropdown,
    });
    hostGroupActions.findByHosts(hostsSelectedInDropdown);
  };

  renderUsers = ({ fields, meta: { error, submitFailed } }) => {
    const { hostsSelectedInDropdown } = this.state;
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
                fields.push({});
                hostGroupActions.findByHosts(fields);
              }}
            />
          </li>
          {fields.map((fieldName, index) => (
            <li key={'field_' + index}>
              <Field
                name={`${fieldName}`}
                type="text"
                component={DropdownHost}
                hostFieldClass={false}
                onHostSelect={this.handleHostSelect}
                showAddNewHostOption={false}
                showNewGroupOfHostsOption={false}
                label="Host"
                host={
                  hostsSelectedInDropdown.filter(
                    obj => obj._id === fields.get(index),
                  )[0]
                }
              />
              <ButtonIcon
                icon="cancel"
                type="button"
                onClick={e => {
                  e.preventDefault();
                  fields.remove(index);
                  hostGroupActions.findByHosts(fields);
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
    const { cancelCallback, handleSubmit, hostGroup } = props;

    let existingHostGroups = [];
    hostGroup.docsByHosts.forEach(hg => {
      existingHostGroups.push(<div>{hg.on_air_name}</div>);
    });

    return (
      <div>
        <form className="form-host-group-add" onSubmit={handleSubmit(submit)}>
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
          <div>Existing host groups that already use these:</div>
          <div>
            {hostGroup.loadingByHosts && <Loading displayMode="static" />}
            {!hostGroup.loadingByHosts && hostGroup.docsByHosts.length > 0 && (
              <>{existingHostGroups}</>
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
