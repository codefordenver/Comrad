const db = require('../models');
const moment = require('moment');

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
      frequency: '',
      repeat_start_date: req.body.repeat_start_date,
      repeat_end_date: req.body.repeat_end_date,
      count: 0,
      byweekly: '',
      bymonth: '',
    },
  };
}

function repeat_rule_shows(shows) {
  return shows;
}

function reduce_shows_by_date_range(shows, startDate, endDate) {
  return shows;
}

module.exports = {
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
      'repeat_rule.repeat_start_date': {
        $gte: startDate,
      },
    })
      .then(dbShow => {
        const expandedShowList = repeat_rule_shows(dbShow);
        const filteredShowList = reduce_shows_by_date_range(
          expandedShowList,
          startDate,
          endDate,
        );
        res.json(filteredShowList);
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
