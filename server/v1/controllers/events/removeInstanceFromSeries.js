/**
 * @swagger
 *
 * /events/shows/{id}/remove-instance-from-series:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f7211d1ab735642446f672c
 *     description: The id of the show series
 *   delete:
 *     tags:
 *     - Shows
 *     operationId: DeleteInstanceFromShowSeries
 *     summary: Delete Instance from Series
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Creates an exceptioin to a series's usual repeat rule so that there will not be a show instance at the specified date/time.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 repeat_rule:
 *                   byweekday: []
 *                   repeat_start_date: '2020-11-09T16:30:00.000Z'
 *                   repeat_end_date: '2020-11-09T19:06:00.000Z'
 *                 show_details:
 *                   host_type: User
 *                   guests: []
 *                 status: deleted
 *                 _id: 5fa9377600452c4f3cf2c87b
 *                 master_event_id: 5f7211d1ab735642446f672c
 *                 start_time_utc: '2020-11-09T16:30:00.000Z'
 *                 end_time_utc: '2020-11-09T19:06:00.000Z'
 *                 replace_event_date: '2020-11-09T16:30:00.000Z'
 *                 is_recurring: false
 *                 created_at: '2020-11-09T12:35:02.033Z'
 *                 updated_at: '2020-11-09T12:35:02.033Z'
 *                 __v: 0
 *                 master_time_id: 5f7211d1ab735642446f672c-1604939400000
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 * /events/traffic/{id}/remove-instance-from-series:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f7211f2ab735642446feead
 *     description: The id of the traffic series
 *   delete:
 *     tags:
 *     - Traffic
 *     operationId: DeleteInstanceFromTrafficSeries
 *     summary: Delete Instance from Series
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Creates an exceptioin to a series's usual repeat rule so that there will not be a traffic instance at the specified date/time.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 repeat_rule:
 *                   byweekday: []
 *                   repeat_start_date: '2020-11-09T16:00:00.000Z'
 *                   repeat_end_date: '2020-11-09T16:01:00.000Z'
 *                 status: deleted
 *                 _id: 5fa94dcd72207e3b289d5197
 *                 master_event_id: 5f7211f2ab735642446feead
 *                 start_time_utc: '2020-11-09T16:00:00.000Z'
 *                 end_time_utc: '2020-11-09T16:01:00.000Z'
 *                 replace_event_date: '2020-11-09T16:00:00.000Z'
 *                 is_recurring: false
 *                 created_at: '2020-11-09T14:10:21.299Z'
 *                 updated_at: '2020-11-09T14:10:21.299Z'
 *                 __v: 0
 *                 master_time_id: 5f7211f2ab735642446feead-1604937600000
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 */

const {
  utils: { getModelForEventType },
} = require('./utils');
const { master_time_id__byEventType } = require('./utils/utils__mongoose');

async function removeInstanceFromSeries(req, res) {
  const { eventType } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  //Create show with status 'deleted' and then return it to the front end.
  const { start_time_utc, end_time_utc } = req.body;
  const { id } = req.params;

  const seriesData = await dbModel.findOne({ _id: id }).lean();

  if (seriesData._id) {
    const newInstance = {
      master_event_id: seriesData._id,
      status: 'deleted',
      start_time_utc: start_time_utc,
      end_time_utc: end_time_utc,
      repeat_rule: {
        repeat_start_date: start_time_utc,
        repeat_end_date: end_time_utc,
      },
      replace_event_date: start_time_utc,
      is_recurring: false,
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    const show = await dbModel.create(newInstance);
    let returnedShow = show.toObject();
    returnedShow.master_time_id = master_time_id__byEventType(returnedShow);
    res.json(returnedShow);
  } else {
    res.status(404).send('The series show does not exist');
  }
}

module.exports = removeInstanceFromSeries;
