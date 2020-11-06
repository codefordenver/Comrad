/**
 * @swagger
 *
 * /events/traffic/search-underwriters:
 *   get:
 *     tags:
 *     - Traffic
 *     operationId: SearchUnderwriters
 *     summary: Search Underwriters
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - name: s
 *       in: query
 *       required: true
 *       type: string
 *       description: Find underwriters matching the search string
 *     description: |
 *       Return a list of underwriters matching the search string.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example:
 *                 - Blue Ribbon Farm
 *                 - Grant Farms
 *                 - Grant Family Farms
 *                 - The Farm
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

// searches underwriters
function searchUnderwriters(req, res) {
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

    .aggregate([
      {
        $match: {
          $text: { $search: s },
          'traffic_details.underwriter_name': { $ne: null },
        },
      },
      {
        $project: {
          'traffic_details.underwriter_name': 1,
          score: { $meta: 'textScore' },
        },
      },
      {
        $group: {
          _id: '$traffic_details.underwriter_name',
          score: { $sum: 'score' },
        },
      },
      { $sort: { score: -1 } },
      { $limit: 10 },
      {
        $project: {
          underwriter_name: '$_id',
        },
      },
    ])
    .then(results => {
      res.json(results.map(r => r.underwriter_name));
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ errorMessage: err });
    });
}

module.exports = searchUnderwriters;
