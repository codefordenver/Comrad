const db = require('../../models');

function findAll(req, res) {
  return db.Genre.find({}, null, { sort: 'name' }).then(genres => {
    res.json(genres);
  });
}

module.exports = findAll;
