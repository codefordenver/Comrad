const moment = require('moment');

function formatShow(data, res = null) {
  let show = data;
  //Set the show end date.  If it is empty set a date that is never ending.

  //Determine if the repeat dropdown was set, convert to a JSON object.
  if (show.repeat_rule_dropdown_value) {
    let repeat_rule = JSON.parse(show.repeat_rule_dropdown_value);
    repeat_rule.repeat_start_date = show.repeat_rule.repeat_start_date;

    if (!show.repeat_end_date) {
      show.repeat_rule.repeat_end_date = moment('9999', 'YYYY');
    } else {
      show.repeat_rule.repeat_end_date = show.repeat_rule.repeat_end_date;
    }
  } else {
    show.repeat_rule = {};
  }

  return show;
}

function findEventQueryByDateRange(start, end) {
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

function populateMasterEvent() {
  return {
    path: 'master_event_id',
  };
}

function master_time_id(_id, start_time) {
  return _id + '-' + moment(start_time);
}

function master_time_id__byEventType(event) {
  if (event.master_event_id) {
    //Instance Event
    return master_time_id(event.master_event_id._id, event.replace_event_date);
  } else {
    //Regular Event
    return event._id;
  }
}

module.exports = {
  formatShow,
  findEventQueryByDateRange,
  populateShowHost,
  populateMasterEvent,
  master_time_id,
  master_time_id__byEventType,
};
