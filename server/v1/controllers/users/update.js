/**
 * @swagger
 *
 * /users/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f720bae0504f73464bd83eb
 *   put:
 *     tags:
 *     - Users
 *     operationId: UpdateUser
 *     summary: Update
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Update a user
 *
 *       The following roles can access this API endpoint for any user: `Admin`
 *
 *       All users can use this endpoint for their own user ID, but only to update password, first_name, last_name, email and on_air_name.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             "on_air_name": "DJ Coolest Software"
 *       required: true
 *       description: "JSON object of properties to update"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               description: "The new, updated record"
 *               example:
 *                 api_key:
 *                   last_used: '2020-12-01T14:31:33.305Z'
 *                   token: exists
 *                 on_air_name: DJ Coolest Software
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
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the data you provided. Check the response for more details.
 */

const db = require('../../models');
const bcrypt = require('bcrypt-nodejs');

function update(req, res) {
  const { id } = req.params;

  if (req.ac.fields.indexOf('*') === -1) {
    //only allow the user to update the fields they have permissions to update
    let bodyCopy = JSON.parse(JSON.stringify(req.body));
    req.body = {};
    console.log(
      'user has limited permissions for update endpoint, only allowing the user to update the following fields:',
    );
    req.ac.fields.forEach(function(field) {
      if (field in bodyCopy) {
        console.log(field);
        req.body[field] = bodyCopy[field];
      }
    });
    if ('password' in bodyCopy) {
      console.log('password');
      req.body.password = bodyCopy.password;
    }
  }

  if (req.body.password != null) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return res.status(422).json(err);
      }

      bcrypt.hash(req.body.password, salt, null, function(err, hash) {
        if (err) {
          return res.status(422).json(err);
        }

        req.body.password = hash;

        db.User.findOneAndUpdate({ _id: id }, req.body, { new: true })
          .then(dbUser => {
            dbUser = dbUser.forApiResponse();
            return dbUser.canDelete().then(canDelete => {
              dbUser = dbUser.toObject();
              dbUser.can_delete = canDelete;
              return res.json(dbUser);
            });
          })
          .catch(err => res.status(422).json(err));
      });
    });
  } else {
    db.User.findOneAndUpdate({ _id: id }, req.body, { new: true })
      .then(dbUser => {
        dbUser = dbUser.forApiResponse();
        return dbUser.canDelete().then(canDelete => {
          dbUser = dbUser.toObject();
          dbUser.can_delete = canDelete;
          return res.json(dbUser);
        });
      })
      .catch(err => res.status(422).json(err));
  }
}

module.exports = update;
