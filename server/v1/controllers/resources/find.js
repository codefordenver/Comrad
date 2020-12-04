/**
 * @swagger
 *
 * /resources:
 *   get:
 *     tags:
 *     - Resources
 *     operationId: FindAllResources
 *     summary: Find All
 *     security:
 *     - ApiKeyAuth: []
 *     params:
 *     - name: category
 *       required: false
 *       in: query
 *       type: string
 *       description: If provided, this endpoint will only return the specified category
 *     description: |
 *       Returns a list of all resources.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 - _id: 5f720bae0504f73464bd83b6
 *                   category: Announcements
 *                   description: ON-AIR - Online Ticket Giveaways
 *                   link: https://getcomrad.org/onlineticketgiveaways.pdf
 *                   __v: 0
 *                 - _id: 5f720bae0504f73464bd83b7
 *                   category: Policies
 *                   description: Non-commercial Policy
 *                   link: https://getcomrad.org/noncommercialpolicy.pdf
 *                   __v: 0
 *                 - _id: 5f720bae0504f73464bd83b8
 *                   category: Other Important Documents
 *                   description: 2019-2023 Strategic Plan
 *                   link: https://getcomrad.org/other-important-documents
 *                   __v: 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');

function find(req, res) {
  let params = {};
  if (req.query.category != null) {
    params.category = req.query.category;
  }

  db.Resource.find(params)
    .then(dbResource => res.json(dbResource))
    .catch(err => res.status(422).json(err));
}

module.exports = find;
