/**
 * @swagger
 *
 * /host-groups/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f8f42482d687150ac9373ba
 *   put:
 *     tags:
 *     - Host Groups
 *     operationId: UpdateHostGroup
 *     summary: Update
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Updates a host group by its id.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             "on_air_name": "Prairie Lakes Band"
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
 *                 on_air_name: Prairie Lakes Band
 *                 __v: 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');

function update(req, res) {
  return db.HostGroup.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then(dbHostGroup =>
      dbHostGroup.populate('users', { on_air_name: 1, _id: 1 }),
    )
    .then(dbHostGroup => res.json(dbHostGroup))
    .catch(err => {
      console.error(err);
      res.status(500).json({
        errorMessage: err,
      });
    });
}

module.exports = update;
