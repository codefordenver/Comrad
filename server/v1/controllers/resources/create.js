/**
 * @swagger
 *
 * /resources:
 *   post:
 *     tags:
 *     - Resources
 *     operationId: CreateResource
 *     summary: Create
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Returns a list of all resources.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *         required: true
 *         description: "Resource object to be added"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 _id: 5fc9260689069141b89a775c
 *                 category: Announcements
 *                 description: Sample Announcement Guidelines
 *                 link: https://getcomrad.org/announcements
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
  db.Resource.create(req.body)
    .then(dbResource => res.json(dbResource))
    .catch(err => res.status(422).json(err));
}

module.exports = create;
