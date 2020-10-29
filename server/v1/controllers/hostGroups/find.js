/**
 * @swagger
 *
 * /host-groups/:
 *   get:
 *     tags:
 *     - Host Groups
 *     operationId: FindHostGroup
 *     summary: Find by Hosts
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - name: host[]
 *       in: query
 *       required: true
 *       description: Ids of users that must be represented in the host group. Pass multiple values as ?host[]=IdOfFirstHost&host[]=IdOfSecondHost
 *       example: 5f720bae0504f73464bd83eb
 *     description: |
 *       Gets host groups that exactly match all of the provided user ids.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *               - users:
 *                 - 5f720bae0504f73464bd83eb
 *                 - 5f72114fab735642446f64ed
 *                 _id: 5f8f42482d687150ac9373ba
 *                 on_air_name: Sean and Barry
 *                 __v: 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the data you provided. Check the response for more details.
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');

function find(req, res) {
  if (typeof req.query.host === 'undefined') {
    res.status(422).json({
      errorMessage: 'host parameter is required',
    });
    return;
  }

  return db.HostGroup.find({
    users: { $all: req.query.host, $size: req.query.host.length },
  })
    .then(dbHostGroups => res.json(dbHostGroups))
    .catch(err => res.status(500).json(err));
}

module.exports = find;
