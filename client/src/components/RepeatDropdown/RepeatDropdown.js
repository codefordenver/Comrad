import React, {useEffect, useState, useMemo} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Field, change, getFormValues } from 'redux-form';
import moment from 'moment';
import RRule from 'rrule';
import { DatePicker__React } from '../DatePicker';
import Checkbox from "../Checkbox";
import Input from "../Input";
import Select from '../Select';
import { requiredValidate, integerValidate } from '../../utils/validation';

const RepeatDropdown = ({ dateUtc, disabled = true, formSelectorName, initialValues }) => {

  const formValues = useSelector(state => getFormValues(formSelectorName)(state)); // https://github.com/redux-form/redux-form/issues/4700
  
  const [customWeeklyRepeatMapping, setCustomWeeklyRepeatMapping] = useState({
    "SU": "repeat_rule_custom_weekly_sunday",
    "MO": "repeat_rule_custom_weekly_monday",
    "TU": "repeat_rule_custom_weekly_tuesday",
    "WE": "repeat_rule_custom_weekly_wedensday",
    "TH": "repeat_rule_custom_weekly_thursday",
    "FR": "repeat_rule_custom_weekly_friday",
    "SA": "repeat_rule_custom_weekly_saturday",
  });
  const weekdaysMap = {
    "repeat_rule_custom_weekly_sunday": "SU",
    "repeat_rule_custom_weekly_monday": "MO",
    "repeat_rule_custom_weekly_tuesday": "TU",
    "repeat_rule_custom_weekly_wedensday": "WE",
    "repeat_rule_custom_weekly_thursday": "TH",
    "repeat_rule_custom_weekly_friday": "FR",
    "repeat_rule_custom_weekly_saturday": "SA", 
  };

  const repeatRuleDropdownValueJson = useMemo( () => {
    if (!formValues['repeat_rule_dropdown_value']) {
      return null;
    } else {
      return JSON.parse(formValues['repeat_rule_dropdown_value']);
    }
  }, [formValues]);

  const dispatch = useDispatch();

  const definedRepeatRules = useMemo(() => {
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

    // START: account for shifting RRule definitions of the index to account for mismatches between
    // user time zone and UTC
    const dayToDayOfWeekIndex = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 7,
    };
    let shiftToUtc = dayToDayOfWeekIndex[dateSpelledUtc] - dayToDayOfWeekIndex[dateSpelledUserTimezone];
    const getUtcRRuleValueFromUserTimezoneValue = (rruleValue) => {
      // Sunday 7pm for user, Monday UTC = -6 // User SUNDAY, shift -6 for Monday
      // Sunday 1am for user, Saturday UTC = -1 // User SUNDAY, shift -1 for Saturday
      // Monday 1am for user, Sunday UTC = 6 // User MONDAY, shift +6 for Sunday
      // Sunday +6 shift is 13. 13 % 7 = 6
      // Tuesday -5 shift is -3. if negative, add 7 until it's positive.

      // convert rruleValue to its index for dayToDayOfWeekIndex
      let originalWeekdayName = Object.keys(dayToRRule).find(key => dayToRRule[key] == rruleValue);
      let dayIndex = dayToDayOfWeekIndex[originalWeekdayName];
      let shiftedDayIndex = dayIndex + shiftToUtc;

      while (shiftedDayIndex < 1) {
        shiftedDayIndex = shiftedDayIndex + 7;
      }
      if (shiftedDayIndex > 7) {
        shiftedDayIndex = shiftedDayIndex % 7;
      }

      let newWeekdayName = Object.keys(dayToDayOfWeekIndex).find(key => dayToDayOfWeekIndex[key] == shiftedDayIndex);
      let newRruleValue = dayToRRule[newWeekdayName];
      
      // console.log('getUtcRRuleValueFromUserTimezoneValue input and results:', rruleValue, shiftToUtc, shiftedDayIndex, newRruleValue);

      return newRruleValue;

    };
    // END: account for shifting RRule definitions of the index to account for mismatches between
    // user time zone and UTC

    
    
    const getFieldNameForCustomWeeklyRepeat = (day) => {
      let newDay = getUtcRRuleValueFromUserTimezoneValue(day);
      return Object.keys(weekdaysMap).find(key => weekdaysMap[key] == newDay);
    };
    setCustomWeeklyRepeatMapping({
      "SU": getFieldNameForCustomWeeklyRepeat("SU"),
      "MO": getFieldNameForCustomWeeklyRepeat("MO"),
      "TU": getFieldNameForCustomWeeklyRepeat("TU"),
      "WE": getFieldNameForCustomWeeklyRepeat("WE"),
      "TH": getFieldNameForCustomWeeklyRepeat("TH"),
      "FR": getFieldNameForCustomWeeklyRepeat("FR"),
      "SA": getFieldNameForCustomWeeklyRepeat("SA"),
    });
    
    // determine what week of the month it is, eg, Fifth Monday of the month
    let weeklyPositionFromStartOfMonth = 0;
    let testDate = new Date(dateUtc);
    while (testDate.getMonth() == new Date(dateUtc).getMonth()) {
      testDate.setDate(testDate.getDate() - 7);
      weeklyPositionFromStartOfMonth++;
    }
    const startOfMonthLanguage = {
      1: "First",
      2: "Second",
      3: "Third",
      4: "Fourth",
      5: "Fifth"
    };

    // if we are doing a repeat rule as "First Wednesday of month", we need to find that based on the DAY of the month 
    // to account for UTC issues. Sometimes the first Wednesdya in MDT is actually the last Tuesday in UTC.
    // But, just to complicate matters more: this is ONLY for days that are different in UTC than the user's time zone

    let startOfMonthCalculation = {
        name: `${startOfMonthLanguage[weeklyPositionFromStartOfMonth]} ${dateSpelledUserTimezone} of the Month`,
    };

    if (dateSpelledUserTimezone == dateSpelledUtc || weeklyPositionFromStartOfMonth !== 1) {
      startOfMonthCalculation['frequency'] = RRule.MONTHLY;
      startOfMonthCalculation['byweekday'] = [dayToRRule[dateSpelledUtc]];
      startOfMonthCalculation['bysetpos'] = weeklyPositionFromStartOfMonth;
    } else {
      startOfMonthCalculation['frequency'] = RRule.WEEKLY;
      startOfMonthCalculation['byweekday'] = [dayToRRule[dateSpelledUtc]];
      startOfMonthCalculation['bymonthday'] = [-1,1,2,3,4,5,6];
    }

    // determine what week of hte month it is relative to end of month, eg, Third from last Monday of month
    let weeklyPositionFromEndOfMonth = 0;
    testDate = new Date(dateUtc);
    while (testDate.getMonth() == new Date(dateUtc).getMonth()) {
      testDate.setDate(testDate.getDate() + 7);
      weeklyPositionFromEndOfMonth++;
    }
    const endOfMonthLanguage = {
      1: "Last",
      2: "Second to Last",
      3: "Third to Last",
      4: "Fourth to Last",
      5: "Fifth to Last"
    };

    // if we are doing a repeat rule as "Last Wednesday of month", we need to find that based on the DAY of the month 
    // to account for UTC issues. The last Wednesday of May 2023 at 10pm MDT, for example, is actually the first Thursday
    // of June 2023 in UTC. So we can't just look for "last Wednesday in a month" because it won't calculate everything
    // But, just to complicate matters more: this is ONLY for days that are different in UTC than the user's time zone

    let endOfMonthCalculation = {name: `${endOfMonthLanguage[weeklyPositionFromEndOfMonth]} ${dateSpelledUserTimezone} of the Month`,};
    if (dateSpelledUserTimezone == dateSpelledUtc || weeklyPositionFromEndOfMonth != 1) {
      endOfMonthCalculation['frequency'] = RRule.MONTHLY;
      endOfMonthCalculation['byweekday'] = [dayToRRule[dateSpelledUtc]];
      endOfMonthCalculation['bysetpos'] = weeklyPositionFromEndOfMonth * -1;
    } else {
      endOfMonthCalculation['frequency'] = RRule.WEEKLY;
      endOfMonthCalculation['byweekday'] = [dayToRRule[dateSpelledUtc]];
      endOfMonthCalculation['bymonthday'] = [1,-1,-2,-3,-4,-5,-6];
    }

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
        byweekday: [
          getUtcRRuleValueFromUserTimezoneValue('MO'), 
          getUtcRRuleValueFromUserTimezoneValue('TU'), 
          getUtcRRuleValueFromUserTimezoneValue('WE'), 
          getUtcRRuleValueFromUserTimezoneValue('TH'), 
          getUtcRRuleValueFromUserTimezoneValue('FR')],
      },
      weekends: {
        name: 'Weekends (Sat/Sun)',
        frequency: RRule.WEEKLY,
        byweekday: [
          getUtcRRuleValueFromUserTimezoneValue('SA'), 
          getUtcRRuleValueFromUserTimezoneValue('SU')],
      },
      weekly: {
        name: `Weekly on ${dateSpelledUserTimezone}`,
        frequency: RRule.WEEKLY,
        byweekday: [dayToRRule[dateSpelledUtc]],
      },
      byposition_FromBeginningOfMonth: startOfMonthCalculation,
      byposition_FromEndOfMonth: endOfMonthCalculation,
      byday: {
        name: `On day ${dateNumberUserTimezone} of the month`,
        frequency: RRule.MONTHLY,
        bymonthday: dateNumberUtc,
      },
      custom: {
        name: `Custom`,
      },
    };

    // console.log('shift to utc:', shiftToUtc);
    // console.log('rules', rules);

    return rules;
  }, [dateUtc]);

  useEffect(() => {
    //configure form based on initial values

    if (initialValues != null && initialValues.repeat_rule != null) {
      let repeatRule = initialValues.repeat_rule;
      let selectedRepeatRule = null;
      Object.keys(definedRepeatRules).forEach(function(k) {
        let i = definedRepeatRules[k];
        if (
          i.frequency === repeatRule.frequency &&
          !repeatRule.interval  &&
          ((typeof i.byweekday !== 'undefined' &&
            repeatRule.byweekday != null &&
            JSON.stringify(i.byweekday.concat().sort()) === // use concact() to make copy of the array so it doesn't affect the rule, otherwise it won't match a value from the dropdown
              JSON.stringify(repeatRule.byweekday.sort())) ||
            (typeof i.byweekday === 'undefined' &&
              (repeatRule.byweekday == null || repeatRule.byweekday.length === 0))) &&
          i.bysetpos == repeatRule.bysetpos && // use == instead of === so that undefined and null match
          (
            JSON.stringify(i.bymonthday) === JSON.stringify(repeatRule.bymonthday)
            ||
            (!i.bymonthday && !repeatRule.bymonthday) // checks for when one is null and the other is undefined
          )
        ) {
          selectedRepeatRule = i;
          dispatch(change(
            formSelectorName,
            'repeat_rule_dropdown_value',
            JSON.stringify(selectedRepeatRule),
          ));
        }
      });
      if (!selectedRepeatRule) {
        selectedRepeatRule = definedRepeatRules['custom'];
        dispatch(change(
            formSelectorName,
            'repeat_rule_dropdown_value',
            JSON.stringify(selectedRepeatRule),
          ));
        dispatch(change(
            formSelectorName,
            'repeat_rule_custom_interval',
            initialValues.repeat_rule.interval ?? 1,
          ));
        dispatch(change(
            formSelectorName,
            'repeat_rule_custom_frequency',
            initialValues.repeat_rule.frequency,
          ));
        
        if (initialValues.repeat_rule.byweekday) {
          Object.keys(weekdaysMap).forEach(key => {
            dispatch(change(
              formSelectorName,
              key,
              initialValues.repeat_rule.byweekday.indexOf(weekdaysMap[key]) !== -1,
            ));
          });
        } else {
          Object.keys(weekdaysMap).forEach(key => {
            dispatch(change(
              formSelectorName,
              key,
              false,
            ));
          });
        }
        if (initialValues.repeat_rule.frequency == RRule.MONTHLY) {
          if (initialValues.repeat_rule.bysetpos != null) {
            dispatch(change(
              formSelectorName,
              'repeat_rule_custom_monthly_option',
              JSON.stringify(definedRepeatRules['byposition_FromBeginningOfMonth'])
            ));
          } else {
            dispatch(change(
              formSelectorName,
              'repeat_rule_custom_monthly_option',
              JSON.stringify(definedRepeatRules['byday'])
            ));
          }
        }

        
      }

      if (
        new Date(repeatRule.repeat_end_date).getFullYear() === 9999 ||
        new Date(repeatRule.repeat_end_date).getFullYear() === 9998
      ) {
        dispatch(change(formSelectorName, 'repeat_rule.repeat_end_date', null));
      }
    }
  }, []);

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
          selectOptions={Object.values(definedRepeatRules).map(option => {
            // Dropdown values are using string of JSON instead of object. Inconclusive whether they can be set as object. See https://github.com/codefordenver/Comrad/issues/492
            return { text: option.name, value: JSON.stringify(option) };
          })}
          hasBlankOption={true}
        ></Field>

        {formValues['repeat_rule_dropdown_value'] != null && repeatRuleDropdownValueJson['name'] == 'Custom' && <>
          <div className="form-group grid-span--2 repeat-dropdown__custom-rule-row">
            <div>
            Repeat every 
            </div>
            <Field
              name="repeat_rule_custom_interval"
              component={Input}
              placeholder="1"
              validate={[requiredValidate, integerValidate]}
              />
            <Field
              name="repeat_rule_custom_frequency"
              component={Select}
              validate={[requiredValidate]}
              selectOptions={[
                  { value: RRule.DAILY, text: "day" },
                  { value: RRule.WEEKLY, text: "week" },
                  { value: RRule.MONTHLY, text: "month" },
                  { value: RRule.YEARLY, text: "year" },
                ]}
              hasBlankOption={false}
            />

          </div>
          {formValues['repeat_rule_custom_frequency'] == RRule.WEEKLY &&
            <div className="repeat-dropdown__container form-group grid-span--2">
              Repeat on:
              <div className="repeat-dropdown__days-of-week">
                <div>
                  <Field
                    name={customWeeklyRepeatMapping["SU"]}
                    component={Checkbox}
                    />
                  <span>Sunday</span>
                </div>
                <div>
                  <Field
                    name={customWeeklyRepeatMapping["MO"]}
                    component={Checkbox}
                    />
                  <span>Monday</span>
                </div>
                <div>
                  <Field
                    name={customWeeklyRepeatMapping["TU"]}
                    component={Checkbox}
                    />
                  <span>Tuesday</span>
                </div>
                <div>
                  <Field
                    name={customWeeklyRepeatMapping["WE"]}
                    component={Checkbox}
                    />
                  <span>Wednesday</span>
                </div>
                <div>
                  <Field
                    name={customWeeklyRepeatMapping["TH"]}
                    component={Checkbox}
                    />
                  <span>Thursday</span>
                </div>
                <div>
                  <Field
                    name={customWeeklyRepeatMapping["FR"]}
                    component={Checkbox}
                    />
                  <span>Friday</span>
                </div>
                <div>
                  <Field
                    name={customWeeklyRepeatMapping["SA"]}
                    component={Checkbox}
                    />
                  <span>Saturday</span>
                </div>
              </div>
            </div>
          }

          {formValues['repeat_rule_custom_frequency'] == RRule.MONTHLY &&
            <div className="repeat-dropdown__container form-group grid-span--2">
              Repeat options:
              <Field
                name="repeat_rule_custom_monthly_option"
                component={Select}
                validate={[requiredValidate]}
                selectOptions={[definedRepeatRules['byposition_FromBeginningOfMonth'], definedRepeatRules['byday']].map(option => {
                  // Dropdown values are using string of JSON instead of object. Inconclusive whether they can be set as object. See https://github.com/codefordenver/Comrad/issues/492
                  return { text: option.name, value: JSON.stringify(option) };
                })}
                hasBlankOption={false}
              ></Field>
            </div>
          }
        </>}

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

};

export default RepeatDropdown;