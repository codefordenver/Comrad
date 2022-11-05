/**
 * @swagger
 *
 * /library/itunes/{id}:
 *   get:
 *     tags:
 *     - Library (Albums, Artists, Tracks)
 *     operationId: FindItunesAlbum
 *     summary: Find iTunes Album
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - name: id
 *       required: true
 *       in: path
 *       type: string
 *       description: The collection ID to return
 *     description: |
 *       Display a collection (album) from the iTunes API.
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');
const { findItunesByCollectionId: utils__findItunesByCollectionId } = require('./utils')

async function findItunesByCollectionId(req, res) { 
  let { id } = req.params;

  if (!id) {
    return res.json(null);
  }

  let itunesData = await utils__findItunesByCollectionId(id);

  return res.json(itunesData);
}

module.exports = findItunesByCollectionId;
