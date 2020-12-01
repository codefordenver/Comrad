/**
 * @swagger
 *
 * /users/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f720bae0504f73464bd83eb
 *   delete:
 *     tags:
 *     - Users
 *     operationId: DeleteUser
 *     summary: Delete
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Deletes a user. Users cannot be deleted if they are hosts on a show.
 *
 *       There must always be at least one admin user in the database. This API endpoint will not allow you to delete the last Admin user.
 *
 *       The following roles can access this API endpoint for any user: `Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               api_key:
 *                 last_used: '2020-12-01T14:38:16.299Z'
 *                 token: exists
 *               on_air_name: S.E.E.
 *               primary_phone: null
 *               roles:
 *                 - DJ
 *               status: Active
 *               _id: 5fc654dc6fd6c51464943931
 *               first_name: Sean
 *               last_name: Extra Editor
 *               email: sean-extra-editor@getcomrad.org
 *               __v: 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the data you provided. Check the response for more details.
 */

const db = require('../../models');

async function remove(req, res) {
  const { id } = req.params;

  return db.User.find({ roles: 'Admin' })
    .count()
    .then(async adminCount => {
      return db.User.findById({ _id: id })
        .then(async dbUser => {
          // can only delete admin if there are more than one
          if (dbUser.roles.indexOf('Admin') !== -1 && adminCount <= 1) {
            return res
              .status(422)
              .json({ errorMessage: 'Must have at least one Admin available' });
          }

          // can only delete user if can_delete = true
          if (await !dbUser.canDelete()) {
            return res.status(422).json({
              errorMessage: 'User cannot be deleted from the database',
            });
          }

          return dbUser.remove();
        })
        .then(response => {
          if (typeof response.message === 'undefined') {
            response = response.forApiResponse();
            response = response.toObject();
          }

          res.json(response);
        })
        .catch(err => res.status(422).json({ errorMessage: err }));
    })
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = remove;
