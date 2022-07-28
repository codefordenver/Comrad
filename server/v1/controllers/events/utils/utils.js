const moment = require('moment-timezone');
const { RRule } = require('rrule');
const _ = require('lodash');
const db = require('../../../models');
const keys = require('../../../config/keys');

const {
  master_time_id,
  master_time_id__byEventType,
} = require('./utils__mongoose');

function getModelForEventType(eventType) {
  switch (eventType) {
    case 'shows':
      return db.Show;
    case 'traffic':
      return db.Traffic;
    default:
      return null;
  }
}

function eventList(events, startDate, endDate) {
  //Perform this check as the create route is an object, and the find route is an array.
  //This makes sure everything is an iterable array before going into the reducers.
  if (!Array.isArray(events)) {
    events = [events];
  }
  //Filter all events that are series
  const allSeriesEvents = reduceEventsByRepeatProperty(events, true);

  const allSeriesEventsExpanded = allSeriesEvents.map(event => {
    return allEventInstancesInDateRange(event, startDate, endDate);
  });

  //Filter all events that are instances
  const allInstanceEvents = reduceEventsByRepeatProperty(events, false);
  const allInstanceEventsExpanded = returnInstanceEventsArray(
    allInstanceEvents,
  );

  //Replace repeat events with instance events here
  const seriesFlattened = _.flatten(allSeriesEventsExpanded);
  const seriesKeyBy = _.keyBy(seriesFlattened, 'master_time_id');

  const instanceKeyBy = _.keyBy(allInstanceEventsExpanded, o => {
    return o.master_time_id;
  });

  //Combined series and instance events by object ID and then return the final array
  let eventsToReturn = { ...seriesKeyBy, ...instanceKeyBy };

  //transform the object back to an array
  let eventsToReturnArray = [];
  _.mapKeys(eventsToReturn, function(event) {
    if (event.status === 'active') {
      eventsToReturnArray.push(event);
    }
  });

  //filter out events that do not fall in the start time / end time range
  //we need to do this because returnDatesArrayByRepeatRule searches for a wider range than the provided date range,
  //and that's because the RRule library does not properly account for daylight savings time
  eventsToReturnArray = eventsToReturnArray.filter(function(e) {
    if (
      new Date(e.start_time_utc) < new Date(endDate) &&
      new Date(e.start_time_utc) >= new Date(startDate)
    ) {
      return true;
    } else if (
      new Date(e.end_time_utc) <= new Date(endDate) &&
      new Date(e.end_time_utc) > new Date(startDate)
    ) {
      return true;
    } else if (
      // the provided time range falls completely within the event's start-to-end time range
      new Date(e.start_time_utc) <= new Date(startDate) &&
      new Date(e.end_time_utc) >= new Date(endDate)
    ) {
      return true;
    }
    return false;
  });

  //sort the array by event start time
  eventsToReturnArray = eventsToReturnArray.sort(function(a, b) {
    if (new Date(a.start_time_utc) > new Date(b.start_time_utc)) {
      return 1;
    } else if (new Date(a.start_time_utc) === new Date(b.start_time_utc)) {
      return 0;
    } else {
      return -1;
    }
  });

  return eventsToReturnArray;
}

function allEventInstancesInDateRange(event, startDate, endDate) {
  const allEventDates = returnDatesArrayByRepeatRule(event, startDate, endDate);
  const allSeriesEventsExpandedByDates = returnSeriesEventsArrayWithNewDates(
    allEventDates,
    event,
  );

  return allSeriesEventsExpandedByDates;
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

function reduceEventsByRepeatProperty(events, recurringCheckValue) {
  const reducer = (accEvents, currentEvent) => {
    if (
      currentEvent.is_recurring === recurringCheckValue ||
      (currentEvent.is_recurring === undefined && recurringCheckValue === false)
    ) {
      return [...accEvents, currentEvent];
    }
    return accEvents;
  };

  const reducedEventList = events.reduce(reducer, []);

  return reducedEventList;
}

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
      moment.tz.zone(keys.stationTimeZone).utcOffset(moment(endDate)) -
      new Date().getTimezoneOffset();
    let adjustedStartDate = new Date(
      moment(startDate).add(
        -1 * eventDuration - 1 * 1000 * minutesOffset * 60,
        'milliseconds',
      ),
    ); //between searches on START times, and we want to get anything in progress in this date range, so subtract the event duration from the start time
    let adjustedEndDate = new Date(
      moment(endDate).add(minutesOffset, 'minutes'),
    );

    let events = rule.between(adjustedStartDate, adjustedEndDate);
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

function combineDayAndTime(
  desiredDate,
  desiredTime,
  format = 'MOMENT',
  //log = false,
) {
  //if (log) {
  // console.log(desiredDate, desiredTime);
  // }
  const desiredTime__hours = moment(desiredTime).hours();
  const desiredTime__minutes = moment(desiredTime).minutes();
  const desiredDate__hours = moment(desiredDate).hours();
  const desiredDate__minutes = moment(desiredDate).minutes();

  let returnedValue = null;

  // the date/time could different, which may mean we have differences between the dates related to DST
  //get the time difference, in hours
  let difference = desiredTime__hours - desiredDate__hours;
  if (difference < -12) {
    difference = difference + 24;
  } else if (difference > 12) {
    difference = difference - 24;
  }
  //this code adjusts the date for daylight savings time if the server's time zone is not in daylight savings time
  //it does this by comparing the offsets for the local server w/offsets from the station's time zone
  // if (log) {
  // console.log(moment.tz.zone(moment.tz.guess()).utcOffset(moment(desiredDate)) - moment.tz.zone(moment.tz.guess()).utcOffset(moment(desiredTime)));
  // }
  let adjustment =
    moment.tz.zone(keys.stationTimeZone).utcOffset(moment(desiredDate)) -
    moment.tz.zone(keys.stationTimeZone).utcOffset(moment(desiredTime)) -
    (moment.tz.zone(moment.tz.guess()).utcOffset(moment(desiredDate)) -
      moment.tz.zone(moment.tz.guess()).utcOffset(moment(desiredTime)));
  // if (log) {
  // console.log('adjustment',adjustment);
  // }

  returnedValue = moment(desiredDate)
    .add(difference, 'hour')
    .hours(desiredTime__hours)
    .minutes(desiredTime__minutes)
    .seconds(0)
    .utc();

  returnedValue.add(adjustment, 'minute');

  // if (log) {
  // console.log('returning: ' + new Date(returnedValue));
  // }

  if (format === 'MOMENT') {
    return returnedValue;
  } else if (format === 'STRING') {
    return returnedValue.format();
  } else {
    console.error('Date string format does not exist in case check');
    return null;
  }
}

function returnSeriesEventsArrayWithNewDates(dateArray, event) {
  const returnedEvents = dateArray.map((date, i) => {
    let newEvent;
    if (typeof event.toObject === 'function') {
      newEvent = { ...event.toObject() };
    } else {
      newEvent = { ...event };
    }
    let { start_time_utc, end_time_utc } = newEvent;

    let duration = moment(end_time_utc).diff(moment(start_time_utc), 'minutes');

    start_time_utc = combineDayAndTime(
      date,
      start_time_utc,
      'STRING',
      // for debugging the function
      // 'START', event.show_details.title === 'Sleepless Nights'
    );

    //add the show duration to date so that we accurately represent show times that overlap the daylight savings break
    end_time_utc = combineDayAndTime(
      moment(date)
        .add(duration, 'minutes')
        .format(),
      end_time_utc,
      'STRING',
      // for debugging the function
      //event.show_details.title === 'Sleepless Nights'
    );

    const series_event_id = newEvent._id;
    newEvent = { ...newEvent, master_event_id: { _id: series_event_id } };
    newEvent.master_time_id = master_time_id(series_event_id, start_time_utc);

    newEvent.start_time_utc = start_time_utc;
    newEvent.end_time_utc = end_time_utc;
    return newEvent;
  });
  return returnedEvents;
}

function returnInstanceEventsArray(events) {
  const allInstances = events.map(event => {
    let instanceEvent;
    if (typeof event.toObject !== 'function') {
      instanceEvent = { ...event };
    } else {
      instanceEvent = { ...event.toObject() };
    }
    const { master_event_id } = instanceEvent;

    //This will merge any show/traffic details from the master show that are not on the instance.
    if (master_event_id) {
      if (
        instanceEvent.show_details != null ||
        instanceEvent.master_event_id.show_details != null
      ) {
        instanceEvent.show_details = {
          ...instanceEvent.master_event_id.show_details,
          ...instanceEvent.show_details,
        };
      }
      if (
        instanceEvent.traffic_details != null ||
        instanceEvent.master_event_id.traffic_details != null
      ) {
        instanceEvent.traffic_details = {
          ...instanceEvent.master_event_id.traffic_details,
          ...instanceEvent.traffic_details,
        };
      }
    }

    const date = instanceEvent.start_time_utc;

    //Update properties of the instance event
    instanceEvent.start_time_utc = combineDayAndTime(
      date,
      instanceEvent.start_time_utc,
      'STRING',
    );
    instanceEvent.end_time_utc = combineDayAndTime(
      date,
      instanceEvent.end_time_utc,
      'STRING',
    );

    instanceEvent.master_event_id = master_event_id ? master_event_id : null;
    instanceEvent.master_time_id = master_time_id__byEventType(instanceEvent);

    return instanceEvent;
  });
  return allInstances;
}

module.exports = {
  allEventInstancesInDateRange,
  getModelForEventType,
  eventList,
};
