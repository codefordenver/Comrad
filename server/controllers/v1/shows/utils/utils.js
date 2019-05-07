const moment = require('moment');
const { RRule } = require('rrule');
const _ = require('lodash');

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
  const allRepeatShows = reduceShowsByRepeatProperty(shows, true);
  const allRepeatShowsExpanded = allRepeatShows.map(show => {
    const allShowDates = returnDatesArrayByRepeatRule(show, startDate, endDate);
    const allRepeatedShowsExpandedByDates = returnShowsArrayWithNewDates(
      allShowDates,
      show,
    );

    return allRepeatedShowsExpandedByDates;
  });

  let allNonRepeatShows = reduceShowsByRepeatProperty(shows, false);
  allNonRepeatShows = allNonRepeatShows.map(show => {
    const date = show.repeat_rule.repeat_start_date;
    show.show_start_time_utc = momentCombineDayAndTime(
      date,
      show.show_start_time_utc,
    );
    show.show_end_time_utc = momentCombineDayAndTime(
      date,
      show.show_end_time_utc,
    );

    return show;
  });

  //Replace repeat shows with instance shows here!!!
  const repeatFlat = _.flatten(allRepeatShowsExpanded);
  const repeatKeyBy = _.keyBy(repeatFlat, '_id');
  const nonRepeatTitleReplaced = allNonRepeatShows.map(show => {
    show.show_details.title = show.show_details.title + ' (Instance Version)';
    return show;
  });
  const nonRepeatKeyBy = _.keyBy(nonRepeatTitleReplaced, o => {
    return o.master_show_uid + '-' + moment(o.replace_show_date);
  });
  const combinedObject = { ...repeatKeyBy, ...nonRepeatKeyBy };
  return _.values(combinedObject);
  //End testing of replacing repeat shows

  //const mergedShows = _.concat(allRepeatShowsExpanded, allNonRepeatShows);
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
    newShow._id = newShow._id + '-' + show_start_time_utc;
    newShow.show_start_time_utc = show_start_time_utc;
    newShow.show_end_time_utc = show_end_time_utc;
    return newShow;
  });
  return returnedShows;
}

function findShowQueryByDateRange(start, end) {
  return [
    {
      'repeat_rule.repeat_start_date': {
        $lte: end,
      },
    },
    {
      'repeat_rule.repeat_end_date': {
        $gte: start,
      },
    },
  ];
}

module.exports = {
  showList,
  findShowQueryByDateRange,
};
