const moment = require('moment');
const { RRule } = require('rrule');
const _ = require('lodash');

const { master_time_id } = require('./utils__mongoose');

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

  let newRRule = {};

  if (frequency) {
    newRRule.freq = frequency;
  }

  queryStartDate = new Date(
    moment(queryStartDate).format('YYYY-MM-DDTHH:mm:ssZ'),
  );
  if (moment(repeat_start_date).isAfter(moment(queryStartDate))) {
    newRRule.dtstart = repeat_start_date;
  } else {
    newRRule.dtstart = queryStartDate;
  }

  queryEndDate = new Date(moment(queryEndDate).format('YYYY-MM-DDTHH:mm:ssZ'));
  if (moment(repeat_end_date).isBefore(moment(queryEndDate))) {
    newRRule.until = repeat_end_date;
  } else {
    newRRule.until = queryEndDate;
  }

  if (count) {
    newRRule.count = count;
  }

  if (interval) {
    newRRule.interval = interval;
  }

  if (byweekday) {
    newRRule.byweekday = byweekday.map(day => {
      // dayList is used for imported shows
      const dayList = {
        0: 'MO',
        1: 'TU',
        2: 'WE',
        3: 'TH',
        4: 'FR',
        5: 'SA',
        6: 'SU',
      };

      if (dayList[day]) {
        day = dayList[day];
      }

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

  /**
   * Partial fix for DST.
   * By setting the time to 12 UTC instead of 0 UTC, it does not shift by a date in moment as the time is not midnight before DST correction.
   *  */
  newRRule.byhour = [12];

  return newRRule;
}

function showList(shows, startDate = null, endDate = null) {
  //Filter all shows that are series
  const allSeriesShows = reduceShowsByRepeatProperty(shows, true);

  const allSeriesShowsExpanded = allSeriesShows.map(show => {
    const allShowDates = returnDatesArrayByRepeatRule(show, startDate, endDate);
    const allSeriesShowsExpandedByDates = returnShowsArrayWithNewDates(
      allShowDates,
      show,
    );

    return allSeriesShowsExpandedByDates;
  });

  let allSingleInstanceShows = reduceShowsByRepeatProperty(shows, false);
  allSingleInstanceShows = allSingleInstanceShows.map(show => {
    let instanceShow = { ...show.toObject() };
    const date = instanceShow.repeat_rule.repeat_start_date;
    instanceShow.show_start_time_utc = momentCombineDayAndTime(
      date,
      instanceShow.show_start_time_utc,
    );
    instanceShow.show_end_time_utc = momentCombineDayAndTime(
      date,
      instanceShow.show_end_time_utc,
    );

    instanceShow.show_details.title =
      instanceShow.show_details.title + ' (Instance Version)';

    instanceShow.master_time_id = master_time_id__byShowType(instanceShow);

    console.log(instanceShow);

    return instanceShow;
  });

  //Replace repeat shows with instance shows here!!!
  const seriesFlattened = _.flatten(allSeriesShowsExpanded);
  const seriesKeyBy = _.keyBy(seriesFlattened, '_id');

  const instanceKeyBy = _.keyBy(allSingleInstanceShows, o => {
    return o.master_time_id;
  });

  const combinedObject = { ...seriesKeyBy, ...instanceKeyBy };
  return _.values(combinedObject);
  //End testing of replacing repeat shows

  //const mergedShows = _.concat(allSeriesShowsExpanded, allSingleInstanceShows);
  //return _.flatten(mergedShows);
}

function reduceShowsByRepeatProperty(shows, recurringCheckValue) {
  const reducer = (accShows, currentShow) => {
    if (currentShow.is_recurring === recurringCheckValue) {
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
      console.log(e);
      return null;
    }
  }
}

function momentCombineDayAndTime(desiredDate, desiredTime) {
  //https://stackoverflow.com/questions/21918095/moment-js-how-to-detect-daylight-savings-time-and-add-one-day
  //Need to detect and handle DST, days are offset by 1 day in november/march.
  const hours = moment(desiredTime).hours();
  const minutes = moment(desiredTime).minutes();

  const returnedValue = moment(desiredDate)
    .hours(hours)
    .minutes(minutes)
    .seconds(0);

  //console.log(`${desiredDate} - ${moment(returnedValue).isDST()}`);

  return returnedValue;
}

function returnShowsArrayWithNewDates(dateArray, show) {
  const returnedShows = dateArray.map((date, i) => {
    let newShow = { ...show.toObject() };
    let { show_start_time_utc, show_end_time_utc } = show;
    // if (show._id == '5cc913ad0d5a944a256139f7') {
    //   console.log(show.show_details.title);
    //   console.log(date);
    //   console.log(show_start_time_utc);
    //   console.log(show_end_time_utc);
    //   console.log(moment(date).isDST());
    //   console.log(moment(show_start_time_utc).isDST());
    //   console.log(moment(show_end_time_utc).isDST());
    // }
    show_start_time_utc = momentCombineDayAndTime(date, show_start_time_utc);
    show_end_time_utc = momentCombineDayAndTime(date, show_end_time_utc);

    // if (show._id == '5cc913ad0d5a944a256139f7') {
    //   console.log('---After Processing---');
    //   console.log(
    //     moment(show_start_time_utc)
    //       .utc()
    //       .format(),
    //   );
    //   console.log(
    //     moment(show_end_time_utc)
    //       .utc()
    //       .format(),
    //   );
    //   console.log(moment(show_start_time_utc).isDST());
    //   console.log(moment(show_end_time_utc).isDST());
    // }

    newShow.master_show_uid = newShow._id;
    newShow._id = master_time_id(newShow.master_show_uid, show_start_time_utc);
    newShow.master_time_id = newShow._id;
    newShow.show_start_time_utc = show_start_time_utc;
    newShow.show_end_time_utc = show_end_time_utc;
    return newShow;
  });
  return returnedShows;
}

function master_time_id__byShowType(show) {
  if (show.master_show_uid) {
    //Instance Show
    return master_time_id(show.master_show_uid, show.replace_show_date);
  } else {
    //Regular Show
    return master_time_id(show._id, show.show_start_time_utc);
  }
}

module.exports = {
  showList,
  master_time_id__byShowType,
};
