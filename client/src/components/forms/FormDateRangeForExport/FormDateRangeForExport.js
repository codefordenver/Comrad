import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { requiredValidate } from '../../../utils/validation';

import Button from '../../Button';
import { DatePicker__React } from '../../DatePicker';
import DropdownUnderwriter from '../../DropdownUnderwriter';

const moment = require('moment');

class FormDateRangeForExport extends Component {
  constructor(props) {
    super()
    this.state = {
      from: props.initialValues.from,
      to: props.initialValues.to,
    }
  }
  
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

    const {
      from,
      to,
    } = this.state;

    return (
      <form
        autoComplete="off"
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
          selected={from}
          onChange={(date) => {
            this.setState({
              from: date,
            })
          }}
        />
        <Field
          component={DatePicker__React}
          className="mb-1-5"
          label="To"
          name="to"
          validate={requireToDate ? requiredValidate : null}
          dateFormat="MM/dd/yyyy"
          selected={to}
          onChange={(date) => {
            this.setState({
              to: date,
            })
          }}        
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
  
  let initialValues =
    ownProps.initialValues != null ? ownProps.initialValues : {};
  
  if (ownProps.useInitialDateValues === true) {
    const from = moment().startOf('day').toDate()
    const to = moment().startOf('day').toDate()
    from.setDate(from.getDate() - 30)
    initialValues.from = from;
    initialValues.to = to;
  }

  return {
    initialValues: initialValues,
  };
}

export default connect(
  mapStateToProps,
  null,
)(ReduxFormDateRangeForExport);
