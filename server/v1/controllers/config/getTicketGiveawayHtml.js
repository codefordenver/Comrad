/**
 * @swagger
 *
 * /config/ticket-giveaway-html:
 *   get:
 *     tags:
 *     - Configuration
 *     operationId: ConfigTicketGiveawayHtml
 *     summary: Ticket Giveaway Html
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Returns HTML for ticket giveaways
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
 *                 true
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       500:
 *         description: Server error. Check the response for more details.
 */

const keys = require('../../config/keys');

function getTicketGiveawayHtml(req, res) {
  res.status(200).json(keys.ticketGiveawayHtml);
}

module.exports = getTicketGiveawayHtml;
