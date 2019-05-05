const moment = require('moment');

function formatShow(req, res = null, showStatus = 'active') {
  const show = req.body;
  let { repeatType } = show;

  //Initialize nested objects, otherwise the child keys return undefined.
  let formatedShow = {
    show_details: {},
    repeat_rule: {},
  };

  //Determine show status.  Is defaulted to active.
  show.status = showStatus;

  //Set the show end date.  If it is empty set a date that is never ending.
  if (!show.repeat_end_date) {
    show.repeat_end_date = moment('9999', 'YYYY');
  }

  //Determine if the repeat attribute is set, convert to a JSON object.
  if (repeatType) {
    show.repeatType = JSON.parse(repeatType);
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

module.exports = formatShow;
