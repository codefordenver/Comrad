const moment = require('moment');
const { RRule } = require('rrule');
const _ = require('lodash');
const db = require('../../../models');

const {
  master_time_id,
  master_time_id__byShowType,
} = require('./utils__mongoose');

function showList(shows, startDate = null, endDate = null) {
  //Perform this check as the create route is an object, and the find route is an array.
  //This makes sure everything is an iterable array before going into the reducers.
  if (!Array.isArray(shows)) {
    shows = [shows];
  }
  //Filter all shows that are series
  const allSeriesShows = reduceShowsByRepeatProperty(shows, true);

  const allSeriesShowsExpanded = allSeriesShows.map(show => {
    const allShowDates = returnDatesArrayByRepeatRule(show, startDate, endDate);
    const allSeriesShowsExpandedByDates = returnSeriesShowsArrayWithNewDates(
      allShowDates,
      show,
    );

    return allSeriesShowsExpandedByDates;
  });

  //Filter all shows that are instances
  const allInstanceShows = reduceShowsByRepeatProperty(shows, false);
  const allInstanceShowsExpanded = returnInstanceShowsArray(allInstanceShows);

  //Replace repeat shows with instance shows here
  const seriesFlattened = _.flatten(allSeriesShowsExpanded);
  const seriesKeyBy = _.keyBy(seriesFlattened, '_id');

  const instanceKeyBy = _.keyBy(allInstanceShowsExpanded, o => {
    return o.master_time_id;
  });

  //Combined series and instance shows by object ID and then return the final array
  return { ...seriesKeyBy, ...instanceKeyBy };
}

function createRRule(show, queryStartDate, queryEndDate) {
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
  } = show.repeat_rule;

  const { show_start_time_utc, show_end_time_utc } = show;

  let newRRule = {};

  if (frequency) {
    newRRule.freq = frequency;
  }

  //Format RRULE start date by UTC Time
  const qsd = combineDayAndTime(queryStartDate, show_start_time_utc);
  const rsd = combineDayAndTime(repeat_start_date, show_start_time_utc);

  if (rsd.isAfter(qsd)) {
    newRRule.dtstart = new Date(rsd.format());
  } else {
    newRRule.dtstart = new Date(qsd.format());
  }

  //Format RRULE end date by UTC Time
  const qed = combineDayAndTime(queryEndDate, queryEndDate, 'MOMENT', 'END');
  const red = combineDayAndTime(
    repeat_end_date,
    show_end_time_utc,
    'MOMENT',
    'END',
  );

  if (red.isBefore(qed)) {
    newRRule.until = new Date(red.format());
  } else {
    newRRule.until = new Date(qed.format());
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

  return newRRule;
}

function reduceShowsByRepeatProperty(shows, recurringCheckValue) {
  const reducer = (accShows, currentShow) => {
    if (
      currentShow.is_recurring === recurringCheckValue ||
      (currentShow.is_recurring === undefined && recurringCheckValue === false)
    ) {
      return [...accShows, currentShow];
    }
    return accShows;
  };

  const reducedShowList = shows.reduce(reducer, []);

  return reducedShowList;
}

function returnDatesArrayByRepeatRule(show, startDate = null, endDate = null) {
  const { is_recurring } = show;

  if (is_recurring) {
    const rule = new RRule(createRRule(show, startDate, endDate));
    try {
      return rule.all();
    } catch (e) {
      console.log('Error in returnDatesArrayByRepeatRule');
      console.log(e);
      return null;
    }
  }
}

function combineDayAndTime(
  desiredDate,
  desiredTime,
  format = 'MOMENT',
  type = 'START',
) {
  //https://stackoverflow.com/questions/21918095/moment-js-how-to-detect-daylight-savings-time-and-add-one-day
  //Need to detect and handle DST, days are offset by 1 day in november/march.
  const desiredTime__hours = moment(desiredTime).hours();
  const desiredTime__minutes = moment(desiredTime).minutes();
  const desiredDate__hours = moment(desiredDate).hours();
  const desiredDate__minutes = moment(desiredDate).minutes();

  let returnedValue = null;

  if (
    //Both date and time happen at midnight, so need to subtract 1 minute
    type === 'END' &&
    desiredTime__hours === 0 &&
    desiredTime__minutes === 0 &&
    desiredDate__hours === 0 &&
    desiredDate__minutes === 0
  ) {
    returnedValue = moment(desiredDate)
      .subtract(1, 'minute')
      .seconds(0)
      .utc();
  } else if (
    //Only Time is at midnight, so take date and set 1 minute before midnight
    type === 'END' &&
    desiredTime__hours === 0 &&
    desiredTime__minutes === 0
  ) {
    returnedValue = moment(desiredDate)
      .hours(23)
      .minutes(59)
      .seconds(0)
      .utc();
  } else {
    //Neither date or time is at midnight, so set hours
    returnedValue = moment(desiredDate)
      .hours(desiredTime__hours)
      .minutes(desiredTime__minutes)
      .seconds(0)
      .utc();
  }

  if (format === 'MOMENT') {
    return returnedValue;
  } else if (format === 'STRING') {
    return returnedValue.format();
  } else {
    console.error('Date string format does not exist in case check');
    return null;
  }
}

function returnSeriesShowsArrayWithNewDates(dateArray, show) {
  const returnedShows = dateArray.map((date, i) => {
    let newShow = { ...show.toObject() };
    let { show_start_time_utc, show_end_time_utc } = newShow;

    show_start_time_utc = combineDayAndTime(
      date,
      show_start_time_utc,
      'STRING',
    );

    show_end_time_utc = combineDayAndTime(
      date,
      show_end_time_utc,
      'STRING',
      'END',
    );

    newShow.master_show_uid = newShow._id;
    newShow._id = master_time_id(newShow.master_show_uid, show_start_time_utc);
    newShow.master_time_id = newShow._id;
    newShow.show_start_time_utc = show_start_time_utc;
    newShow.show_end_time_utc = show_end_time_utc;
    return newShow;
  });
  return returnedShows;
}

function returnInstanceShowsArray(shows) {
  const allInstances = shows.map(show => {
    let instanceShow = { ...show.toObject() };
    const { master_show_uid } = instanceShow;

    //This will merge any show details from the master show that are not on the instance.
    if (master_show_uid) {
      instanceShow.show_details = {
        ...instanceShow.master_show_uid.show_details,
        ...instanceShow.show_details,
      };
    }

    const date = instanceShow.show_start_time_utc;

    //Update properties of the instance show
    instanceShow.show_start_time_utc = combineDayAndTime(
      date,
      instanceShow.show_start_time_utc,
      'STRING',
    );
    instanceShow.show_end_time_utc = combineDayAndTime(
      date,
      instanceShow.show_end_time_utc,
      'STRING',
      'END',
    );

    instanceShow.master_time_id = master_time_id__byShowType(instanceShow);

    return instanceShow;
  });
  return allInstances;
}

module.exports = {
  showList,
};
