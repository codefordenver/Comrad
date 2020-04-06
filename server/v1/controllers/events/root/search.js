const {
  utils: { getModelForEventType },
} = require('../utils');

// searches the series titles
function search(req, res) {
  let { s } = req.query;
  const { eventType } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  dbModel
    .find(
      {
        $text: { $search: s },
        master_event_id: null, // only find series, not instances
      },
      {
        _id: 1,
        traffic_details: 1,
        show_details: 1,
        start_time_utc: 1,
        score: { $meta: 'textScore' },
      },
      {
        sort: { score: { $meta: 'textScore' } },
        limit: 10,
      },
    )
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.error(err);
      return res.status(422).json(err);
    });
}

module.exports = search;
