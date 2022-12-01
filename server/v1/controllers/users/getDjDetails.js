/**
 * @swagger
 *
 * /dj/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f720bae0504f73464bd83eb
 *   get:
 *     tags:
 *     - Simple Endpoints
 *     operationId: GetDjById
 *     summary: Get DJ
 *     description: |
 *       Gets a DJ by their ID
 *
 *       This API endpoint can be accessed anonymously
 *     responses:
 *       200:
 *         description: Returns info for the specified DJ
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 _id: 5f720bae0504f73464bd83eb
 *                 name: DJ Name
 *                 bio: The bio for the DJ
 *       404:
 *         description: There is no user with the specified id
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');

function getDjDetails(req, res) {
  const { id } = req.params;

  db.User.findById(id)
    .then(async dbUser => {
      if (dbUser != null) {
        return res.json({
            "_id": dbUser._id,
            "name": dbUser.on_air_name ?? dbUser.first_name + " " + dbUser.last_name,
            "bio": dbUser.bio
          });
      } else {
        return db.HostGroup.findById(id)
          .then(async dbHostGroup => {
            if (dbHostGroup != null) {
              return res.json({
                "_id": dbHostGroup._id,
                "name": dbHostGroup.on_air_name,
                "bio": null
              });
            } else {
              return res
                .status(404)
                .json({ errorMessage: 'There is no user with the specified id' });
            }
          })
          .catch(err => {
            console.error(err);
            return res.status(500).json({ errorMessage: err });
          });
        
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ errorMessage: err });
    });
}

module.exports = getDjDetails;
