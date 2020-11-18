/**
 * @swagger
 *
 * /host-groups/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f8f42482d687150ac9373ba
 *   delete:
 *     tags:
 *     - Host Groups
 *     operationId: DeleteHostGroup
 *     summary: Delete
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Deletes a host group by its id.
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
 *                 on_air_name: Prairie Lakes Band
 *                 __v: 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: The host group cannot be deleted. Check the response for more details.
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');

function remove(req, res) {
  return db.HostGroup.findOne({ _id: req.params.id })
    .then(hostGroupData => {
      return db.Show.findOne({
        'show_details.host': req.params.id,
        'show_details.host_type': 'HostGroup',
      })
        .then(showReferencingHostGroup => {
          if (showReferencingHostGroup != null) {
            throw 'This host group cannot be deleted because it is used for a show.';
          }
          hostGroupData
            .remove()
            .then(removeData => res.json(hostGroupData))
            .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(500).json({ errorMessage: err }));
    })
    .catch(err => res.status(500).json({ errorMessage: err }));
}

module.exports = remove;
