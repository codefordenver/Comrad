const db = require('../../../models/v1');
const Fuse = require('fuse.js');

function searchHosts(req, res) {
  if (!req.user) {
    return res.status(401).json('Must be logged in');
  }

  const { filter = 'All', q, maxResults = 10 } = req.query;

  if (q == null || q.length == 0) {
    return res.status(422).json('Must provide a search string');
  }

  const conditions = filter === 'All' ? {} : { 'station.status': filter };

  db.User.find(conditions, {
    'station.on_air_name': 1,
    'profile.first_name': 1,
    'profile.last_name': 1,
  })
    .then(dbUsers => {
      const options = {
        shouldSort: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          'station.on_air_name',
          'profile.last_name',
          'profile_first_name',
        ],
      };

      const fuse = new Fuse(dbUsers, options);
      const results = fuse.search(q).slice(0, maxResults);
      return res.status(200).json(results);
    })
    .catch(err => res.status(422).json(err));
}

module.exports = searchHosts;
