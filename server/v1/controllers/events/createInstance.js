/**
 * @swagger
 *
 * /events/shows/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f7211d1ab735642446f66f8
 *     description: The id of the show series
 *   post:
 *     tags:
 *     - Shows
 *     operationId: CreateInstanceShow
 *     summary: Create Instance from Series
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Creates an instance for the show series
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`. In addition, `DJ` users can access this endpoint for show series on which they are the host.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               start_time_utc: "2020-11-03T16:30:00Z"
 *               end_time_utc: "2020-11-03T18:00:00Z"
 *               show_details:
 *                 host: "5f720bae0504f73464bd83eb"
 *         required: true
 *         description: The start date and time of the show instance. Can also optionally include a host.
 *     responses:
 *       200:
 *         description: The populated show record of the newly created instance
 *         content:
 *           application/json:
 *             schema:
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
 *                   guests: []
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
 *       500:
 *         description: A server error occurred. Check the response for more details.
 * /events/traffic/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f7211f2ab735642446fee9c
 *     description: The id of the traffic series
 *   put:
 *     tags:
 *     - Traffic
 *     operationId: CreateInstanceTraffic
 *     summary: Create Instance from Series
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Creates an instance for the traffic series
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Underwriting`.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               start_time_utc: "2020-11-03T22:00:00.000Z"
 *               end_time_utc: "2020-11-03T22:00:00.000Z"
 *         required: true
 *         description: The start date and time of the traffic event instance.
 *     responses:
 *       200:
 *         description: The populated show record of the newly created instance
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *               - repeat_rule:
 *                   byweekday: []
 *                   repeat_start_date: '2020-11-03T22:00:00.000Z'
 *                   frequency: 3
 *                   repeat_end_date: '2020-11-03T22:00:00.000Z'
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
 *                     description: '"KGNU, Boulder, Denver and Fort Collins"'
 *                     producer:
 *                     custom:
 *                       old_comrad_event_id: '2'
 *                       old_comrad_scheduled_event_ids:
 *                       - '297'
 *                   status: active
 *                   _id: 5f7211f2ab735642446fee9c
 *                   start_time_utc: '2011-05-30T21:00:00.000Z'
 *                   end_time_utc: '2011-05-30T21:01:00.000Z'
 *                   is_recurring: true
 *                   created_at: '2020-09-28T16:40:18.625Z'
 *                   updated_at: '2020-09-28T16:40:18.625Z'
 *                   __v: 0
 *                 replace_event_date: '2020-11-03T22:00:00.000Z'
 *                 traffic_details:
 *                   type: Legal ID
 *                   title: Legal Id
 *                   description: '"KGNU, Boulder, Denver and Fort Collins"'
 *                   producer:
 *                   custom:
 *                     old_comrad_event_id: '2'
 *                     old_comrad_scheduled_event_ids:
 *                     - '297'
 *                 master_time_id: 5f7211f2ab735642446fee9c-1604440800000
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the data you provided. Check the response for more details.
 *       500:
 *         description: A server error occurred. Check the response for more details.
 */

const mongoose = require('mongoose');

const {
  utils: { getModelForEventType, eventList },
  utils__mongoose: { determineHostType, populateShowHost, populateMasterEvent },
} = require('./utils');

function createInstance(req, res) {
  const { start_time_utc, end_time_utc } = req.body;
  const { id, eventType } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  determineHostType(req.body)
    .then(body => {
      dbModel.findById(id).exec(function(err, doc) {
        let d1 = doc;
        d1._id = mongoose.Types.ObjectId();
        d1.master_event_id = id;
        if (eventType === 'shows') {
          //Set show_details to an empty object first so it will inherit any updates on the master series
          d1.show_details = { host_type: body.show_details.host_type };
          //Add only the new host if available
          if (body.show_details != null) {
            d1.show_details.host = body.show_details.host;
          }
        } else {
          d1.traffic_details = {};
        }
        //Fill in remaining time details of instance
        d1.start_time_utc = start_time_utc;
        d1.end_time_utc = end_time_utc;
        d1.repeat_rule.repeat_start_date = start_time_utc;
        d1.repeat_rule.repeat_end_date = end_time_utc;
        d1.replace_event_date = start_time_utc;
        d1.is_recurring = false;
        d1.created_at = Date.now();
        d1.updated_at = Date.now();
        d1.isNew = true;
        d1.save()
          .then(dbShow => {
            //query the database for the new record: dbShow will not be correct, because it
            //sets an array for "guests" rather than leaving "guests" as undefined (the array's
            //default value)
            dbModel.findOne({ _id: dbShow._id }).then(dbShow => {
              dbModel.populate(dbShow, populateShowHost()).then(dbShow => {
                dbModel
                  .populate(dbShow, populateMasterEvent())
                  .then(dbShow => {
                    res.json(eventList(dbShow, start_time_utc, end_time_utc));
                  })
                  .catch(err => {
                    res.status(500).json({ errorMessage: err });
                  });
              });
            });
          })
          .catch(err => res.status(500).json({ errorMessage: err }));
      });
    })
    .catch(err => res.status(500).json({ errorMessage: err }));
}

module.exports = createInstance;
