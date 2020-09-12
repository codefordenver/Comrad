/**
 * @swagger
 *
 * /access-control:
 *   post:
 *     tags:
 *     - Access Control
 *     operationId: CreateAccessControl
 *     summary: Create
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Create a new AccessControl record
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Control`
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AccessControl'
 *         required: true
 *         description: "AccessControl object to be added"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The AccessControl record was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: AccessControl
 *               example:
 *                 "_id": "5f3d436c50dacd5124dc6ae6"
 *                 "role": "Admin"
 *                 "resource": "TestResource"
 *                 "action": "create:any"
 *                 "attributes": "*"
 *                 "__v": 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the data you provided. Check the response for more details.
 */

const db = require('../../models');

function create(req, res) {
  db.AccessControl.create(req.body)
    .then(dbAccessControl => res.json(dbAccessControl))
    .catch(err => res.status(422).json({ message: err }));
}

module.exports = create;
