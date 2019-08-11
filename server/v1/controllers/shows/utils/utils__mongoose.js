const moment = require('moment');

function formatShow(data, res = null) {
  let show = data;
  //Set the show end date.  If it is empty set a date that is never ending.

  //Determine if the repeat attribute is set, convert to a JSON object.
  if (show.repeat_rule) {
    show.repeat_rule = JSON.parse(show.repeat_rule);
    show.repeat_rule.repeat_start_date = show.repeat_start_date;

    if (!show.repeat_end_date) {
      show.repeat_rule.repeat_end_date = moment('9999', 'YYYY');
    } else {
      show.repeat_rule.repeat_end_date = show.repeat_end_date;
    }
  } else {
    show.repeat_rule = {};
  }

  return show;
}

function findShowQueryByDateRange(start, end) {
  return [
    {
      $or: [
        {
          $and: [
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
          ],
        },
        {
          $and: [
            {
              start_time_utc: {
                $lte: end,
              },
            },
            {
              end_time_utc: {
                $gt: start, //use $gt so we do not get events that start at the exact endDate time
              },
            },
          ],
        },
      ],
    },
  ];
}

function populateShowHost() {
  return {
    path: 'show_details.host',
    select: 'first_name last_name on_air_name',
  };
}

function populateMasterShow() {
  return {
    path: 'master_event_id',
  };
}

function master_time_id(_id, start_time) {
  return _id + '-' + moment(start_time);
}

function master_time_id__byShowType(show) {
  if (show.master_event_id) {
    //Instance Show
    return master_time_id(show.master_event_id._id, show.replace_event_date);
  } else {
    //Regular Show
    return show._id;
  }
}

module.exports = {
  formatShow,
  findShowQueryByDateRange,
  populateShowHost,
  populateMasterShow,
  master_time_id,
  master_time_id__byShowType,
};
