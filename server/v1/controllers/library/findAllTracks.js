const db = require('../../models');
const keys = require('../../config/keys');

async function findAllByTracks(req, res) {
  let { sortBy, sortDescending, page } = req.query;

  //set defaults for variables & cast variables to correct data type
  sortBy = sortBy || 'updated_at';
  sortDescending = sortDescending || true;
  page = page != null ? Number(page) : 0;

  let sortObj = {};
  sortObj[sortBy] = sortDescending ? -1 : 1;

  //query 100 items of Artist type from the mongo database
  const results = await db.Track.find({}, null, {
    sort: sortObj,
    skip: page * keys.queryPageSize,
    limit: keys.queryPageSize,
  });

  //estimate the total number of pages
  const docs = await db.Track.estimatedDocumentCount();
  const totalPages = Math.ceil(docs / keys.queryPageSize);
  let resultsJson = {
    results: results,
    totalPages: totalPages,
  };

  return res.json(resultsJson);
}

module.exports = findAllByTracks;
