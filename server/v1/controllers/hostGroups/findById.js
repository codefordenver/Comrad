/**
 * @swagger
 *
 * /host-groups/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f8f42482d687150ac9373ba
 *   get:
 *     tags:
 *     - Host Groups
 *     operationId: FindHostGroupById
 *     summary: Find by Id
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Gets host groups by its id.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 users:
 *                 - 5f720bae0504f73464bd83eb
 *                 - 5f72114fab735642446f64ed
 *                 _id: 5f8f42482d687150ac9373ba
 *                 on_air_name: Sean and Barry
 *                 __v: 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');

function findById(req, res) {
  return db.HostGroup.findOne({ _id: req.params.id })
    .populate('users', { _id: 1, on_air_name: 1 })
    .then(hostGroupData => res.json(hostGroupData))
    .catch(err => res.status(500).json({ errorMessage: err }));
}

module.exports = findById;
