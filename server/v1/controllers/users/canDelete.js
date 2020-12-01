/**
 * @swagger
 *
 * /users/{id}/can-delete:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f5fdb69e546d851980aa75d
 *   get:
 *     tags:
 *     - Users
 *     operationId: UsersCanDelete
 *     summary: Check if Can Delete
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Returns a value indicating whether the existing user can be deleted. Users can be deleted if they are not hosts of any shows.
 *
 *       The following roles can access this API endpoint: `Admin`
 *     responses:
 *       200:
 *         description: A value indicating whether the user can be deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *               example:
 *                 true
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

function canDelete(req, res) {
  const { id } = req.params;

  db.User.findById(id)
    .then(async dbUser => {
      res.json(await dbUser.canDelete());
    })
    .catch(err => res.status(422).json(err));
}

module.exports = canDelete;
