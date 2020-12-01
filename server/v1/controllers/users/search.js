/**
 * @swagger
 *
 * /users/search:
 *   post:
 *     tags:
 *     - Users
 *     operationId: UsersSearch
 *     summary: Search
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - name: q
 *       required: true
 *       in: query
 *       type: string
 *       description: The string to search for
 *     - name: status
 *       required: false
 *       in: query
 *       schema:
 *         type: string
 *         enum: [Active,Inactive]
 *       description: If provided, this endpoint will only return users matching the specified status
 *     description: |
 *       Returns users whose email, first name or last name match the search string provided by the `q` parameter.
 *
 *       The following roles can access this API endpoint: `Admin`
 *     responses:
 *       200:
 *         description: Returns a list of matching users, in no particular order
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 - api_key:
 *                     last_used: '2020-11-19T21:32:46.261Z'
 *                     token: exists
 *                   on_air_name: DJ Cool Software
 *                   primary_phone:
 *                   roles:
 *                   - Admin
 *                   status: Active
 *                   _id: 5f720bae0504f73464bd83eb
 *                   email: comrad.development@gmail.com
 *                   first_name: Comrad
 *                   last_name: Develpment
 *                   __v: 0
 *                 - api_key:
 *                     last_used:
 *                     token:
 *                   on_air_name: DJ Show Producer
 *                   primary_phone:
 *                   roles:
 *                   - Show Producer
 *                   status: Active
 *                   _id: 5f720bae0504f73464bd83ee
 *                   email: show.producer@comrad.com
 *                   first_name: Show Producer
 *                   last_name: Test
 *                   __v: 0
 *                 - api_key:
 *                     last_used:
 *                     token:
 *                   on_air_name: DJ Full Access
 *                   primary_phone:
 *                   roles:
 *                   - Full Access
 *                   status: Active
 *                   _id: 5f720bae0504f73464bd83ed
 *                   email: full.access@comrad.com
 *                   first_name: Full Access
 *                   last_name: Test
 *                   __v: 0
 *                 - api_key:
 *                     last_used:
 *                     token:
 *                   on_air_name: DJ Underwriting
 *                   primary_phone:
 *                   roles:
 *                   - Underwriting
 *                   status: Active
 *                   _id: 5f720bae0504f73464bd83ef
 *                   email: underwriting@comrad.com
 *                   first_name: Underwriting
 *                   last_name: Test
 *                   __v: 0
 *                 - api_key:
 *                     last_used:
 *                     token:
 *                   on_air_name: DJ Admin
 *                   primary_phone:
 *                   roles:
 *                   - Admin
 *                   status: Active
 *                   _id: 5f720bae0504f73464bd83ec
 *                   email: admin@comrad.com
 *                   first_name: Admin
 *                   last_name: Test
 *                   __v: 0
 *                 - api_key:
 *                     last_used:
 *                     token:
 *                   on_air_name: DJ Guest
 *                   primary_phone:
 *                   roles:
 *                   - Guest
 *                   status: Active
 *                   _id: 5f720bae0504f73464bd83f1
 *                   email: guest@comrad.com
 *                   first_name: Guest
 *                   last_name: Test
 *                   __v: 0
 *                 - api_key:
 *                     last_used:
 *                     token:
 *                   on_air_name:
 *                   primary_phone:
 *                   roles: []
 *                   status: Active
 *                   _id: 5fb6dd9becaa3904742d2339
 *                   email: s2@getcomrad.org
 *                   first_name: Sean
 *                   last_name: Williams
 *                   __v: 0
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

function search(req, res) {
  let { status = 'all', q = '' } = req.query;

  const emailRE = new RegExp(q, 'i');
  const first_nameRE = new RegExp(q, 'i');
  const last_nameRE = new RegExp(q, 'i');

  const query = {};
  const $or = [
    { email: emailRE },
    { first_name: first_nameRE },
    { last_name: last_nameRE },
  ];

  if (status.toLowerCase() !== 'all') {
    const statusRE = new RegExp(`^${status}$`, 'i');
    query.$and = [{ status: statusRE }, { $or }];
  } else {
    query.$or = $or;
  }

  db.User.find(query)
    .then(dbUsers => {
      dbUsers.forEach(user => {
        user = user.forApiResponse();
      });
      return res.status(200).json(dbUsers);
    })
    .catch(err => res.status(422).json({ message: err }));
}

module.exports = search;
