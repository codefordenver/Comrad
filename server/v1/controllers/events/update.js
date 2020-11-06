/**
 * @swagger
 *
 * /events/shows/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f35a3e7783e63454ccdd9d9
 *     description: The id of the show series or instance to update
 *   put:
 *     tags:
 *     - Shows
 *     operationId: UpdateShow
 *     summary: Update
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Update a show series or show instance.
 *
 *       If the time of a show series is updated with a new start/end time, the start/end time of all future occurrences will also be updated.
 *
 *       If `startDate` and `endDate` are provided in the request body, the API endpoint will return the show instances that occur between the start date and end date.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`. In addition, `DJ` users can access this endpoint for show series on which they are the host.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             show_details:
 *               guests:
 *               - Sample guest 1
 *               - Sample guest 2
 *       required: true
 *       description: "JSON object of properties to update"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               description: "The updated record. If an instance, the result will have information populated from the series."
 *               example:
 *               - repeat_rule:
 *                   byweekday:
 *                   - MO
 *                   - TU
 *                   - WE
 *                   - TH
 *                   - FR
 *                   repeat_start_date: '2020-11-03T16:30:00.000Z'
 *                   frequency: 2
 *                   repeat_end_date: '2020-11-03T18:00:00.000Z'
 *                 show_details:
 *                   host_type: User
 *                   guests:
 *                   - Sample guest 1
 *                   - Sample guest 2
 *                   title: Morning Sound Alternative
 *                   summary: Diverse and eclectic sounds, on the mellow side.
 *                   description: "<p>Diverse and eclectic sounds, on the mellow side. You'll hear
 *                     everything from Ambient Electronics to Reggae to Folk.</p>"
 *                   producer:
 *                   host:
 *                     on_air_name: DJ Cool Software
 *                     _id: 5f720bae0504f73464bd83eb
 *                     first_name: Comrad
 *                     last_name: Develpment
 *                   custom:
 *                     record_audio: '1'
 *                     url: morningsound
 *                     source: KGNU
 *                 status: active
 *                 _id: 5fa17ce4f13d484dc0922aef
 *                 start_time_utc: '2020-11-03T16:30:00Z'
 *                 end_time_utc: '2020-11-03T18:00:00Z'
 *                 is_recurring: false
 *                 created_at: '2020-11-03T15:53:08.207Z'
 *                 updated_at: '2020-11-03T15:53:08.207Z'
 *                 __v: 0
 *                 master_event_id:
 *                   repeat_rule:
 *                     byweekday:
 *                     - MO
 *                     - TU
 *                     - WE
 *                     - TH
 *                     - FR
 *                     repeat_start_date: '2011-03-28T15:30:00.000Z'
 *                     frequency: 2
 *                     repeat_end_date: '9999-01-01T06:00:00.000Z'
 *                   show_details:
 *                     host_type: User
 *                     guests:
 *                     -
 *                     title: Morning Sound Alternative
 *                     summary: Diverse and eclectic sounds, on the mellow side.
 *                     description: "<p>Diverse and eclectic sounds, on the mellow side. You'll hear
 *                       everything from Ambient Electronics to Reggae to Folk.</p>"
 *                     producer:
 *                     host:
 *                     custom:
 *                       record_audio: '1'
 *                       url: morningsound
 *                       source: KGNU
 *                   status: active
 *                   _id: 5f7211d1ab735642446f672c
 *                   start_time_utc: '2011-03-28T15:30:00.000Z'
 *                   end_time_utc: '2011-03-28T18:06:00.000Z'
 *                   is_recurring: true
 *                   created_at: '2020-09-28T16:39:45.464Z'
 *                   updated_at: '2020-09-28T16:39:45.464Z'
 *                   __v: 0
 *                 replace_event_date: '2020-11-03T16:30:00.000Z'
 *                 master_time_id: 5f7211d1ab735642446f672c-1604421000000
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the data you provided. Check the response for more details.
 * /events/traffic/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f7211f2ab735642446fee9c
 *     description: The id of the traffic series or instance to update
 *   put:
 *     tags:
 *     - Traffic
 *     operationId: UpdateTraffic
 *     summary: Update
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Update a traffic series or show instance.
 *
 *       If the time of a traffic series is updated with a new start/end time, the start/end time of all future occurrences will also be updated.
 *
 *       If `startDate` and `endDate` are provided in the request body, the API endpoint will return the show instances that occur between the start date and end date.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Underwriting`.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             traffic_details:
 *               description: This is an updated description
 *       required: true
 *       description: "JSON object of properties to update"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               description: "The updated record. If an instance, the result will have information populated from the series."
 *               example:
 *               - repeat_rule:
 *                   byweekday: []
 *                   repeat_start_date: '2020-11-03T22:00:00.000Z'
 *                   frequency: 3
 *                   repeat_end_date: '2020-11-03T22:00:00.000Z'
 *                 traffic_details:
 *                   type: Legal ID
 *                   title: Legal Id
 *                   description: This is an updated description
 *                   producer:
 *                   custom:
 *                     custom_property: custom value
 *                 status: active
 *                 _id: 5fa180826a7cc716704afe0f
 *                 start_time_utc: '2020-11-03T22:00:00Z'
 *                 end_time_utc: '2020-11-03T22:00:00Z'
 *                 is_recurring: false
 *                 created_at: '2020-11-03T16:08:34.371Z'
 *                 updated_at: '2020-11-03T16:08:34.371Z'
 *                 __v: 0
 *                 master_event_id:
 *                   repeat_rule:
 *                     byweekday: []
 *                     repeat_start_date: '2011-05-30T21:00:00.000Z'
 *                     frequency: 3
 *                     repeat_end_date: '9999-01-01T06:00:00.000Z'
 *                   traffic_details:
 *                     type: Legal ID
 *                     title: Legal Id
 *                     description: test desc
 *                     producer:
 *                     custom:
 *                       custom_property: custom value
 *                   status: active
 *                   _id: 5f7211f2ab735642446fee9c
 *                   start_time_utc: '2011-05-30T21:00:00.000Z'
 *                   end_time_utc: '2011-05-30T21:01:00.000Z'
 *                   is_recurring: true
 *                   created_at: '2020-09-28T16:40:18.625Z'
 *                   updated_at: '2020-09-28T16:40:18.625Z'
 *                   __v: 0
 *                 replace_event_date: '2020-11-03T22:00:00.000Z'
 *                 master_time_id: 5f7211f2ab735642446fee9c-1604440800000
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the data you provided. Check the response for more details.
 */

const moment = require('moment-timezone');
const keys = require('../../config/keys');

const {
  utils: { eventList, getModelForEventType },
  utils__mongoose: {
    determineHostType,
    findEventQueryByDateRange,
    populateShowHost,
    populateMasterEvent,
  },
} = require('./utils');

async function update(req, res) {
  let { body } = req;
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

  let originalEvent = await dbModel.findOne({ _id: id });

  if (originalEvent.master_event_id != null) {
    // we are updating a series, so we will need to check a few extra things

    if (
      (body.start_time_utc && !body.end_time_utc) ||
      (!body.start_time_utc && body.end_time_utc)
    ) {
      return res.status(422).json({
        message:
          'When updating a series with new values for start_time_utc or end_time_utc, you must provide both start_time_utc and end_time_utc, not just one.',
      });
    }

    //update repeat rule, if it was changed
    if ('repeat_rule_dropdown_value' in body) {
      if (typeof originalEvent === 'undefined') {
        originalEvent = await dbModel.findOne({ _id: id });
      }
      body.repeat_rule = originalEvent.repeat_rule;
      body.repeat_rule = {
        ...originalEvent.repeat_rule,
        ...JSON.parse(body.repeat_rule_dropdown_value),
      };
      if ('repeat_rule.repeat_end_date' in body) {
        if (body['repeat_rule.repeat_end_date'] !== null) {
          if (!('repeat_rule' in body)) {
            body.repeat_rule = {};
          }
          body.repeat_rule.repeat_end_date =
            body['repeat_rule.repeat_end_date'];
        }
        delete body['repeat_rule.repeat_end_date'];
      }
      if ('repeat_rule.repeat_start_date' in body) {
        if (body['repeat_rule.repeat_start_date'] !== null) {
          if (!('repeat_rule' in body)) {
            body.repeat_rule = {};
          }
          body.repeat_rule.repeat_start_date =
            body['repeat_rule.repeat_start_date'];
        }
        delete body['repeat_rule.repeat_start_date'];
      }
    }
  }

  // unfold the show_details and traffic_details objects so it does not overrwrite any existing fields
  if (typeof body.show_details === 'object') {
    Object.keys(body.show_details).forEach(function(key) {
      body['show_details.' + key] = body.show_details[key];
    });
    delete body.show_details;
  }
  if (typeof body.traffic_details === 'object') {
    Object.keys(body.traffic_details).forEach(function(key) {
      body['traffic_details.' + key] = body.traffic_details[key];
    });
    delete body.traffic_details;
  }

  body = await determineHostType(body);

  console.log('updating event');
  console.log(body);

  const updatedEvent = await dbModel.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });

  console.log('finished updating event');

  if (originalEvent.master_event_id != null) {
    // we are updating a series, so we will need to check a few extra things

    //if date/time was changed, update the times of all instances that occur in the future
    if (
      originalEvent != null &&
      (originalEvent.start_time_utc !== updatedEvent.start_time_utc ||
        originalEvent.end_time_utc !== updatedEvent.end_time_utc)
    ) {
      // get the offset that the event has changed, adjusting for a day at a time so that we get the time for the current day

      let originalEventStartTime = moment(originalEvent.start_time_utc).tz(
        keys.stationTimeZone,
      );
      let originalEventStartTimeMinutes =
        originalEventStartTime.hours() * 60 + originalEventStartTime.minutes();
      let updatedEventStartTime = moment(updatedEvent.start_time_utc).tz(
        keys.stationTimeZone,
      );
      let updatedEventStartTimeMinutes =
        updatedEventStartTime.hours() * 60 + updatedEventStartTime.minutes();
      //account for if the time has changed beyond midnight
      // sample calculations:
      // was 5pm, now 4pm, differenceStartTime = -60
      // was 3pm, now 5pm, differenceStartTime = 120
      // was 1am, now 11pm, differenceStartTime = 1320, then change it to -120
      // was 11pm, now 1am, differenceStartTime = -1320, then change it to +120
      let differenceStartTime =
        updatedEventStartTimeMinutes - originalEventStartTimeMinutes;
      if (differenceStartTime > 720) {
        differenceStartTime = differenceStartTime - 1440;
      } else if (differenceStartTime < -720) {
        differenceStartTime = differenceStartTime + 1440;
      }

      let originalEventEndTime = moment(originalEvent.end_time_utc).tz(
        keys.stationTimeZone,
      );
      let originalEventEndTimeMinutes =
        originalEventEndTime.hours() * 60 + originalEventEndTime.minutes();
      let updatedEventEndTime = moment(updatedEvent.end_time_utc).tz(
        keys.stationTimeZone,
      );
      let updatedEventEndTimeMinutes =
        updatedEventEndTime.hours() * 60 + updatedEventEndTime.minutes();
      //account for if the time has changed beyond midnight
      let differenceEndTime =
        updatedEventEndTimeMinutes - originalEventEndTimeMinutes;
      if (differenceEndTime > 720) {
        differenceEndTime = differenceEndTime - 1440;
      } else if (differenceEndTime < -720) {
        differenceEndTime = differenceEndTime + 1440;
      }
      let documentsToUpdate = await dbModel.find({
        master_event_id: id,
        start_time_utc: { $gte: originalEvent.start_time_utc },
        status: 'active',
      });
      console.log({
        master_event_id: id,
        start_time_utc: { $gte: originalEvent.start_time_utc },
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
                d.replace_event_date.getTime() +
                differenceStartTime * 60 * 1000,
              end_time_utc:
                d.end_time_utc.getTime() + differenceEndTime * 60 * 1000,
            },
          },
        );
      }
    }
  }

  if (!startDate || !endDate) {
    startDate = updatedEvent.start_time_utc;
    endDate = updatedEvent.end_time_utc;
  }

  let filter = {
    $and: [
      findEventQueryByDateRange(startDate, endDate),
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
}

module.exports = update;
