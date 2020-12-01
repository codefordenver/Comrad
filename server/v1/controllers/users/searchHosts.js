/**
 * @swagger
 *
 * /users/search-hosts:
 *   get:
 *     tags:
 *     - Users
 *     operationId: UsersSearchHosts
 *     summary: Search Hosts
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - name: q
 *       required: true
 *       in: query
 *       type: string
 *       description: The string to search for
 *     - name: status
 *       required: false
 *       in: query
 *       schema:
 *         type: string
 *         enum: [Active,Inactive]
 *       description: If provided, this endpoint will only return users matching the specified status
 *     - name: maxResults
 *       required: false
 *       in: query
 *       type: integer
 *       description: The maximum number of results to provide. Defaults to 10.
 *     description: |
 *       Returns users and host groups whose on-air name, first name or last name match the search string provided by the `q` parameter.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         description: Returns a list of matching users and host groups, ordered by relevance to the search string
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 - on_air_name: Sean Williams
 *                   _id: 5f721174ab735642446f6583
 *                   first_name: Sean
 *                   last_name: Williams
 *                   type: User
 *                 - _id: 5f8f456552431919908e84b3
 *                   on_air_name: Sean and Barry
 *                   type: HostGroup
 *                 - on_air_name: 'Indra, Sean, And Patrick'
 *                   _id: 5f721164ab735642446f6542
 *                   first_name: 'Indra,'
 *                   last_name: 'Sean, And Patrick'
 *                   type: User
 *                 - on_air_name: Ean Parmar
 *                   _id: 5f7211a9ab735642446f665a
 *                   first_name: Ean
 *                   last_name: Parmar
 *                   type: User
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the data you provided. Check the response for more details.
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');
const Fuse = require('fuse.js'); //Fuse library will let us do a fuzzy search across multiple collections, which a Mongo full-text search will not

function searchHosts(req, res) {
  if (!req.user) {
    return res.status(401).json('Must be logged in');
  }

  const { filter = 'all', q, maxResults = 10 } = req.query;

  if (q === null || q.length === 0) {
    return res.status(422).json({ message: 'Must provide a search string' });
  }

  const conditions = filter.toLowerCase() === 'all' ? {} : { status: filter };

  db.User.find(conditions, {
    on_air_name: 1,
    first_name: 1,
    last_name: 1,
  })
    .then(dbUsers => {
      for (let i = 0; i < dbUsers.length; i++) {
        dbUsers[i] = dbUsers[i].toObject();
        dbUsers[i].type = 'User';
      }
      const options = {
        shouldSort: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['on_air_name', 'last_name', 'first_name'],
      };

      return db.HostGroup.find({}, { on_air_name: 1, type: 'HostGroup' })
        .then(dbHostGroups => {
          for (let i = 0; i < dbHostGroups.length; i++) {
            dbHostGroups[i] = dbHostGroups[i].toObject();
            dbHostGroups[i].type = 'HostGroup';
          }
          const fuse = new Fuse(dbUsers.concat(dbHostGroups), options);
          const results = fuse.search(q).slice(0, maxResults);
          return res.status(200).json(results);
        })
        .catch(err => {
          console.error('error finding host group');
          console.error(err);
          return res.status(422).json(err);
        });
    })
    .catch(err => {
      console.error('error finding users');
      console.error(err);
      return res.status(422).json(err);
    });
}

module.exports = searchHosts;
