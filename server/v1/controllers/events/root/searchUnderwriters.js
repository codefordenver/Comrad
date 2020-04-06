const {
  utils: { getModelForEventType },
} = require('../utils');

// searches underwriters
function searchUnderwriters(req, res) {
  let { s } = req.query;
  const { eventType } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  dbModel

    .aggregate([
      {
        $match: {
          $text: { $search: s },
          'traffic_details.underwriter_name': { $ne: null },
        },
      },
      {
        $project: {
          'traffic_details.underwriter_name': 1,
          score: { $meta: 'textScore' },
        },
      },
      {
        $group: {
          _id: '$traffic_details.underwriter_name',
          score: { $sum: 'score' },
        },
      },
      { $sort: { score: -1 } },
      { $limit: 10 },
      {
        $project: {
          underwriter_name: '$_id',
        },
      },
    ])
    .then(results => {
      res.json(results.map(r => r.underwriter_name));
    })
    .catch(err => {
      console.error(err);
      return res.status(422).json(err);
    });
}

module.exports = searchUnderwriters;
