/**
 * @swagger
 *
 * /config/resources-categories:
 *   get:
 *     tags:
 *     - Configuration
 *     operationId: ConfigResourcesCategories
 *     summary: Resources - Get Categories
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Returns an array with the different categories available for the Resources section
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               type: array of available categories
 *               example:
 *               - Announcements
 *               - Policies
 *               - Fund Drives
 *               - Other Important Documents
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       500:
 *         description: Server error. Check the response for more details.
 */

const keys = require('../../config/keys');

function getResourcesCategories(req, res) {
  res.status(200).json(keys.resourcesCategories);
}

module.exports = getResourcesCategories;
