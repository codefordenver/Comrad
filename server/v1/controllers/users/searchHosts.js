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
