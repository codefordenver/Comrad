import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';
import RRule from 'rrule';
import { DatePicker__React } from '../DatePicker';
import { InputLabel } from '../Input';
import { requiredValidate } from '../../utils/validation';

class RepeatDropdown extends Component {
  definedRepeatRules = date => {
    const dateSpelled = moment(date).format('dddd');
    const dateNumber = moment(date).date();

    const dayToRRule = {
      Monday: 'MO',
      Tuesday: 'TU',
      Wednesday: 'WE',
      Thursday: 'TH',
      Friday: 'FR',
      Saturday: 'SA',
      Sunday: 'SU',
    };

    const rules = {
      daily: {
        name: 'Every Day',
        frequency: RRule.DAILY,
      },
      weekdays: {
        name: 'Every Weekday (Mon-Fri)',
        frequency: RRule.WEEKLY,
        byweekday: ['MO', 'TU', 'WE', 'TH', 'FR'],
      },
      weekends: {
        name: 'Weekends (Sat/Sun)',
        frequency: RRule.WEEKLY,
        byweekday: ['SA', 'SU'],
      },
      weekly: {
        name: `Weekly on ${dateSpelled}`,
        frequency: RRule.WEEKLY,
        byweekday: [dayToRRule[dateSpelled]],
      },
      byposition_FirstOfMonth: {
        name: `First ${dateSpelled} of the Month`,
        frequency: RRule.MONTHLY,
        byweekday: [dayToRRule[dateSpelled]],
        bysetpos: 1,
      },
      byposition_LastOfMonth: {
        name: `Last ${dateSpelled} of the Month`,
        frequency: RRule.MONTHLY,
        byweekday: [dayToRRule[dateSpelled]],
        bysetpos: -1,
      },
      byday: {
        name: `On day ${dateNumber} of the month`,
        frequency: RRule.MONTHLY,
        bymonthday: dateNumber,
      },
    };

    return rules;
  };

  render() {
    const { definedRepeatRules, props } = this;
    const { input, date, meta } = props;
    console.log(input);
    const repeatDropdownList = _.map(definedRepeatRules(date), option => {
      return (
        <option key={option.name} value={JSON.stringify(option)}>
          {option.name}
        </option>
      );
    });

    // TODO Componentize the select component
    //https://stackoverflow.com/questions/40075281/how-to-create-custom-dropdown-field-component-with-redux-form-v6
    return (
      <>
        <Field
          className="z-index--200"
          component={DatePicker__React}
          label="Start"
          name="repeat_start_date"
          validate={[requiredValidate]}
          disabled
          controlledDate={date}
        />

        <div className="form-group">
          <Field
            name="repeat_rule"
            component="select"
            className="input"
            validate={[requiredValidate]}
          >
            <option />
            {repeatDropdownList}
          </Field>

          <InputLabel {...meta} dirtyOverride={true}>
            {`Repeat Type`}
          </InputLabel>
        </div>

        <Field
          className="z-index--150"
          component={DatePicker__React}
          label="End"
          name="repeat_end_date"
          placeholderText="Never"
          isClearable={true}
          allowNullDate
        />
      </>
    );
  }
}

export default connect(
  null,
  null,
)(RepeatDropdown);
