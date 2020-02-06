const moment = require('moment');
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
    let adjustedStartDate = new Date(
      moment(startDate).add(
        -1 * eventDuration - 1 * 1000 * 60 * 60,
        'milliseconds',
      ), // we are subtracting one hour because RRule has not been accounting for Daylight Savings Time properly - may need to consider rewriting to remove Rrule implementation with something that's more transparent about how it handles DST
    ); //between searches on START times, and we want to get anything in progress in this date range, so subtract the event duration from the start time

    let events = rule.between(adjustedStartDate, new Date(endDate));

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
  type = 'START',
) {
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
  returnedValue = moment(desiredDate)
    .add(difference, 'hour')
    .hours(desiredTime__hours)
    .minutes(desiredTime__minutes)
    .seconds(0)
    .utc();

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
    let newEvent = { ...event.toObject() };
    let { start_time_utc, end_time_utc } = newEvent;

    start_time_utc = combineDayAndTime(date, start_time_utc, 'STRING');

    end_time_utc = combineDayAndTime(date, end_time_utc, 'STRING', 'END');

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
    let instanceEvent = { ...event.toObject() };
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
      'END',
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
