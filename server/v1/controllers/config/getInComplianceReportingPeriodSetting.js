/**
 * @swagger
 *
 * /config/compliance-reporting-period:
 *   get:
 *     tags:
 *     - Configuration
 *     operationId: ConfigInComplianceReportingPeriod
 *     summary: Compliance Reporting Period
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Returns a boolean value indicating whether we are currently in a compliance reporting period
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Control`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               type: array of AccessControls
 *               example:
 *                 true
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       500:
 *         description: Server error. Check the response for more details.
 */

const keys = require('../../config/keys');

function getInComplianceReportingPeriodSetting(req, res) {
  res.status(200).json(keys.inComplianceReportingPeriod);
}

module.exports = getInComplianceReportingPeriodSetting;
