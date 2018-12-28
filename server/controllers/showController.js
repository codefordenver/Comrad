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

    repeat_rule: {
      frequency: req.body.repeatType,
      repeat_start_date: req.body.repeat_start_date,
      repeat_end_date: req.body.repeat_end_date,
      count: null,
      byweekly: '',
      bymonth: '',
    },
  };
}

function repeatRuleShows(shows, startDate, endDate) {
  const allShows = shows.map(show => {
    const allShowDates = returnDatesArrayByRepeatRule(show);
    const allRepeatedShows = returnShowsArrayWithNewDates(allShowDates, show);
    return allRepeatedShows;
  });

  return _.flatten(allShows);
}

function momentCombineDayAndTime(desiredDate, desiredTime) {
  const newDate = moment(desiredDate)
    .utc()
    .format('YYYYMMDD');

  const newTime = moment(desiredTime)
    .utc()
    .format('h:mm:ss Z');

  const newDateAndTime = newDate + ' ' + newTime;

  return moment(newDateAndTime, 'YYYYMMDD h:mm:ss Z')
    .utc()
    .format();
}

function returnShowsArrayWithNewDates(dateArray, show) {
  if (dateArray) {
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
  } else {
    return show;
  }
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

function reduceShowsByDateRange(shows, startDate, endDate) {
  return shows;
}

module.exports = {
  repeatRuleShows,
  returnDatesArrayByRepeatRule,
  findById: (req, res) => {
    db.Show.findById(req.params.id)
      .then(dbShow => res.json(dbShow))
      .catch(err => res.status(422).json(err));
  },

  findByDate: (req, res) => {
    let { startDate, endDate } = req.query;
    startDate = JSON.parse(startDate);
    endDate = JSON.parse(endDate);
    //console.log(`Start ${startDate} : End ${endDate}`);
    db.Show.find({
      'repeat_rule.repeat_end_date': {
        $gte: endDate,
      },
    })
      .then(dbShow => {
        const expandedShowList = repeatRuleShows(dbShow, startDate, endDate);
        res.json(expandedShowList);
      })
      .catch(err => res.status(422).json(err));
  },

  create: (req, res) => {
    db.Show.create(create_new_show(req, res))
      .then(dbShow => res.json(dbShow))
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
