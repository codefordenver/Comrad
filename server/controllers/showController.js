const db = require('../models');
const moment = require('moment');
const { RRule } = require('RRule');
const _ = require('lodash');

function create_new_show(req, res) {
  return {
    status: 'Active',
    show_details: {
      title: req.body.title,
      summary: req.body.summary,
      description: req.body.description,
      producer: req.body.producer,
      host: req.body.host,
      guests: [],
      playlist: req.body.playlist,
      custom: '',
    },

    show_start_time_utc: req.body.show_start_time_utc,
    show_end_time_utc: req.body.show_end_time_utc,

    is_recurring: req.body.repeat,
    repeat_rule: {
      frequency: req.body.repeatType,
      repeat_start_date: moment(req.body.repeat_start_date).startOf('day'),
      repeat_end_date: moment(req.body.repeat_end_date).endOf('day'),
      count: null,
      byweekly: '',
      bymonth: '',
    },
  };
}

function repeatRuleShows(shows) {
  const allRepeatShows = reduceShowsByRepeatProperty(shows, true);
  const allNonRepeatShows = reduceShowsByRepeatProperty(shows, false);

  const allRepeatShowsExpanded = allRepeatShows.map(show => {
    const allShowDates = returnDatesArrayByRepeatRule(show);
    const allRepeatedShowsExpandedByDates = returnShowsArrayWithNewDates(
      allShowDates,
      show,
    );

    return allRepeatedShowsExpandedByDates;
  });

  //Need to check for master_show_uid and then replace those shows within allShows
  const mergedShows = _.concat(allRepeatShowsExpanded, allNonRepeatShows);

  return _.flatten(mergedShows);
}

function reduceShowsByRepeatProperty(shows, recurringCheckValue) {
  const reducer = (accShows, currentShow) => {
    if (currentShow.is_recurring == recurringCheckValue) {
      return [...accShows, currentShow];
    }
    return accShows;
  };

  const reducedShowList = shows.reduce(reducer, []);

  return reducedShowList;
}

function momentCombineDayAndTime(desiredDate, desiredTime) {
  const newDate = moment(desiredDate).format('YYYYMMDD');
  const newTime = moment(desiredTime).format('h:mm:ss');
  const newDateAndTimeFormat = newDate + ' ' + newTime;
  const returnedValue = moment(newDateAndTimeFormat, 'YYYYMMDD h:mm:ss')
    .utc()
    .format();

  return returnedValue;
}

function returnShowsArrayWithNewDates(dateArray, show) {
  const returnedShows = dateArray.map((date, i) => {
    let newShow = { ...show.toObject() };
    const show_start_time_utc = momentCombineDayAndTime(
      date,
      show.show_start_time_utc,
    );
    const show_end_time_utc = momentCombineDayAndTime(
      date,
      show.show_end_time_utc,
    );

    newShow.master_show_uid = newShow._id;
    newShow._id = newShow._id + '-' + i;
    newShow.show_start_time_utc = show_start_time_utc;
    newShow.show_end_time_utc = show_end_time_utc;

    return newShow;
  });
  return returnedShows;
}

function returnDatesArrayByRepeatRule(show) {
  const { frequency, repeat_start_date, repeat_end_date } = show.repeat_rule;

  if (frequency) {
    const rule = new RRule({
      freq: RRule[frequency],
      dtstart: repeat_start_date,
      until: repeat_end_date,
    });

    try {
      return rule.all();
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

module.exports = {
  repeatRuleShows,
  returnDatesArrayByRepeatRule,
  reduceShowsByRepeatProperty,

  findById: (req, res) => {
    db.Show.findById(req.params.id)
      .then(dbShow => res.json(dbShow))
      .catch(err => res.status(422).json(err));
  },

  findByDate: (req, res) => {
    let { startDate, endDate } = req.query;
    startDate = JSON.parse(startDate);
    endDate = JSON.parse(endDate);

    db.Show.find()
      .and([
        {
          'repeat_rule.repeat_start_date': {
            $lte: endDate,
          },
        },
        {
          'repeat_rule.repeat_end_date': {
            $gte: startDate,
          },
        },
      ])
      .then(dbShow => {
        res.json(repeatRuleShows(dbShow));
      })
      .catch(err => res.status(422).json(err));
  },

  create: (req, res) => {
    console.log('Creating show');
    db.Show.create(create_new_show(req, res))
      .then(dbShow => {
        console.log('Sending Response');
        console.log(dbShow);
        res.json(repeatRuleShows([dbShow]));
      })
      .catch(err => res.status(422).json(err));
  },

  update: (req, res) => {
    db.Show.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbShow => res.json(dbShow))
      .catch(err => res.status(422).json(err));
  },

  remove: (req, res) => {
    db.Show.findById({ _id: req.params.id })
      .then(dbShow => dbShow.remove())
      .then(dbShow => res.json(dbShow))
      .catch(err => res.status(422).json(err));
  },
};
