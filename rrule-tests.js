const { RRule } = require('rrule');
const keys = require('./server/v1/config/keys');
const moment = require('moment-timezone');

console.log('current date: ', new Date());

function returnDatesArrayByRepeatRule(event, startDate, endDate) {
  const rule = new RRule(createRRule(event));
  try {
    let eventDuration = event.end_time_utc - event.start_time_utc;
    // rule.between requires that our start date and end date be adjusted by the difference between the station's timezone offset and our server timezone's offset
    // this isn't documented, so far I've found it out by trial and error
    // prior to 6/9/2020, I was subtracting an hour from adjustedStartDate and adding an hour to adjustedEndDate because I thought it was a DST quirk with rrule
    // the combineDayandTime function is also responsible for what gets returned on the front end: and maybe that is why this is so complicated? Maybe it could be easier if it wasn't done that way.
    // tested with:
    // 1. Go to the dashboard while testing locally in Central Time and be sure the most recent preceding show appears in the Show Schedule on the right
    // 2. Do the same with the server running in UTC
    // 3. Go into a Show Builder for Morning Sound Alternative and Afternoon Sound Alternative. Ensure traffic events show in the first and last hour of the program.
    // 4. Do the same with the server running in UTC
    // 5. On Show Calendar, go to the DST cutoff for the year and be sure the show times are correct before and after the cutoff
    // 6. Do the same with the server running in UTC
    let minutesOffset =
      moment.tz.zone(keys.stationTimeZone).utcOffset(moment(event.end_time_utc)) -
      new Date().getTimezoneOffset();
    let adjustedStartDate = new Date(
      moment(startDate).add(
        -1 * eventDuration - 1 * 1000 * minutesOffset * 60,
        'milliseconds',
      ),
    ); //between searches on START times, and we want to get anything in progress in this date range, so subtract the event duration from the start time
    let adjustedEndDate = new Date(
      moment(endDate).add(minutesOffset, 'minutes') 
    );

    console.log(minutesOffset, adjustedStartDate, adjustedEndDate)


    let events = rule.between(adjustedStartDate, adjustedEndDate);
    console.log('events OG test', events);

    events = rule.between(new Date('2023-11-05T02:00:00.000Z'), new Date('2023-11-05T03:59:00.000Z'));
    console.log('events test 2', events);

    // undo the minutes offset
    for (let i = 0; i < events.length; i++) {
      events[i] = moment(events[i])
        .subtract(minutesOffset, 'minute')
        .format();
    }

    return events;
  } catch (e) {
    console.log('Error in returnDatesArrayByRepeatRule');
    console.log(e);
    return null;
  }
}



function createRRule(event) {
  const { replace_event_date } = event;
  const {
    frequency,
    repeat_start_date,
    repeat_end_date,
    interval,
    count,
    byweekday,
    bymonth,
    bysetpos,
    bymonthday,
  } = event.repeat_rule;

  let newRRule = {};

  if (frequency) {
    newRRule.freq = frequency;
  }

  if (repeat_start_date != null) {
    newRRule.dtstart = new Date(repeat_start_date);
  } else if (replace_event_date != null) {
    newRRule.dtstart = new Date(replace_event_date);
  }

  if (repeat_end_date != null) {
    newRRule.until = new Date(repeat_end_date);
  } else if (replace_event_date != null) {
    newRRule.until = new Date(replace_event_date);
  }

  if (count) {
    newRRule.count = count;
  }

  if (interval) {
    newRRule.interval = interval;
  }

  if (byweekday) {
    newRRule.byweekday = byweekday.map(day => {
      return RRule[day];
    });
  }

  if (bymonth) {
    newRRule.bymonth = [bymonth];
  }

  if (bysetpos) {
    newRRule.bysetpos = [bysetpos];
  }

  if (bymonthday) {
    newRRule.bymonthday = [bymonthday];
  }

  newRRule.tzid = keys.stationTimeZone;

  return newRRule;
}


console.log('testing https://comrad.kgnu.org/api/v1/events/shows?startDate=2023-11-05T02:00:00.000Z&endDate=2023-11-05T02:59:00.000Z');

let events = returnDatesArrayByRepeatRule({
	"repeat_rule": {
        byweekday: [
          'SU'
        ],
        frequency: 2,
        repeat_start_date: '2023-11-05T02:00:00.000Z',
        repeat_end_date: '2023-11-05T03:00:00.000Z',
        count: null,
        interval: 1,
        bymonth: null,
        bysetpos: null,
        bymonthday: null
  },
  start_time_utc: '2023-11-05T02:00:00Z',
  end_time_utc: '2023-11-05T03:00:00Z'
}, '2023-11-05T02:00:00.000Z', '2023-11-05T02:59:00.000Z');

console.log('events ... should have one:', events);


