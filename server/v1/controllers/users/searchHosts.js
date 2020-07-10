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
      const options = {
        shouldSort: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['on_air_name', 'last_name', 'first_name'],
      };

      db.UserGroups.find({}, { on_air_name: 1 })
        .then(dbUserGroups => {
          const fuse = new Fuse(dbUsers.concat(dbUserGroups), options);
          const results = fuse.search(q).slice(0, maxResults);
          return res.status(200).json(results);
        })
        .catch(err => res.status(422).json(err));
    })
    .catch(err => res.status(422).json(err));
}

module.exports = searchHosts;
