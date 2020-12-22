/**
 * @swagger
 *
 * /events/shows/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f7211d1ab735642446f66f8
 *     description: The id of the show
 *   delete:
 *     tags:
 *     - Shows
 *     operationId: DeleteShow
 *     summary: Delete
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Deletes a show with the specified ID. Returns the deleted show.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 _id: 5fa4a53f65691339fcda6c10
 *                 repeat_rule:
 *                   byweekday: []
 *                 show_details:
 *                   host_type: User
 *                   guests: []
 *                   title: test show
 *                 status: deleted
 *                 start_time_utc: '2020-10-28T11:00:00.000Z'
 *                 end_time_utc: '2020-10-28T12:00:00.000Z'
 *                 created_at: '2020-11-06T01:22:07.965Z'
 *                 updated_at: '2020-11-06T01:22:07.965Z'
 *                 __v: 0
 *                 master_time_id: 5fa4a53f65691339fcda6c10
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 * /events/traffic/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f7211f4ab735642446ff94a
 *     description: The id of the traffic
 *   delete:
 *     tags:
 *     - Traffic
 *     operationId: DeleteTraffic
 *     summary: Delete
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Deletes the traffic event with the specified ID
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Underwriting`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 _id: 5fa180826a7cc716704afe0f
 *                 repeat_rule:
 *                   byweekday: []
 *                   repeat_start_date: '2020-11-03T22:00:00.000Z'
 *                   frequency: 3
 *                   repeat_end_date: '2020-11-03T22:00:00.000Z'
 *                 status: deleted
 *                 start_time_utc: '2020-11-03T22:00:00.000Z'
 *                 end_time_utc: '2020-11-03T22:00:00.000Z'
 *                 is_recurring: false
 *                 created_at: '2020-11-03T16:08:34.371Z'
 *                 updated_at: '2020-11-03T16:08:34.371Z'
 *                 __v: 0
 *                 master_event_id: 5f7211f2ab735642446fee9c
 *                 replace_event_date: '2020-11-03T22:00:00.000Z'
 *                 traffic_details:
 *                   description: This is an updated description
 *                 master_time_id: 5f7211f2ab735642446fee9c-1604440800000
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 */

const {
  utils: { getModelForEventType },
  utils__mongoose: { master_time_id__byEventType },
} = require('./utils');

async function remove(req, res) {
  const { eventType } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  const show = await dbModel.updateOne(
    { _id: req.params.id },
    {
      status: 'deleted',
    },
  );

  const removedShow = await dbModel.findById({ _id: req.params.id }).lean();

  if (removedShow === null) {
    res.send(404);
    return;
  }

  if (
    typeof removedShow.master_event_id === 'undefined' ||
    removedShow.master_event_id === null
  ) {
    //we removed a series
    //Set masterShow and any instance shows by the master_event_id to status: 'deleted'
    await dbModel.updateMany(
      { master_event_id: req.params.id },
      {
        status: 'deleted',
      },
    );
  }

  removedShow.master_time_id = master_time_id__byEventType(removedShow);
  res.json(removedShow);
}

module.exports = remove;
