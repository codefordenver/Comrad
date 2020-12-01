/**
 * @swagger
 *
 * /users/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f720bae0504f73464bd83eb
 *   get:
 *     tags:
 *     - Users
 *     operationId: UseresFindById
 *     summary: Find by ID
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Gets a user by their ID
 *
 *       The following roles can access this API endpoint for any user: `Admin`
 *
 *       All users can use this endpoint for their own user ID.
 *     responses:
 *       200:
 *         description: Returns the user record matching the ID
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 api_key:
 *                   last_used: '2020-12-01T12:35:19.837Z'
 *                   token: exists
 *                 on_air_name: DJ Cool Software
 *                 primary_phone: null
 *                 roles:
 *                   - Admin
 *                 status: Active
 *                 _id: 5f720bae0504f73464bd83eb
 *                 email: comrad.development@gmail.com
 *                 first_name: Comrad
 *                 last_name: Develpment
 *                 __v: 0
 *                 can_delete: false
 *                 host_groups:
 *                   - users:
 *                       - 5f720bae0504f73464bd83eb
 *                       - 5f72114fab735642446f64ed
 *                     _id: 5f8f456552431919908e84b3
 *                     on_air_name: Sean and Barry
 *                     __v: 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       404:
 *         description: There is no user with the specified id
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');

function findById(req, res) {
  const { id } = req.params;

  db.User.findById(id)
    .then(async dbUser => {
      if (dbUser != null) {
        dbUser = dbUser.forApiResponse();
        let canDelete = await dbUser.canDelete();
        dbUser = dbUser.toObject();
        dbUser.can_delete = canDelete;

        //add the user's host groups
        return db.HostGroup.find({ users: dbUser._id })
          .then(result => {
            return res.json({ ...dbUser, host_groups: result });
          })
          .catch(err => {
            console.error(err);
            return res.status(500).json({ errorMessage: err });
          });
      } else {
        return res
          .status(404)
          .json({ errorMessage: 'There is no user with the specified id' });
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ errorMessage: err });
    });
}

module.exports = findById;
