import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { resourceActions } from '../../../redux/resource';

import Button from '../../Button';
import Input from '../../Input';

class FormResourceAdd extends Component {
  submit = values => {
    const { category, handleSwitch, resourceActions } = this.props;

    return resourceActions.add({ category, ...values }, () => {
      handleSwitch('table');
    });
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit, handleSwitch, submitting } = props;

    return (
      <form className="fra" onSubmit={handleSubmit(submit)} autoComplete="off">
        <div className="fra__fields">
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

          <div className="fra__buttons">
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

const ReduxFormResourceAdd = reduxForm({
  form: 'resourceAdd',
})(FormResourceAdd);

function mapDispatchToProps(dispatch) {
  return {
    resourceActions: bindActionCreators({ ...resourceActions }, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(ReduxFormResourceAdd);
