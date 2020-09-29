/**
 * @swagger
 *
 * /users:
 *   post:
 *     tags:
 *     - Users
 *     operationId: CreateUser
 *     summary: Create
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Create a new User record
 *
 *       The following roles can access this API endpoint: `Admin`
 *
 *       If the `SHOW_DEVELOPMENT_SIGN_UP` environment variable is set to `TRUE`, then all users can access this endpoint.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *         required: true
 *         description: "User object to be added"
 *     responses:
 *       200:
 *         description: The User record was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: User
 *               example:
 *                 api_key:
 *                   last_used:
 *                 on_air_name:
 *                 primary_phone:
 *                 roles: ['DJ']
 *                 status: Active
 *                 _id: 5f6a0833b1452b50c020ba83
 *                 email: s2314@getcomrad.org
 *                 first_name: Sean
 *                 last_name: Williams
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
  // ensure there is not another user with the same email in the database
  return db.User.findOne({ email: req.body.email })
    .then(duplicateUser => {
      if (duplicateUser != null) {
        return res.status(422).json({
          errorMessage: 'A user with this email address already exists.',
        });
      }
      return db.User.create(req.body)
        .then(dbUser => {
          return res.json(dbUser.forApiResponse());
        })
        .catch(err => {
          console.log(err);
          return res.status(422).json({ errorMessage: err.message });
        });
    })
    .catch(err => {
      console.log(err);
      return res
        .status(500)
        .json({ errorMessage: 'An unknown error occurred' });
    });
}

module.exports = create;
