/**
 * @swagger
 *
 * /users:
 *   get:
 *     tags:
 *     - Users
 *     operationId: FindAllUsers
 *     summary: Find All
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Finds all users.
 *
 *       Results are not paged. This API endpoint will return all results.
 *
 *       The following roles can access this API endpoint: `Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *               - api_key:
 *                   last_used: '2020-09-22T14:10:04.032Z'
 *                 on_air_name: DJ Cool Software
 *                 primary_phone:
 *                 roles:
 *                 - Admin
 *                 status: Active
 *                 _id: 5f35a3cf783e63454ccd7525
 *                 can_delete: true
 *                 email: comrad.development@gmail.com
 *                 first_name: Comrad
 *                 last_name: Develpment
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
  db.User.find({})
    .then(dbUsers => {
      dbUsers.forEach(user => {
        user = user.forApiResponse();
      });

      res.json(dbUsers);
    })
    .catch(err => res.status(500).json({ message: err }));
}

module.exports = findAll;
