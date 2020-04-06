const db = require('../../models');
const {
  utils__mongoose: { findEventQueryByDateRange, populateMasterEvent },
  utils: { getModelForEventType, eventList },
} = require('../events/utils');

const moment = require('moment-timezone');
const keys = require('../../config/keys');
const { Parser } = require('json2csv');

function underwritingExport(req, res) {
  let { from, to, underwriter } = req.query;

  let filterObj = {
    $and: [
      { 'traffic_details.type': 'Underwriting' },
      findEventQueryByDateRange(from, to),
    ],
  };

  if (underwriter != null && underwriter.length > 0) {
    filterObj.$and.push({ 'traffic_details.underwriter_name': underwriter });
  }

  db.Traffic.find(filterObj, null, { sort: { start_time_utc: 1 } })
    .populate(populateMasterEvent())
    .then(trafficEvents => {
      res.setHeader(
        'Content-disposition',
        'attachment; filename=underwriting.csv',
      );
      res.set('Content-Type', 'text/csv');
      if (trafficEvents.length === 0) {
        return res.status(200).end('date_time,underwriter_name');
      }

      trafficEvents = eventList(trafficEvents, from, to);

      //find executed times for each event
      db.Playlist.aggregate([
        { $unwind: { path: '$saved_items' } },
        {
          $match: {
            'saved_items.traffic': { $in: trafficEvents.map(t => t._id) },
          },
        },
        {
          $group: {
            _id: '$saved_items.master_time_id',
            executed_time_utc: { $addToSet: '$saved_items.executed_time_utc' },
          },
        },
      ])
        .then(playlistEvents => {
          let trafficWithExecutedTime = [];
          trafficEvents.forEach(t => {
            let playlistEvent = playlistEvents.filter(
              p => p._id === t.master_time_id,
            );
            if (playlistEvent.length > 1) {
              console.error('unxpected number of playlist events');
              t.executed_time_utc = null;
            } else if (playlistEvent.length === 1) {
              if (playlistEvent[0].executed_time_utc.length > 1) {
                console.error('unexpected number of executed_time_utc entries');
              }
              t.executed_time_utc = playlistEvent[0].executed_time_utc[0];
            } else {
              t.executed_time_utc = null;
            }
            trafficWithExecutedTime.push(t);
          });
          const parser = new Parser();
          const csv = parser.parse(
            trafficWithExecutedTime.map(t => {
              return {
                date_time: moment(t.start_time_utc)
                  .tz(keys.stationTimeZone)
                  .format('YYYY-M-D h:mm:ss a'),
                underwriter_name: t.traffic_details.underwriter_name,
                executed_time:
                  t.executed_time_utc != null
                    ? moment(t.executed_time_utc)
                        .tz(keys.stationTimeZone)
                        .format('YYYY-M-D h:mm:ss a')
                    : '',
              };
            }),
          );

          return res.status(200).end(csv);
        })
        .catch(err => {
          console.error(err);
          return res.status(422).json(err);
        });
    })
    .catch(err => {
      console.error(err);
      return res.status(422).json(err);
    });
}

module.exports = underwritingExport;
