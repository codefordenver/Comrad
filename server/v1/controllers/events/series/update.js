const moment = require('moment-timezone');
const keys = require('../../../config/keys');

const {
  utils: { eventList, getModelForEventType },
  utils__mongoose: {
    populateShowHost,
    populateMasterEvent,
    findEventQueryByDateRange,
  },
} = require('../utils');

async function update(req, res) {
  const { body } = req;
  let {
    body: { startDate, endDate },
  } = req;
  const { eventType, id } = req.params;

  startDate = startDate ? startDate : null;
  endDate = endDate ? endDate : null;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  if (
    (body.start_time_utc && !body.end_time_utc) ||
    (!body.start_time_utc && body.end_time_utc)
  ) {
    return res.status(422).json({
      message:
        'When updating a series with new values for start_time_utc or end_time_utc, you must provide both start_time_utc and end_time_utc, not just one.',
    });
  }

  let oldSeries;
  if (body.start_time_utc && body.end_time_utc) {
    oldSeries = await dbModel.findOne({ _id: id });
  }

  //Need to refresh updated at
  const updateSeries = await dbModel.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });

  //if date/time was changed, update the times of all instances that occur in the future
  if (
    oldSeries != null &&
    (oldSeries.start_time_utc != updateSeries.start_time_utc ||
      oldSeries.end_time_utc != updateSeries.end_time_utc)
  ) {
    // get the offset that the event has changed, adjusting for a day at a time so that we get the time for the current day

    let oldSeriesStartTime = moment(oldSeries.start_time_utc).tz(
      keys.stationTimeZone,
    );
    let oldSeriesStartTimeMinutes =
      oldSeriesStartTime.hours() * 60 + oldSeriesStartTime.minutes();
    let updateSeriesStartTime = moment(updateSeries.start_time_utc).tz(
      keys.stationTimeZone,
    );
    let updateSeriesStartTimeMinutes =
      updateSeriesStartTime.hours() * 60 + updateSeriesStartTime.minutes();
    //account for if the time has changed beyond midnight
    // sample calculations:
    // was 5pm, now 4pm, differenceStartTime = -60
    // was 3pm, now 5pm, differenceStartTime = 120
    // was 1am, now 11pm, differenceStartTime = 1320, then change it to -120
    // was 11pm, now 1am, differenceStartTime = -1320, then change it to +120
    let differenceStartTime =
      updateSeriesStartTimeMinutes - oldSeriesStartTimeMinutes;
    if (differenceStartTime > 720) {
      differenceStartTime = differenceStartTime - 1440;
    } else if (differenceStartTime < -720) {
      differenceStartTime = differenceStartTime + 1440;
    }

    let oldSeriesEndTime = moment(oldSeries.end_time_utc).tz(
      keys.stationTimeZone,
    );
    let oldSeriesEndTimeMinutes =
      oldSeriesEndTime.hours() * 60 + oldSeriesEndTime.minutes();
    let updateSeriesEndTime = moment(updateSeries.end_time_utc).tz(
      keys.stationTimeZone,
    );
    let updateSeriesEndTimeMinutes =
      updateSeriesEndTime.hours() * 60 + updateSeriesEndTime.minutes();
    //account for if the time has changed beyond midnight
    let differenceEndTime =
      updateSeriesEndTimeMinutes - oldSeriesEndTimeMinutes;
    if (differenceEndTime > 720) {
      differenceEndTime = differenceEndTime - 1440;
    } else if (differenceEndTime < -720) {
      differenceEndTime = differenceEndTime + 1440;
    }
    let documentsToUpdate = await dbModel.find({
      master_event_id: id,
      start_time_utc: { $gte: oldSeries.start_time_utc },
      status: 'active',
    });
    console.log({
      master_event_id: id,
      start_time_utc: { $gte: oldSeries.start_time_utc },
      status: 'active',
    });
    for (let i = 0; i < documentsToUpdate.length; i++) {
      let d = documentsToUpdate[i];
      await dbModel.update(
        { _id: d._id },
        {
          $set: {
            start_time_utc:
              d.start_time_utc.getTime() + differenceStartTime * 60 * 1000,
            replace_event_date:
              d.replace_event_date.getTime() + differenceStartTime * 60 * 1000,
            end_time_utc:
              d.end_time_utc.getTime() + differenceEndTime * 60 * 1000,
          },
        },
      );
    }
  }

  if (startDate && endDate) {
    let filter = {
      $and: [
        findEventQueryByDateRange(startDate, endDate)[0],
        {
          $or: [{ _id: id }, { master_event_id: id }],
        },
      ],
    };
    let showResults = await dbModel
      .find(filter)
      .populate(populateShowHost())
      .populate(populateMasterEvent())
      .catch(function(err) {
        console.log('error updating series:');
        console.log(err);
      });
    res.json(eventList(showResults, startDate, endDate));
  } else {
    return res.json(updateSeries);
  }
}

module.exports = update;
