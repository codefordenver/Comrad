/**
 * @swagger
 *
 * /access-control:
 *   get:
 *     tags:
 *     - Access Control
 *     operationId: FindAllAccessControls
 *     summary: Find All
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Retrieve all AccessControl records
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               type: array of AccessControls
 *               example:
 *               - _id: "5f35ab60541a624afc4db9b8"
 *                 role: "Admin"
 *                 "resource": "Genres"
 *                 "action": "create:any"
 *                 "attributes": "*"
 *                 "__v": 0
 *               - "_id": "5f35ab60541a624afc4db9b9"
 *                 "role": "Admin"
 *                 "resource": "Genres"
 *                 "action": "read:any"
 *                 "attributes": "*"
 *                 "__v": 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 */

const AccessControl = require('accesscontrol');
const db = require('../../models');

async function findAll(req, res) {
  db.AccessControl.find({})
    .lean()
    .then(dbAccessControl => {
      if (req.query.formatted === 'true') {
        const ac = new AccessControl(dbAccessControl);
        dbAccessControl = ac.getGrants();
      }

      res.json(dbAccessControl);
    })
    .catch(err => res.status(500).json({ message: err }));
}

module.exports = findAll;
