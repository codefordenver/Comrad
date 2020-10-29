/**
 * @swagger
 *
 * /host-groups/all:
 *   get:
 *     tags:
 *     - Host Groups
 *     operationId: FindHostGroup
 *     summary: Find All
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Returns a list of all host groups, sorted by their on-air name.
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
 *               - users:
 *                 - 5f720bae0504f73464bd83eb
 *                 - 5f72114fab735642446f64ed
 *                 _id: 5f8f42482d687150ac9373bb
 *                 on_air_name: The Way Low Down
 *                 __v: 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');

function findAll(req, res) {
  return db.HostGroup.find({}, null, { sort: { on_air_name: 1 } })
    .then(dbHostGroups => res.json(dbHostGroups))
    .catch(err => res.status(500).json(err));
}

module.exports = findAll;
