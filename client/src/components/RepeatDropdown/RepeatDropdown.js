import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, change } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';
import RRule from 'rrule';
import { DatePicker__React } from '../DatePicker';
import Select from '../Select';
import { requiredValidate } from '../../utils/validation';

class RepeatDropdown extends Component {
  componentWillMount() {
    const { change, formSelectorName, initialValues } = this.props;
    if (initialValues != null && initialValues.repeat_rule != null) {
      let rules = this.definedRepeatRules(this.props.dateUtc);
      let repeatRule = initialValues.repeat_rule;
      Object.keys(rules).forEach(function(k) {
        let i = rules[k];
        if (
          i.frequency === repeatRule.frequency &&
          ((typeof i.byweekday !== 'undefined' &&
            JSON.stringify(i.byweekday.concat().sort()) === // use concact() to make copy of the array so it doesn't affect the rule, otherwise it won't match a value from the dropdown
              JSON.stringify(repeatRule.byweekday.sort())) ||
            (typeof i.byweekday === 'undefined' &&
              repeatRule.byweekday.length === 0)) &&
          i.bysetpos === repeatRule.bysetpos &&
          JSON.stringify(i.bymonthday) === JSON.stringify(repeatRule.bymonthday)
        ) {
          change(
            formSelectorName,
            'repeat_rule_dropdown_value',
            JSON.stringify(i),
          );
        }
      });
      if (
        new Date(repeatRule.repeat_end_date).getFullYear() === 9999 ||
        new Date(repeatRule.repeat_end_date).getFullYear() === 9998
      ) {
        change(formSelectorName, 'repeat_rule.repeat_end_date', null);
      }
    }
  }

  definedRepeatRules = dateUtc => {
    const dateSpelledUserTimezone = moment(dateUtc).format('dddd');
    const dateNumberUserTimezone = moment(dateUtc).date();

    const dateSpelledUtc = moment(dateUtc)
      .utc()
      .format('dddd');
    const dateNumberUtc = moment(dateUtc)
      .utc()
      .date();

    const dayToRRule = {
      Monday: 'MO',
      Tuesday: 'TU',
      Wednesday: 'WE',
      Thursday: 'TH',
      Friday: 'FR',
      Saturday: 'SA',
      Sunday: 'SU',
    };

    // If you are adding or modifying rules here, you must also modify the corresponding converters
    // to change a repeat_rule value back to a rule in client/src/utils/events.js
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
        name: `Weekly on ${dateSpelledUserTimezone}`,
        frequency: RRule.WEEKLY,
        byweekday: [dayToRRule[dateSpelledUtc]],
      },
      byposition_FirstOfMonth: {
        name: `First ${dateSpelledUserTimezone} of the Month`,
        frequency: RRule.MONTHLY,
        byweekday: [dayToRRule[dateSpelledUtc]],
        bysetpos: 1,
      },
      byposition_LastOfMonth: {
        name: `Last ${dateSpelledUserTimezone} of the Month`,
        frequency: RRule.MONTHLY,
        byweekday: [dayToRRule[dateSpelledUtc]],
        bysetpos: -1,
      },
      byday: {
        name: `On day ${dateNumberUserTimezone} of the month`,
        frequency: RRule.MONTHLY,
        bymonthday: dateNumberUtc,
      },
    };

    return rules;
  };

  render() {
    const { definedRepeatRules, props } = this;
    const { dateUtc, disabled = true } = props;
    const repeatDropdownList = _.map(definedRepeatRules(dateUtc), option => {
      // Dropdown values are using string of JSON instead of object. Inconclusive whether they can be set as object. See https://github.com/codefordenver/Comrad/issues/492
      return { text: option.name, value: JSON.stringify(option) };
    });

    return (
      <>
        <Field
          className="z-index--200"
          component={DatePicker__React}
          label="Start"
          name="repeat_rule.repeat_start_date"
          disabled={disabled}
        />

        <Field
          name="repeat_rule_dropdown_value"
          component={Select}
          label="Repeat Type"
          validate={[requiredValidate]}
          selectOptions={repeatDropdownList}
          hasBlankOption={true}
        ></Field>

        <Field
          className="z-index--150"
          component={DatePicker__React}
          label="End"
          name="repeat_rule.repeat_end_date"
          placeholderText="Never"
          isClearable={true}
          allowNullDate
        />
      </>
    );
  }
}

export default connect(null, { change })(RepeatDropdown);
