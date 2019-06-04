const moment = require('moment');

function formatShow(data, res = null) {
  const show = data;

  //Initialize nested objects, otherwise the child keys return undefined.
  let formatedShow = {
    show_details: {},
    repeat_rule: {},
  };

  //Set the show end date.  If it is empty set a date that is never ending.
  if (show.is_recurring && !show.repeat_end_date) {
    show.repeat_end_date = moment('9999', 'YYYY');
  }

  //Determine if the repeat attribute is set, convert to a JSON object.
  if (show.repeatType) {
    show.repeatType = JSON.parse(show.repeatType);
  } else {
    show.repeatType = {};
  }

  //Slot all key/value pairs
  const showEntries = Object.entries(show);
  for (const [key, value] of showEntries) {
    switch (key) {
      case 'status':
        formatedShow.status = value;
        break;
      case 'title':
        formatedShow.show_details.title = value;
        break;
      case 'summary':
        formatedShow.show_details.summary = value;
        break;
      case 'description':
        formatedShow.show_details.description = value;
        break;
      case 'producer':
        formatedShow.show_details.producer = value;
        break;
      case 'host':
        formatedShow.show_details.host = value;
        break;
      case 'guests':
        formatedShow.show_details.guests = value;
        break;
      case 'playlist':
        formatedShow.show_details.playlist = value;
        break;
      case 'custom':
        formatedShow.show_details.custom = value;
        break;
      case 'show_start_time_utc':
        formatedShow.show_start_time_utc = value;
        break;
      case 'show_end_time_utc':
        formatedShow.show_end_time_utc = value;
        break;
      case 'repeat':
        formatedShow.is_recurring = value;
        break;
      case 'freq':
        formatedShow.repeat_rule.frequency = value;
        break;
      case 'repeat_start_date':
        formatedShow.repeat_rule.repeat_start_date = moment(value).startOf(
          'day',
        );
        break;
      case 'repeat_end_date':
        formatedShow.repeat_rule.repeat_end_date = moment(value).endOf('day');
        break;
      case 'count':
        formatedShow.repeat_rule.count = value;
        break;
      case 'interval':
        formatedShow.repeat_rule.interval = value;
        break;
      case 'byweekday':
        formatedShow.repeat_rule.byweekday = value;
        break;
      case 'bymonth':
        formatedShow.repeat_rule.bymonth = value;
        break;
      case 'bysetpos':
        formatedShow.repeat_rule.bysetpos = value;
        break;
      case 'bymonthday':
        formatedShow.repeat_rule.bymonthday = value;
        break;
      case 'repeatType':
        //Extracted above.
        break;
      case 'startDate':
        //Not used in formatter.  Used for query.
        break;
      case 'endDate':
        //Not used in formatter.  Used for query.
        break;
      default:
        console.log('The following key is not assigned: ' + key);
    }
  }
  return formatedShow;
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
              show_start_time_utc: {
                $lte: end,
              },
            },
            {
              show_end_time_utc: {
                $gte: start,
              },
            },
          ],
        },
      ],
    },
  ];
}

function populateShowQuery() {
  return {
    path: 'show_details.host',
    select: 'first_name last_name on_air_name',
  };
}

function master_time_id(_id, start_time) {
  console.log(_id + '-' + moment(start_time));
  return _id + '-' + moment(start_time);
}

function master_time_id__byShowType(show) {
  if (show.master_show_uid) {
    //Instance Show
    return master_time_id(show.master_show_uid, show.show_start_time_utc);
  } else {
    //Regular Show
    return master_time_id(show._id, show.show_start_time_utc);
  }
}

module.exports = {
  formatShow,
  findShowQueryByDateRange,
  populateShowQuery,
  master_time_id,
  master_time_id__byShowType,
};
