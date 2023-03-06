import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { resourceActions } from '../../../redux/resource';

import Button from '../../Button';
import Input from '../../Input';

class FormResourceEdit extends Component {
  submit = values => {
    const { handleSwitch, resourceActions } = this.props;

    values._id = values._original._id;

    return resourceActions.update({ ...values }, () => {
      handleSwitch('table');
    });
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit, handleSwitch, submitting } = props;

    return (
      <form className="fre" onSubmit={handleSubmit(submit)} autocomplete="off">
        <div className="fre__fields">
          <Field
            className="mb-1-5"
            component={Input}
            label="Description"
            name="description"
            type="text"
          />

          <Field
            className="mb-1-5"
            component={Input}
            label="Link"
            name="link"
            type="text"
          />

          <div className="fre__buttons">
            <Button submitting={submitting} type="submit">
              Save
            </Button>
            <Button
              color="danger"
              onClick={() => handleSwitch('table')}
              submitting={submitting}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

const ReduxFormResourceEdit = reduxForm({
  form: 'resourceEdit',
})(FormResourceEdit);

function mapStateToProps(state, ownProps) {
  return {
    initialValues: ownProps.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resourceActions: bindActionCreators({ ...resourceActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormResourceEdit);
