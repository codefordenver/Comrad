/**
 * @swagger
 *
 * /host-groups/:
 *   post:
 *     tags:
 *     - Host Groups
 *     operationId: CreateHostGroup
 *     summary: Create
 *     security:
 *     - ApiKeyAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HostGroup'
 *         required: true
 *         description: "Host Group object to be added"
 *     description: |
 *       Create a host group.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`
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
 *       422:
 *         description: There was an issue with the data you provided. Check the response for more details.
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');

function create(req, res) {
  if (typeof req.body.on_air_name === 'undefined') {
    res.status(422).json({
      errorMessage: 'on_air_name is required',
    });
    return;
  }
  if (typeof req.body.users === 'undefined' || req.body.users.length === 0) {
    res.status(422).json({
      errorMessage: 'users is required',
    });
    return;
  }

  return db.HostGroup.create(req.body)
    .then(dbHostGroup => res.json(dbHostGroup))
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: 'Error creating host group' });
    });
}

module.exports = create;
