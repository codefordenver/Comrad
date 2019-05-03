const moment = require('moment');
const { RRule } = require('rrule');
const _ = require('lodash');

function createNewShow(req, res, showStatus = 'Active') {
  const show = req.body;
  let { repeatType } = show;
  let formatedShow = {
    show_details: {},
    repeat_rule: {},
  };

  show.status = showStatus;

  if (repeatType) {
    show.repeatType = JSON.parse(repeatType);
  } else {
    show.repeatType = {};
  }

  const showEntries = Object.entries(show);
  for (const [key, value] of showEntries) {
    switch (key) {
      case 'status':
        formatedShow.status = value;
        break;
      case 'title':
        formatedShow.show_details.title = value;
        break;
      default:
        console.log('Hi default');
    }
    //console.log(`${key} = ${value}`);
  }
  if (!req.body.repeat_end_date) {
    show.repeat_end_date = moment('9999', 'YYYY');
  }

  return {
    status: 'Active',
    show_details: {
      title: req.body.title,
      summary: req.body.summary,
      description: req.body.description,
      producer: req.body.producer,
      host: req.body.host,
      guests: req.body.guests,
      playlist: req.body.playlist,
      custom: req.body.custom,
    },

    show_start_time_utc: req.body.show_start_time_utc,
    show_end_time_utc: req.body.show_end_time_utc,

    is_recurring: req.body.repeat,
    repeat_rule: {
      frequency: show.repeatType.freq,
      repeat_start_date: moment(show.repeat_start_date).startOf('day'),
      repeat_end_date: moment(show.repeat_end_date).endOf('day'),
      count: show.repeatType.count,
      interval: show.repeatType.interval,
      byweekday: show.repeatType.byweekday,
      bymonth: show.repeatType.bymonth,
      bysetpos: show.repeatType.bysetpos,
      bymonthday: show.repeatType.bymonthday,
    },
  };
}

function showList(shows, startDate = null, endDate = null) {
  const allRepeatShows = reduceShowsByRepeatProperty(shows, true);
  const allRepeatShowsExpanded = allRepeatShows.map(show => {
    const allShowDates = returnDatesArrayByRepeatRule(show, startDate, endDate);
    //console.log(allShowDates.slice(-20));
    //console.log('Completed RRule');
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

  //Need to check for master_show_uid and then replace those shows within allShows
  const mergedShows = _.concat(allRepeatShowsExpanded, allNonRepeatShows);

  return _.flatten(mergedShows);
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
  const newDate = moment(desiredDate).format('YYYYMMDD');
  const newTime = moment(desiredTime).format('HH:mm:ssZ');
  const newDateAndTimeFormat = newDate + ' ' + newTime;
  const returnedValue = moment(
    newDateAndTimeFormat,
    'YYYYMMDD HH:mm:ssZ',
  ).format('YYYY-MM-DDTHH:mm:ssZ');

  //console.log(`${desiredDate} - ${moment(returnedValue).isDST()}`);

  return returnedValue;
}

function returnShowsArrayWithNewDates(dateArray, show) {
  const returnedShows = dateArray.map((date, i) => {
    let newShow = { ...show.toObject() };
    let { show_start_time_utc, show_end_time_utc } = show;

    show_start_time_utc = momentCombineDayAndTime(date, show_start_time_utc);
    show_end_time_utc = momentCombineDayAndTime(date, show_end_time_utc);

    newShow.master_show_uid = newShow._id;
    newShow._id = newShow._id + '-' + show_start_time_utc;
    newShow.show_start_time_utc = show_start_time_utc;
    newShow.show_end_time_utc = show_end_time_utc;
    return newShow;
  });
  return returnedShows;
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

  let newRRule = {};

  if (frequency) {
    newRRule.freq = frequency;
  }

  queryStartDate = new Date(
    moment(queryStartDate).format('YYYY-MM-DDTHH:mm:ssZ'),
  );
  if (moment(repeat_start_date).isAfter(moment(queryStartDate))) {
    //Need to use query start date to reduce repeat size
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
   * By setting the time to 6 UTC instead of 0 UTC, it does not shift by a date in moment
   *  */
  newRRule.byhour = [6];

  //console.log(newRRule);

  return newRRule;
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
  createNewShow,
  showList,
  findShowQueryByDateRange,
};
