import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';
import RRule from 'rrule';
import { InputLabel } from '../../Input/Input';

class RepeatDropdown extends Component {
  render() {
    const definedRepeatRules = date => {
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
          freq: RRule.DAILY,
        },
        weekdays: {
          name: 'Every Weekday (Mon-Fri)',
          freq: RRule.WEEKLY,
          byweekday: ['MO', 'TU', 'WE', 'TH', 'FR'],
        },
        weekends: {
          name: 'Weekends (Sat/Sun)',
          freq: RRule.WEEKLY,
          byweekday: ['SA', 'SU'],
        },
        weekly: {
          name: `Weekly on ${dateSpelled}`,
          freq: RRule.WEEKLY,
          byweekday: [dayToRRule[dateSpelled]],
        },
        byposition_FirstOfMonth: {
          name: `First ${dateSpelled} of the Month`,
          freq: RRule.MONTHLY,
          byweekday: [dayToRRule[dateSpelled]],
          bysetpos: 1,
        },
        byposition_LastOfMonth: {
          name: `Last ${dateSpelled} of the Month`,
          freq: RRule.MONTHLY,
          byweekday: [dayToRRule[dateSpelled]],
          bysetpos: -1,
        },
        byday: {
          name: `On day ${dateNumber} of the month`,
          freq: RRule.MONTHLY,
          bymonthday: dateNumber,
        },
      };

      return rules;
    };

    const { date, meta, label } = this.props;
    const repeatOptions = definedRepeatRules(date);

    const repeatDropdownList = _.map(repeatOptions, option => {
      return (
        <option key={option.name} value={JSON.stringify(option)}>
          {option.name}
        </option>
      );
    });

    //Componentize the select component
    //https://stackoverflow.com/questions/40075281/how-to-create-custom-dropdown-field-component-with-redux-form-v6
    return (
      <div>
        <div className="form-group">
          <Field name="repeatType" component="select" className="input">
            <option />
            {repeatDropdownList}
          </Field>

          <InputLabel {...meta} dirtyOverride={true}>
            {`Repeat Type`}
          </InputLabel>
        </div>
      </div>
    );
  }
}

const selector = formValueSelector('newShow');
function mapStateToProps(state) {
  const date = selector(state, 'repeat_start_date');
  return {
    date: date,
  };
}

export default connect(
  mapStateToProps,
  {},
)(RepeatDropdown);
