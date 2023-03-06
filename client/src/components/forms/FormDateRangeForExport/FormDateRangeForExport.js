import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { requiredValidate } from '../../../utils/validation';

import Button from '../../Button';
import { DatePicker__React } from '../../DatePicker';
import DropdownUnderwriter from '../../DropdownUnderwriter';

class FormDateRangeForExport extends Component {
  submit = values => {
    const { submitCallback } = this.props;
    if (typeof submitCallback === 'function') {
      submitCallback(values);
    }
  };

  componentWillUnmount() {
    this.props.clearFields();
  }

  render() {
    const { submit } = this;
    const {
      handleSubmit,
      requireFromDate = true,
      requireToDate = true,
      withUnderwriterName = false,
    } = this.props;

    return (
      <form
        autocomplete="off"
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
        {withUnderwriterName && (
          <Field
            component={DropdownUnderwriter}
            className="mb-1-5"
            label="Underwriter Nmae"
            name="underwriter"
          />
        )}
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
