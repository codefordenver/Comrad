// This is a start of some tests to run on rrule / the returnDatesArrayByRepeatRule function,
// which is really fraught with bugs.
// If testing this file, it's helpful to be sure you are running it in UTC
// You can do that in PowerShell with:
//      $env:TZ = 'UTC'
//      node rrule-tests.js

const { RRule } = require('rrule');
const keys = require('./server/v1/config/keys');
const moment = require('moment-timezone');

console.log('current date: ', new Date());
console.log('current time zone offset: ', new Date().getTimezoneOffset());
console.log('offset for DST event', new Date('2023-11-05T02:00:00Z').getTimezoneOffset());
console.log(moment.tz.zone(keys.stationTimeZone).utcOffset(moment('2023-11-05T01:00:00Z')));
console.log(moment.tz.zone(keys.stationTimeZone).utcOffset(moment('2023-11-05T02:00:00Z')));
console.log(moment.tz.zone(keys.stationTimeZone).utcOffset(moment('2023-11-05T03:00:00Z')));
console.log(moment.tz.zone(keys.stationTimeZone).utcOffset(moment('2023-11-05T04:00:00Z')));
console.log(moment.tz.zone(keys.stationTimeZone).utcOffset(moment('2023-11-05T05:00:00Z')));
console.log(moment.tz.zone(keys.stationTimeZone).utcOffset(moment('2023-11-05T06:00:00Z')));
console.log(moment.tz.zone(keys.stationTimeZone).utcOffset(moment('2023-11-05T07:00:00Z')));
// cut over to DST in Moutnain Time
console.log(moment.tz.zone(keys.stationTimeZone).utcOffset(moment('2023-11-05T08:00:00Z')));
console.log(moment.tz.zone(keys.stationTimeZone).utcOffset(moment('2023-11-05T09:00:00Z')));

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
    // let startOffset = moment.tz.zone(keys.stationTimeZone).utcOffset(moment(event.start_time_utc, keys.stationTimeZone));
    // let endOffset = moment.tz.zone(keys.stationTimeZone).utcOffset(moment(event.end_time_utc, keys.stationTimeZone));
    // let adjustedStartDate = new Date(
    //   moment(startDate).add(
    //     startOffset,
    //     'minutes',
    //   ).add(-60, 'minutes'),
    // ); //between searches on START times, and we want to get anything in progress in this date range, so subtract the event duration from the start time
    // let adjustedEndDate = new Date(
    //   moment(endDate).add(endOffset, 'minutes') 
    // );


    // console.log(startOffset, adjustedStartDate, adjustedEndDate)

    let minutesOffset =
      moment.tz.zone(keys.stationTimeZone).utcOffset(moment(event.end_time_utc)) -
      new Date().getTimezoneOffset() 
       - new Date(endDate).getTimezoneOffset()
       + new Date().getTimezoneOffset();
    let adjustedStartDate = 
      moment(startDate).add(
        -1 * eventDuration - 1 * 1000 * minutesOffset * 60,
        'milliseconds',
      ); //between searches on START times, and we want to get anything in progress in this date range, so subtract the event duration from the start time
    let adjustedEndDate = 
      moment(endDate).add(minutesOffset, 'minutes') 
    ;

    // Account for another bug in the rule.between library:
    // If we are in the timeframe right before DST starts, the calculation goes off by an hour
    // An event at 02:00 UTC on the day daylight savings starts (eg, Nov 5 2:00 UTC) will not be found
    // Whatever the offset is, that number of hours leading up to the actual start of DST (Nov 5 8:00 UTC for moutnain time)
    // causes errors
    let offsetForDstBug = moment.tz.zone(keys.stationTimeZone).utcOffset(moment(endDate).add(minutesOffset, 'minutes')) - 
	    moment.tz.zone(keys.stationTimeZone).utcOffset(moment(endDate));

    adjustedStartDate = adjustedStartDate.add (offsetForDstBug, 'minutes');
    adjustedEndDate = adjustedEndDate.add (offsetForDstBug, 'minutes');

    console.log('key values', 
      moment.tz.zone(keys.stationTimeZone).utcOffset(moment(event.end_time_utc)), 
      new Date().getTimezoneOffset(), 
      'minutesOffset',
      minutesOffset, 
      offsetForDstBug, 
      adjustedStartDate, 
      adjustedEndDate);

    

    // for THIRD, I have to do this:
     //adjustedStartDate = adjustedStartDate.subtract(60, 'minutes');
     //adjustedEndDate = adjustedEndDate.add(0, 'minutes');

    let events = rule.between(new Date(adjustedStartDate), new Date(adjustedEndDate));

    // undo the minutes offset
    for (let i = 0; i < events.length; i++) {
      events[i] = moment(events[i])
        .subtract(minutesOffset, 'minute')
        .subtract(offsetForDstBug, 'minute')
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

let rruletest1 = {
	"repeat_rule": {
          byweekday: [
            'SU'
          ],
          frequency: 2,
          repeat_start_date: '2011-04-17T02:00:00.000Z',
          repeat_end_date: '9999-01-01T06:00:00.000Z',
          count: null,
          interval: 1,
          bymonth: null,
          bysetpos: null,
          bymonthday: null
        },
  start_time_utc: '2023-11-05T02:00:00Z',
  end_time_utc: '2023-11-05T03:00:00Z'
}; //grateful dead hour

let events = returnDatesArrayByRepeatRule(rruletest1, '2023-10-29T02:00:00.000Z', '2023-10-29T02:59:00.000Z');
console.log('events Oct 28 ... should have one:', events);
events = returnDatesArrayByRepeatRule(rruletest1, '2023-11-05T02:00:00.000Z', '2023-11-05T02:59:00.000Z');
console.log('events Nov 4 ... should have one:', events);
events = returnDatesArrayByRepeatRule(rruletest1, '2023-11-12T03:00:00.000Z', '2023-11-12T03:59:00.000Z');

console.log('events Nov 11 ... should have one:', events);


let rruletest2 = {
	"repeat_rule": {
          byweekday: [
            'SU'
          ],
          frequency: 2,
          repeat_start_date: '2011-01-17T03:00:00.000Z',
          repeat_end_date: '9999-01-01T06:00:00.000Z',
          count: null,
          interval: 1,
          bymonth: null,
          bysetpos: null,
          bymonthday: null
        },
  start_time_utc: '2011-01-17T03:00:00.000Z',
  end_time_utc: '2011-01-17T04:00:00.000Z'
}; //grateful dead hour, but testing as if it started when it wasn't DST

events = returnDatesArrayByRepeatRule(rruletest2, '2023-10-29T02:00:00.000Z', '2023-10-29T02:59:00.000Z');
console.log('events Oct 28 ... should have one:', events);
events = returnDatesArrayByRepeatRule(rruletest2, '2023-11-05T02:00:00.000Z', '2023-11-05T02:59:00.000Z');
console.log('events Nov 4 ... should have one:', events);
events = returnDatesArrayByRepeatRule(rruletest2, '2023-11-12T03:00:00.000Z', '2023-11-12T03:59:00.000Z');

console.log('events Nov 11 ... should have one:', events);


let rruletest3 = { repeat_rule: {
          byweekday: [],
          repeat_start_date: '2011-03-27T06:00:00.000Z',
          repeat_end_date: '9999-01-01T06:00:00.000Z',
          frequency: 3
        },
        show_details: {
          host_type: 'User',
          guests: [
            null
          ],
          title: 'Sleepless Nights',
          summary: 'This freeform show leaves the door open for eclectic audio explorations.',
          description: '<p><br></p>',
          producer: null,
          host: null,
          custom: {
            record_audio: '1',
            url: 'sleepless',
            source: 'KGNU',
            numeric_id: '21',
            category: 'Music'
          }
        },
        status: 'active',
        _id: '64e4a968b315da622b6037fc',
        start_time_utc: '2011-03-27T06:00:00.000Z',
        end_time_utc: '2011-03-27T09:00:00.000Z',
        is_recurring: true,
        created_at: '2023-08-22T12:26:16.951Z',
        updated_at: '2023-08-22T12:26:16.951Z',
        __v: 0
      };


events = returnDatesArrayByRepeatRule(rruletest3, '2023-10-29T06:00:00.000Z', '2023-10-29T08:59:00.000Z');
console.log('events Oct 28 ... should have one:', events);
events = returnDatesArrayByRepeatRule(rruletest3, '2023-11-05T06:00:00.000Z', '2023-11-05T09:59:00.000Z');
console.log('events Nov 4 ... should have one:', events);
events = returnDatesArrayByRepeatRule(rruletest3, '2023-11-12T07:00:00.000Z', '2023-11-12T09:59:00.000Z');

console.log('events Nov 11 ... should have one:', events);

let rruletest4 = {
        repeat_rule: {
          byweekday: [
            'SU'
          ],
          frequency: 2,
          repeat_start_date: '2011-03-27T09:00:00.000Z',
          repeat_end_date: '9999-01-01T06:00:00.000Z',
          count: null,
          interval: 1,
          bymonth: null,
          bysetpos: null,
          bymonthday: null
        },
        show_details: {
          host_type: 'User',
          guests: [
            null
          ],
          title: 'Restless Mornings',
          summary: 'The proving ground for new talent. Anything can happen as new DJs hone their chops behind the mixing board.',
          description: '<p><br></p>',
          producer: null,
          host: null,
          custom: {
            record_audio: '1',
            url: 'restless',
            source: 'KGNU',
            numeric_id: '22',
            category: 'Music'
          }
        },
        status: 'active',
        _id: '64e4a969b315da622b60384a',
        start_time_utc: '2011-03-27T09:00:00.000Z',
        end_time_utc: '2011-03-27T13:00:00.000Z',
        is_recurring: true,
        created_at: '2023-08-22T12:26:17.132Z',
        updated_at: '2023-08-22T12:26:17.132Z',
        __v: 0
      };



events = returnDatesArrayByRepeatRule(rruletest4, '2023-10-29T09:00:00.000Z', '2023-10-29T12:59:00.000Z');
console.log('events Oct 29 ... should have one:', events);
events = returnDatesArrayByRepeatRule(rruletest4, '2023-11-05T10:00:00.000Z', '2023-11-05T13:59:00.000Z');
console.log('events Nov 5 ... should have one:', events);


let rruletest5 = {
      repeat_rule: {
        byweekday: [],
        repeat_start_date: '2011-04-04T02:00:00.000Z',
        frequency: 3,
        repeat_end_date: '9999-01-01T06:00:00.000Z'
      },
      traffic_details: {
        type: 'Legal ID',
        title: 'Legal Id',
        description: '"KGNU, Boulder, Denver and Fort Collins"',
        producer: null,
        custom: {
          old_comrad_event_id: '2',
          old_comrad_scheduled_event_ids: [
            '65'
          ]
        }
      },
      status: 'active',
      _id: '62df008c300b9338581a0a77',
      start_time_utc: '2011-04-04T02:00:00.000Z',
      end_time_utc: '2011-04-04T02:01:00.000Z',
      is_recurring: true,
      created_at: '2022-07-25T20:43:56.589Z',
      updated_at: '2022-07-25T20:43:56.589Z',
      __v: 0
    }; // Legal ID which should appear during Grateful dead hour

events = returnDatesArrayByRepeatRule(rruletest5, '2023-11-05T02:00:00Z', '2023-11-05T03:00:00Z');
console.log('events Nov 4 ... should have one:', events);