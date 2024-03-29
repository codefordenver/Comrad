const db = require('../../../models');
const moment = require('moment');

async function determineHostType(data) {
  // if host is provided, we need to determine if this host is a User or a HostGroup
  if (
    ('show_details' in data && 'host' in data.show_details) ||
    'show_details.host' in data
  ) {
    let host =
      'show_details' in data && 'host' in data.show_details
        ? data.show_details.host
        : data['show_details.host'];
    if (host === null) {
      data['show_details.host_type'] = 'User';
      return data;
    }
    console.log('seeing if ' + host + ' is User or HostGroup');
    let hostGroup = await db.HostGroup.findOne({ _id: host });
    console.log('found', hostGroup);
    if (hostGroup != null) {
      data['show_details.host_type'] = 'HostGroup';
    } else {
      data['show_details.host_type'] = 'User';
    }
  }
  return data;
}

function findEventQueryByDateRange(start, end) {
  return {
    $or: [
      {
        $and: [
          {
            'repeat_rule.repeat_start_date': {
              $lte: new Date(end),
            },
          },
          {
            $or: [
              { 'repeat_rule.repeat_end_date': { $gte: new Date(start), },},
              { 'repeat_rule.repeat_end_date': null},
            ]
          }
        ],
      },
      {
        $and: [
          {
            start_time_utc: {
              $lte: new Date(end),
            },
          },
          {
            end_time_utc: {
              $gt: new Date(start), //use $gt so we do not get events that start at the exact endDate time
            },
          },
        ],
      },
    ],
  };
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

function populateMasterEventShowDetails() {
  return {
    path: 'show_details.host.master_event_id',
    select: 'first_name last_name on_air_name',
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
  determineHostType,
  findEventQueryByDateRange,
  populateShowHost,
  populateMasterEvent,
  populateMasterEventShowDetails,
  master_time_id,
  master_time_id__byEventType,
};
