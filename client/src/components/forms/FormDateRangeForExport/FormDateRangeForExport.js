import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { requiredValidate } from '../../../utils/validation';

import Button from '../../Button';
import { DatePicker__React } from '../../DatePicker';
import DropdownUnderwriter from '../../DropdownUnderwriter';

class FormDateRangeForExport extends Component {
  constructor(props) {
    super()
    this.state = {
      // These values are for setting initial values for input dates if page requires it.
      today: '',
      priorDay: '',
      useInitialDateValues: props.useInitialDateValues, // This is passed in from page to determine whether initial date values need to be set in input fields.
    }
  }
  
  submit = values => {
    const { submitCallback } = this.props;
    if (typeof submitCallback === 'function') {
      submitCallback(values);
    }
  };

  componentDidMount() {
    if (this.state.useInitialDateValues) {
      const today = new Date()
      const priorDay = new Date()
      priorDay.setDate(priorDay.getDate() - 30)
      this.setState({
        today: today,
        priorDay: priorDay,
      })
    }
  }

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
      today,
      priorDay,
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
          selected={priorDay}
          onChange={(date) => {
            this.setState({
              priorDay: date,
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
          selected={today}
          onChange={(date) => {
            this.setState({
              today: date,
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
  return {
    initialValues: ownProps.initialValues,
  };
}

export default connect(
  mapStateToProps,
  null,
)(ReduxFormDateRangeForExport);
