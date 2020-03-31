const db = require('../../models');
const {
  utils__mongoose: { populateMasterEvent },
} = require('../events/utils');

const moment = require('moment-timezone');
const keys = require('../../config/keys');
const { Parser } = require('json2csv');

function giveawayExport(req, res) {
  let { from, to } = req.params;

  db.Traffic.find(
    {
      'traffic_details.type': 'Giveaway',
      start_date_utc: { $gte: from },
      end_date_utc: { $lte: to },
    },
    null,
    { sort: { 'traffic_details.giveaway_details.event_date': 1 } },
  )
    .populate(populateMasterEvent())
    .then(trafficEvents => {
      const parser = new Parser();
      const csv = parser.parse(
        trafficEvents.map(t => {
          return {
            date_time: moment(t.start_time_utc)
              .tz(keys.stationTimeZone)
              .format('YYYY-M-D h:mm:ss a'),
            event_name: t.traffic_details.giveaway_details.event_name,
            event_date: moment(
              t.traffic_details.giveaway_details.event_date,
            ).format('l'),
            venue: t.traffic_details.giveaway_details.venue,
            winner_name: t.traffic_details.giveaway_details.winner.name,
            winner_phone: t.traffic_details.giveaway_details.winner.phone,
            winner_email: t.traffic_details.giveaway_details.winner.email,
            winner_address: t.traffic_details.giveaway_details.winner.address,
          };
        }),
      );

      res.setHeader(
        'Content-disposition',
        'attachment; filename=giveaways.csv',
      );
      res.set('Content-Type', 'text/csv');
      return res.status(200).end(csv);
    })
    .catch(err => {
      console.error(err);
      return res.status(422).json(err);
    });
}

module.exports = giveawayExport;
