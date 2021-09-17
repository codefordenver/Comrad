import { diff } from 'deep-diff';

export function getDifferencesForEventInstance(originalData, instanceData) {
  let finalObject = {};
  let changes = diff(originalData, instanceData);

  if (changes) {
    changes.forEach(difference => {
      if (difference.kind === 'A') {
        //array
        // we will save the whole array, we don't need to determine the individual paths that were changed because the instance will contain the full array (there won't be a part of it stored on the series)
        let array = instanceData;
        difference.path.forEach(idx => {
          array = array[idx];
        });
        finalObject[difference.path.join('.')] = array;
      } else {
        finalObject[difference.path.join('.')] = difference.rhs;
      }
    });
  }

  return finalObject;
}

export function repeatRuleToDropdownValue(repeatRule) {
  const ruleToDay = {
    MO: 'Monday',
    TU: 'Tuesday',
    WE: 'Wednesday',
    TH: 'Thursday',
    FR: 'Friday',
    SA: 'Saturday',
    SU: 'Sunday',
  };

  switch (repeatRule.frequency) {
    case 3:
      return '{"name":"Every Day","frequency":3}';
    case 2:
      if (
        repeatRule.byweekday.length === 5 &&
        repeatRule.byweekday.sort() === ['FR', 'MO', 'TH', 'TU', 'WE']
      ) {
        return '{"name":"Every Weekday (Mon-Fri)","frequency":2,"byweekday":["MO","TU","WE","TH","FR"]}';
      } else if (
        repeatRule.byweekday.length === 2 &&
        repeatRule.byweekday.sort() === ['SA', 'SU']
      ) {
        return '{"name":"Weekends (Sat/Sun)","frequency":2,"byweekday":["SA","SU"]}';
      } else if (repeatRule.byweekday.length === 1) {
        let day = repeatRule.byweekday[0];
        return (
          '{"name":"Weekly on ' +
          ruleToDay[day] +
          '","frequency":2,"byweekday":["' +
          day +
          '"]}'
        );
      }
      break;
    case 1:
      if (
        repeatRule.bysetpos === 1 &&
        repeatRule.frequency === 1 &&
        repeatRule.byweekday.length === 1
      ) {
        return (
          '{"name":"First ' +
          ruleToDay[repeatRule.byweekday[0]] +
          ' of the Month","frequency":1,"byweekday":["' +
          repeatRule.byweekday[0] +
          '"],"bysetpos":1}'
        );
      } else if (
        repeatRule.bysetpos === -1 &&
        repeatRule.frequency === 1 &&
        repeatRule.byweekday.length === 1
      ) {
        return (
          '{"name":"First ' +
          ruleToDay[repeatRule.byweekday[0]] +
          ' of the Month","frequency":1,"byweekday":["' +
          repeatRule.byweekday[0] +
          '"],"bysetpos":-1}'
        );
      } else if (repeatRule.bymonthday != null) {
        return (
          '{"name":"On day ' +
          repeatRule.bymonthday +
          ' of the month","frequency":1,"bymonthday":' +
          repeatRule.bymonthday +
          '}'
        );
      }
      break;
    default:
      break;
  }
  return null;
}
