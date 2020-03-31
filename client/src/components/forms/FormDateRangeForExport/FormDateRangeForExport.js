import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { requiredValidate } from '../../../utils/validation';

import Button from '../../Button';
import { DatePicker__React } from '../../DatePicker';

class FormDateRangeForExport extends Component {
  submit = values => {
    const { submitCallback } = this.props;
    if (typeof submitCallback === 'function') {
      submitCallback(values);
    }
  };

  render() {
    const { submit } = this;
    const {
      handleSubmit,
      requireFromDate = true,
      requireToDate = true,
    } = this.props;

    return (
      <form
        className="form-date-range-for-export"
        onSubmit={handleSubmit(submit)}
      >
        <Field
          component={DatePicker__React}
          className="mb-1-5"
          label="From"
          name="from"
          validate={requireFromDate ? requiredValidate : null}
          dateFormat="MM/dd/yyyy"
        />
        <Field
          component={DatePicker__React}
          className="mb-1-5"
          label="To"
          name="to"
          validate={requireToDate ? requiredValidate : null}
          dateFormat="MM/dd/yyyy"
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    );
  }
}

const ReduxFormDateRangeForExport = reduxForm({
  form: 'dateRangeForExport',
})(FormDateRangeForExport);

function mapStateToProps(state, ownProps) {
  return {
    initialValues: ownProps.initialValues,
  };
}

export default connect(
  mapStateToProps,
  null,
)(ReduxFormDateRangeForExport);
