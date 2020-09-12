/**
 * @swagger
 *
 * /config/fields/{entity name}:
 *   parameters:
 *    name: entity name
 *    in: path
 *    required: true
 *    example: album
 *   get:
 *     tags:
 *     - Configuration
 *     operationId: ConfigCustomFields
 *     summary: Get Custom Fields for Entity
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Returns an array with the different custom fields available for the given `entity name`.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Control`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               type: array of custom fields
 *               example:
 *               - name: local_artist
 *                 label: Local Artist
 *                 editFieldType: checkbox
 *               - name: location
 *                 label: Location
 *                 editFieldType: dropdown
 *                 options:
 *                 - New Releases Bin
 *                 - Library
 *                 - Was in Library, but Lost
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       500:
 *         description: Server error. Check the response for more details.
 */

const keys = require('../../config/keys');

function customFieldsForModel(req, res) {
  const { modelName } = req.params;
  if (modelName in keys.modelCustomFields) {
    res.status(200).json(keys.modelCustomFields[modelName]);
  } else {
    res.status(200).json([]);
  }
}

module.exports = customFieldsForModel;
