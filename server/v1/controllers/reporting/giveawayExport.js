const db = require('../../models');
const {
  utils: { eventList },
  utils__mongoose: { findEventQueryByDateRange, populateMasterEvent },
} = require('../events/utils');

const moment = require('moment-timezone');
const keys = require('../../config/keys');
const { Parser } = require('json2csv');

function giveawayExport(req, res) {
  let { from, to } = req.query;

  let dateQuery = findEventQueryByDateRange(from, to);

  db.Traffic.find(
    {
      $and: [{ 'traffic_details.type': 'Giveaway' }, dateQuery],
    },
    null,
    { sort: { 'traffic_details.giveaway_details.event_date': 1 } },
  )
    .populate(populateMasterEvent())
    .then(trafficEvents => {
      res.setHeader(
        'Content-disposition',
        'attachment; filename=giveaways.csv',
      );
      res.set('Content-Type', 'text/csv');
      if (trafficEvents.length === 0) {
        return res
          .status(200)
          .end(
            'date_time,event_name,event_date,venue,winner_name,winner_phone,winner_email,winner_address',
          );
      }

      trafficEvents = eventList(trafficEvents, from, to);

      const parser = new Parser();
      const csv = parser.parse(
        trafficEvents.map(t => {
          let { giveaway_details } = t.traffic_details;
          let { winner } = giveaway_details;
          let name, phone, email, address;
          if (winner != null) {
            ({ name, phone, email, address } = winner);
          }
          return {
            date_time: moment(t.start_time_utc)
              .tz(keys.stationTimeZone)
              .format('YYYY-M-D h:mm:ss a'),
            event_name: giveaway_details.event_name,
            event_date: moment(giveaway_details.event_date).format('l'),
            venue: giveaway_details.venue,
            winner_name: name,
            winner_phone: phone,
            winner_email: email,
            winner_address: address,
          };
        }),
      );

      return res.status(200).end(csv);
    })
    .catch(err => {
      console.error(err);
      return res.status(422).json(err);
    });
}

module.exports = giveawayExport;
