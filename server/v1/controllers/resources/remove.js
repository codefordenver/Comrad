/**
 * @swagger
 *
 * /resources/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5fc9260689069141b89a775c
 *   delete:
 *     tags:
 *     - Resources
 *     operationId: DeleteResource
 *     summary: Delete
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Delete a resource
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               description: "The record that was deleted"
 *               example:
 *                 _id: 5fc928cc6df1040ae4bedf2c
 *                 category: Announcements
 *                 description: Sample Announcement Guidelines
 *                 link: https://getcomrad.org/announcements
 *                 __v: 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       404:
 *         description: Resource does not exist
 *       500:
 *         description: A server error occurred. Check the error message for more details.
 */

const db = require('../../models');

function remove(req, res) {
  db.Resource.findById({ _id: req.params.id })
    .then(dbResource => {
      if (dbResource != null) {
        return dbResource.remove();
      } else {
        return res
          .status(404)
          .json({ errorMessage: 'Resource does not exist' });
      }
    })
    .then(dbResource => res.json(dbResource))
    .catch(err => res.status(500).json({ errorMessage: err }));
}

module.exports = remove;
