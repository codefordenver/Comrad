/**
 * @swagger
 *
 * /genres:
 *   get:
 *     tags:
 *     - Genres
 *     operationId: FindAllGenres
 *     summary: Find All
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Retrieve all Genres
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               type: array of Genres
 *               example:
 *               - _id: "5f35a41e783e63454ccee914"
 *                 name: "Bluegrass"
 *                 "created_at": "2020-08-13T20:35:42.440Z"
 *                 "updated_at": "2020-08-13T20:35:42.440Z"
 *                 "__v": 0
 *               - "_id": "5f35a41e783e63454ccee90c"
 *                 name: "Blues"
 *                 "created_at": "2020-08-13T20:35:42.424Z"
 *                 "updated_at": "2020-08-13T20:35:42.424Z"
 *                 "__v": 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');

function findAll(req, res) {
  return db.Genre.find({}, null, { sort: 'name' })
    .then(genres => {
      res.json(genres);
    })
    .catch(err => res.status(500).json({ message: err }));
}

module.exports = findAll;
