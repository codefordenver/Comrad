/**
 * @swagger
 *
 * /users/{id}/api-key:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f5fdb69e546d851980aa75d
 *   delete:
 *     tags:
 *     - Users
 *     operationId: UsersDeleteApiKey
 *     summary: Delete API Key
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Deletes the API key for the specified user.
 *
 *       The following roles can access this API endpoint: `Admin`
 *     responses:
 *       200:
 *         description: The user's API key was deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 api_key:
 *                   last_used:
 *                   token:
 *                 on_air_name:
 *                 primary_phone:
 *                 roles: []
 *                 status: Active
 *                 _id: 5fb6dd9becaa3904742d2339
 *                 email: s2@getcomrad.org
 *                 first_name: Sean
 *                 last_name: Williams
 *                 __v: 0
 *                 can_delete: true
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');

async function removeApiKey(req, res) {
  const _id = req.params.id;

  db.User.findByIdAndUpdate(
    { _id },
    {
      api_key: {
        last_used: null,
        short: null,
        token: null,
      },
    },
    {
      new: true,
    },
  )
    .then(async dbUser => {
      dbUser = dbUser.forApiResponse();
      let canDelete = await dbUser.canDelete();
      dbUser = dbUser.toObject();
      dbUser.can_delete = canDelete;

      res.status(200).json(dbUser);
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

module.exports = removeApiKey;
