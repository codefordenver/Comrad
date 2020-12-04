/**
 * @swagger
 *
 * /resouces/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f35a3e7783e63454ccdd9d9
 *   put:
 *     tags:
 *     - Resources
 *     operationId: UpdateResource
 *     summary: Update
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Update a resource
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             "category": "Other Important Documents"
 *       required: true
 *       description: "JSON object of properties to update"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               description: "The new, updated record"
 *               example:
 *                 _id: 5fc929663d904b472c5ba2c7
 *                 category: Other Important Documents
 *                 description: Sample Announcement Guidelines
 *                 link: https://getcomrad.org/announcements
 *                 __v: 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the data you provided. Check the response for more details.
 */

const db = require('../../models');

function update(req, res) {
  db.Resource.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(dbResource => res.json(dbResource))
    .catch(err => res.status(422).json(err));
}

module.exports = update;
