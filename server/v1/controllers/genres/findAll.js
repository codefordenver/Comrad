const db = require('../../models');

function findAll(req, res) {
  return db.Genre.find().then(genres => {
    let array = [];
    for (let i = 0; i < genres.length; i++) {
      array.push(genres[i].name);
    }
    res.json(array);
  });
}

module.exports = findAll;
