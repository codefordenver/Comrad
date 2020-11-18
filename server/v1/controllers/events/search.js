/**
 * @swagger
 *
 * /events/shows:
 *   get:
 *     tags:
 *     - Shows
 *     operationId: SearchShows
 *     summary: Search
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - name: s
 *       in: query
 *       required: true
 *       type: string
 *       description: Find series matching this search string
 *     description: |
 *       Search for a show series, looking for the provided search string in the show title.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 schema:
 *                   $ref: '#/components/schemas/Show'
 *                 example:
 *                 - show_details:
 *                     host_type: User
 *                     title: Sleepless Nights
 *                     summary: Late night freeform radio
 *                     description: "<p>This freeform show makes room for everything, combining the aesthetics
 *                       of the Morning and Afternoon shows and leaving the door open for more extreme
 *                       and intense audio excursions.</p>"
 *                     producer:
 *                     host:
 *                     custom:
 *                       record_audio: '1'
 *                       url: sleepless
 *                       source: KGNU
 *                   _id: 5f7211d1ab735642446f66f8
 *                   start_time_utc: '2011-03-27T06:00:00.000Z'
 *                   score: 0.75
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the parameters you provided. See response for more details
 *       500:
 *         description: Server error. Check the response for more details.
 * /events/traffic/search:
 *   get:
 *     tags:
 *     - Traffic
 *     operationId: SearchTraffic
 *     summary: Search
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - name: s
 *       in: query
 *       required: true
 *       type: string
 *       description: Find series matching this search string
 *     description: |
 *       Search for a traffic series, looking for the provided search string in the traffic title.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 schema:
 *                   $ref: '#/components/schemas/Traffic'
 *                 example:
 *                 - traffic_details:
 *                     type: Underwriting
 *                     title: Rocky Mountain Oysters
 *                     description: "<p>Description of the underwriting event</p>"
 *                     producer:
 *                     custom:
 *                       custom_property: test
 *                     underwriter_name: Rocky Mountain Oysters
 *                   _id: 5f7211f4ab735642446ff94a
 *                   start_time_utc: '2013-06-11T01:00:00.000Z'
 *                   score: 1.3333333333333333
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the parameters you provided. See response for more details
 *       500:
 *         description: Server error. Check the response for more details.
 */

const {
  utils: { getModelForEventType },
} = require('./utils');

// searches the series titles
function search(req, res) {
  let { s } = req.query;
  const { eventType } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  if (typeof s === 'undefined' || s.length === 0) {
    return res
      .status(422)
      .json({ errorMessage: 'Please provide a search string' });
  }

  dbModel
    .find(
      {
        $text: { $search: s },
        master_event_id: null, // only find series, not instances
      },
      {
        _id: 1,
        traffic_details: 1,
        show_details: 1,
        start_time_utc: 1,
        score: { $meta: 'textScore' },
      },
      {
        sort: { score: { $meta: 'textScore' } },
        limit: 10,
      },
    )
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ errorMessage: err });
    });
}

module.exports = search;
