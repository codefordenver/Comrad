const db = require('../../../models/v1');
const Fuse = require('fuse.js');

function search(req, res) {
  if (!req.user) {
    return res.status(422).json('Must be logged in');
  }

  const { permission } = req.user.station;

  if (permission !== 'admin') {
    return res.status(422).json('User must have admin access');
  }

  const { f = 'all', q } = req.query;

  const conditions = f === 'all' ? {} : { 'station.status': f };

  db.User.find(conditions)
    .then(dbUsers => {
      const options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['profile.last_name', 'profile_first_name', 'contact.email'],
      };

      if (q) {
        const fuse = new Fuse(dbUsers, options);
        const results = fuse.search(q);
        return res.status(200).json(results);
      }

      return res.status(200).json(dbUsers);
    })
    .catch(err => res.status(422).json(err));
}

module.exports = search;
