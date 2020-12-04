/**
 * @swagger
 *
 * /playlists:
 *   put:
 *     tags:
 *     - Playlists
 *     operationId: FindOrCreatePlaylist
 *     summary: Find or Create
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - name: startTime
 *       required: true
 *       in: query
 *       type: string
 *       format: date-time
 *       description: The time the playlist starts at
 *       example: 2020-12-03T19:06:00Z
 *     - name: endTime
 *       required: true
 *       in: query
 *       type: string
 *       format: date-time
 *       description: The time the playlist ends at
 *       example: 2020-12-03T20:00:00Z
 *     description: |
 *       Get a playlist based on its start and end time, if it exists. Otherwise, creates the playlist.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 _id: 5fc96465070d4b34fc036fdf
 *                 start_time_utc: '2020-12-03T19:06:00.000Z'
 *                 end_time_utc: '2020-12-03T20:00:00.000Z'
 *                 scratchpad: []
 *                 saved_items: []
 *                 created_at: '2020-12-03T22:19:17.824Z'
 *                 updated_at: '2020-12-03T22:19:17.824Z'
 *                 __v: 0
 *
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was a problem with the data you submitted. Check the response for more details.
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');
const { findOrCreatePlaylist } = require('./utils');

async function findOrCreateOne(req, res) {
  if (
    typeof req.query.startTime === 'undefined' ||
    typeof req.query.endTime === 'undefined'
  ) {
    res
      .status(422)
      .json('You must provide the startTime and endTime parameters');
  }

  let playlist = await findOrCreatePlaylist(
    req.query.startTime,
    req.query.endTime,
  );

  res.status(200).json(playlist);
}

module.exports = findOrCreateOne;
