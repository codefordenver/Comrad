/**
 * @swagger
 *
 * /users/{id}/api-key:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f5fdb69e546d851980aa75d
 *   post:
 *     tags:
 *     - Users
 *     operationId: UsersCreateApiKey
 *     summary: Create API Key
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Creates an API key for the specified user. If the user already has an API key, calling this will replace the user's existing API key.
 *
 *       The following roles can access this API endpoint: `Admin`
 *     responses:
 *       200:
 *         description: The User's api key was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 doc:
 *                   api_key:
 *                     last_used: '2020-11-19T21:04:08.704Z'
 *                     token: exists
 *                   on_air_name:
 *                   primary_phone:
 *                   roles: []
 *                   status: Active
 *                   _id: 5fb6dd9becaa3904742d2339
 *                   email: s2@getcomrad.org
 *                   first_name: Sean
 *                   last_name: Williams
 *                   __v: 0
 *                   can_delete: true
 *                 api_key: 753713e1-9a8a-477a-a720-7fa761f4f37c
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 */

const bcrypt = require('bcrypt-nodejs');
const db = require('../../models');
const uuidv4 = require('uuid/v4');

async function createApiKey(req, res) {
  const { id } = req.params;

  const api_key = uuidv4();

  await bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res.status(500).json(err);
    }

    bcrypt.hash(api_key, salt, null, async (err, hash) => {
      if (err) {
        return res.status(500).json(err);
      }

      db.User.findOneAndUpdate(
        { _id: id },
        {
          api_key: {
            last_used: new Date(),
            short: api_key.substr(0, 8),
            token: hash,
          },
        },
        { new: true },
      )
        .then(async dbUser => {
          dbUser = dbUser.forApiResponse();
          let canDelete = await dbUser.canDelete();
          dbUser = dbUser.toObject();
          dbUser.can_delete = canDelete;

          return res.json({ doc: dbUser, api_key });
        })
        .catch(err => {
          res.status(500).json(err);
        });
    });
  });
}

module.exports = createApiKey;
