const db = require('../../models');

function search(req, res) {
  db.Resource.find({ ...req.query }).then(dbResource => {
    return res.status(200).json(dbResource);
  });
}

module.exports = search;
